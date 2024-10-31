import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useModals } from '@/contexts/ModalsContext';
import { MotiView } from 'moti';

export const AppInfoModal = () => {
  const { colors } = useTheme();
  const { isAppInfoModalVisible, hideAppInfoModal } = useModals();

  if (!isAppInfoModalVisible) return null;

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
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 300 }}
          style={[styles.modalContent, { backgroundColor: colors.background.default }]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text.primary }]}>
              O aplikacji CryptoNews
            </Text>
            <Pressable onPress={handleClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={colors.text.secondary} />
            </Pressable>
          </View>

          <MotiView
            from={{ translateY: 20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 500, delay: 200 }}
          >
            <Text style={[styles.description, { color: colors.text.primary }]}>
              CryptoNews to kompleksowe narzędzie do śledzenia rynku kryptowalut.
            </Text>

            <View style={styles.features}>
              <Feature 
                icon="trending-up" 
                title="Aktualne kursy"
                description="Śledź na bieżąco ceny kryptowalut"
                colors={colors}
              />
              <Feature 
                icon="article" 
                title="Wiadomości"
                description="Najnowsze informacje ze świata crypto"
                colors={colors}
              />
              <Feature 
                icon="notifications" 
                title="Powiadomienia"
                description="Otrzymuj alerty o ważnych zmianach"
                colors={colors}
              />
            </View>
          </MotiView>

          <Text style={[styles.version, { color: colors.text.secondary }]}>
            Wersja 1.0.0
          </Text>
        </MotiView>
      </View>
    </Modal>
  );
};

const Feature: React.FC<{
  icon: string;
  title: string;
  description: string;
  colors: any;
}> = ({ icon, title, description, colors }) => (
  <View style={styles.featureItem}>
    <MaterialIcons name={icon} size={24} color={colors.primary} />
    <View style={styles.featureText}>
      <Text style={[styles.featureTitle, { color: colors.text.primary }]}>
        {title}
      </Text>
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
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
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
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  version: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 24,
  },
});
