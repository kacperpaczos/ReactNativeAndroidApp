import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@constants/Colors';

interface ToastProps {
  type: 'error' | 'success' | 'info';
  text: string;
  duration?: number;
}

let toastInstance: any = null;

export const Toast = {
  show: ({ type, text, duration = 3000 }: ToastProps) => {
    if (toastInstance) {
      toastInstance.show({ type, text, duration });
    }
  }
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = React.useState<ToastProps | null>(null);

  const show = ({ type, text, duration }: ToastProps) => {
    setMessage({ type, text, duration });
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration - 600),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => setMessage(null));
  };

  useEffect(() => {
    toastInstance = { show };
    return () => {
      toastInstance = null;
    };
  }, []);

  return (
    <>
      {children}
      {message && (
        <Animated.View 
          style={[
            styles.container, 
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.text}>{message.text}</Text>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: Colors.error,
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
});