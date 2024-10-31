import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorView = ({ error, onReset }: { error: Error; onReset: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wystąpił błąd</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Pressable style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>Spróbuj ponownie</Text>
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
          error={this.state.error as Error}
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