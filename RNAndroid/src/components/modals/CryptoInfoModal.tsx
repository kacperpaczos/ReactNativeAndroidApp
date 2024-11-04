import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useModals } from '@/contexts/ModalsContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const CryptoInfoModal: React.FC = () => {
  const { isCryptoInfoModalVisible, hideCryptoInfoModal } = useModals();
  const { translations } = useLanguage();

  const handleClose = () => {
    hideCryptoInfoModal();
  };

  return (
    <Dialog open={isCryptoInfoModalVisible} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-xl font-bold mb-4">
            {translations.modal.cryptoInfo.title}
          </Dialog.Title>
          
          <div className="space-y-4">
            <p>{translations.modal.cryptoInfo.description}</p>
            
            <div className="font-medium">
              <h3 className="text-lg mb-2">{translations.modal.cryptoInfo.features.title}</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>{translations.modal.cryptoInfo.features.decentralized}</li>
                <li>{translations.modal.cryptoInfo.features.blockchain}</li>
                <li>{translations.modal.cryptoInfo.features.security}</li>
                <li>{translations.modal.cryptoInfo.features.global}</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {translations.common.close}
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
