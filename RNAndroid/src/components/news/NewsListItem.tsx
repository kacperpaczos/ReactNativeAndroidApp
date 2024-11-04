import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Linking } from 'react-native';
import { Toast } from '@/components/common/Toast';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { NewsItem } from '@/types/news';
import { formatDate } from '@/utils/formatters';

interface NewsListItemProps {
  item: NewsItem;
}

interface NewsFooterItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
  color: string;
}

const NewsFooterItem = ({ icon, text, color }: NewsFooterItemProps) => (
  <View style={styles.footerItem}>
    <MaterialIcons 
      name={icon}
      size={14}
      color={color}
      style={styles.icon}
    />
    <Text style={[styles.footerText, { color }]}>
      {text}
    </Text>
  </View>
);

export const NewsListItem = memo<NewsListItemProps>(({ item }) => {
  const { colors, themeVersion } = useTheme();
  const defaultImage = require('@assets/images/news-placeholder.png');

  const handlePress = async () => {
    if (!item.url) {
      Toast({
        message: "Brak dostępnego linku do artykułu",
        onHide: () => {}
      });
      return;
    }
    
    try {
      const canOpen = await Linking.canOpenURL(item.url);
      if (canOpen) {
        await Linking.openURL(item.url);
      } else {
        Toast({
          message: 'Nie można otworzyć tego linku',
          onHide: () => {}
        });
      }
    } catch (error) {
      console.error('Błąd podczas otwierania URL:', error);
      Toast({
        message: 'Wystąpił błąd podczas otwierania linku',
        onHide: () => {}
      });
    }
  };

  const renderImage = () => (
    <View style={styles.imageContainer}>
      <Image
        source={item.imageUrl ? { uri: item.imageUrl } : defaultImage}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  const renderContent = () => (
    <View style={styles.content}>
      <Text 
        style={[styles.title, { color: colors.text.primary }]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
      
      <Text 
        style={[styles.summary, { color: colors.text.secondary }]}
        numberOfLines={2}
      >
        {item.summary}
      </Text>
      
      <View style={styles.footer}>
        <NewsFooterItem 
          icon="public"
          text={item.source}
          color={colors.text.secondary}
        />
        <NewsFooterItem
          icon="access-time" 
          text={formatDate(item.date)}
          color={colors.text.secondary}
        />
      </View>
    </View>
  );

  return (
    <Pressable
      key={themeVersion}
      style={({ pressed }) => [
        styles.container,
        { 
          backgroundColor: colors.background.default,
          borderColor: colors.border,
        },
        pressed && styles.pressed
      ]}
      onPress={handlePress}
    >
      <View style={styles.contentWrapper}>
        {renderImage()}
        {renderContent()}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  imageContainer: {
    width: 120,
    aspectRatio: 3/4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  footerText: {
    marginLeft: 4,
    fontSize: 12,
  }
});