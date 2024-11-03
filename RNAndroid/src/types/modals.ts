export interface ModalsContextType {
    isAppInfoModalVisible: boolean;
    isCryptoInfoModalVisible: boolean;
    showAppInfoModal: () => void;
    hideAppInfoModal: () => void;
    showCryptoInfoModal: () => void;
    hideCryptoInfoModal: () => void;
  }