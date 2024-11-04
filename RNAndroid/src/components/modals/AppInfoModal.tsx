import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useModals } from '@/contexts/ModalsContext';
import { MotiView } from 'moti';

export const AppInfoModal = () => {
  const { colors } = useTheme();
  const { translations } = useLanguage();
  const { isAppInfoModalVisible, hideAppInfoModal } = useModals();

  if (!isAppInfoModalVisible) return null;

  if (!translations?.modal?.appInfo?.title || 
      !translations?.modal?.appInfo?.description || 
      !translations?.modal?.appInfo?.features?.prices?.title ||
      !translations?.modal?.appInfo?.features?.news?.title ||
      !translations?.modal?.appInfo?.features?.notifications?.title) {
    console.error('Brak wymaganych tłumaczeń dla modalu AppInfo');
    return null;
  }

  const handleClose = () => {
    console.log('AppInfoModal - zamykanie modalu');
    if (hideAppInfoModal) {
      hideAppInfoModal();
    } else {
      console.error('hideAppInfoModal nie jest dostępne');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isAppInfoModalVisible}
      onRequestClose={handleClose}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <MotiView
          style={[styles.modalContent, { backgroundColor: colors.background.default }]}
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 300 }}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              {translations.modal.appInfo.title}
            </Text>
            <Pressable onPress={handleClose}>
              <MaterialIcons name="close" size={24} color={colors.text.secondary} />
            </Pressable>
          </View>

          <Text style={[styles.description, { color: colors.text.primary }]}>
            {translations.modal.appInfo.description}
          </Text>

          <View style={styles.features}>
            <FeatureItem
              icon="trending-up"
              title={translations.modal.appInfo.features.prices.title}
              description={translations.modal.appInfo.features.prices.description}
              colors={colors}
            />
            <FeatureItem
              icon="newspaper"
              title={translations.modal.appInfo.features.news.title}
              description={translations.modal.appInfo.features.news.description}
              colors={colors}
            />
            <FeatureItem
              icon="notifications"
              title={translations.modal.appInfo.features.notifications.title}
              description={translations.modal.appInfo.features.notifications.description}
              colors={colors}
            />
          </View>
        </MotiView>
      </View>
    </Modal>
  );
};

interface FeatureItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
  colors: any;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, colors }) => (
  <View style={styles.featureItem}>
    <MaterialIcons name={icon} size={24} color={colors.primary} style={styles.featureIcon} />
    <View style={styles.featureText}>
      <Text style={[styles.featureTitle, { color: colors.text.primary }]}>{title}</Text>
      <Text style={[styles.featureDescription, { color: colors.text.secondary }]}>
        {description}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  features: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureIcon: {
    marginTop: 2,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
