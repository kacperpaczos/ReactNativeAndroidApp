import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { NewsItem } from '@/types';
import { formatDate } from '@/utils/formatters';

interface NewsListItemProps {
  item: NewsItem;
  onPress?: () => void;
}

export const NewsListItem = memo<NewsListItemProps>(({ item, onPress }) => {
  const { colors } = useTheme();
  const defaultImage = require('@assets/images/news-placeholder.png');

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { 
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            source={item.imageUrl ? { uri: item.imageUrl } : defaultImage}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        
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
            <View style={styles.sourceContainer}>
              <MaterialIcons 
                name="public" 
                size={14} 
                color={colors.text.secondary}
                style={styles.icon} 
              />
              <Text style={[styles.source, { color: colors.text.secondary }]}>
                {item.source}
              </Text>
            </View>

            <View style={styles.dateContainer}>
              <MaterialIcons 
                name="access-time" 
                size={14} 
                color={colors.text.secondary}
                style={styles.icon}
              />
              <Text style={[styles.date, { color: colors.text.secondary }]}>
                {formatDate(item.date)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
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
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  source: {
    fontSize: 12,
  },
  date: {
    fontSize: 12,
  }
});