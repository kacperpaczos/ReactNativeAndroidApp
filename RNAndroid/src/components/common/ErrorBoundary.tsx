import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorView = ({ error, onReset }: { error: Error; onReset: () => void }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Text style={[styles.title, { color: colors.error }]}>
        Wystąpił błąd
      </Text>
      <Text style={[styles.message, { color: colors.text.primary }]}>
        {error.message}
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: colors.button.primary.background }]}
        onPress={onReset}
      >
        <Text style={[styles.buttonText, { color: colors.button.primary.text }]}>
          Spróbuj ponownie
        </Text>
      </Pressable>
    </View>
  );
};

export class CustomErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Błąd w aplikacji:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorView
          error={this.state.error}
          onReset={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});