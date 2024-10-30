import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from './Toast';

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [duration, setDuration] = useState(3000);

  const showToast = useCallback((newMessage: string, newDuration?: number) => {
    setMessage(newMessage);
    if (newDuration) setDuration(newDuration);
  }, []);

  const hideToast = useCallback(() => {
    setMessage(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <Toast 
          message={message} 
          duration={duration} 
          onHide={hideToast} 
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast musi być używany wewnątrz ToastProvider');
  }
  return context;
};