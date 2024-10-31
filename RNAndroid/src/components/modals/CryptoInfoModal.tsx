import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useModals } from '@/contexts/ModalsContext';

export const CryptoInfoModal: React.FC = () => {
  console.log('=== Renderowanie CryptoInfoModal ===');
  const { isCryptoInfoModalVisible, hideCryptoInfoModal } = useModals();

  useEffect(() => {
    console.log('CryptoInfoModal - zmiana widoczności:', isCryptoInfoModalVisible);
  }, [isCryptoInfoModalVisible]);

  const handleClose = () => {
    console.log('CryptoInfoModal - zamykanie modalu');
    hideCryptoInfoModal();
  };

  return (
    <Dialog open={isCryptoInfoModalVisible} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-xl font-bold mb-4">
            Informacje o Kryptowalutach
          </Dialog.Title>
          
          <div className="space-y-4">
            <p>
              Kryptowaluty to cyfrowe lub wirtualne waluty, które używają kryptografii 
              do zabezpieczenia transakcji.
            </p>
            
            <div className="font-medium">
              <h3 className="text-lg mb-2">Główne cechy:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Zdecentralizowany system</li>
                <li>Blockchain jako technologia bazowa</li>
                <li>Bezpieczne transakcje</li>
                <li>Globalny zasięg</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Zamknij
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
