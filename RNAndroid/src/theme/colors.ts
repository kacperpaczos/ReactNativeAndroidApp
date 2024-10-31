import { ThemeColors } from '@/types/theme';

export const lightColors: ThemeColors = {
  primary: '#2f95dc',
  background: {
    default: '#ffffff',
    secondary: '#f5f5f5'
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    default: '#000000'
  },
  border: '#e0e0e0',
  error: '#ff0000',
  button: {
    primary: {
      background: '#2f95dc',
      text: '#ffffff'
    }
  },
  crypto: {
    positive: '#00c853',
    negative: '#ff1744',
    changeBackground: {
      positive: '#e8f5e9',
      negative: '#ffebee'
    }
  },
  chart: {
    line: '#2f95dc',
    gradient: {
      from: 'rgba(47, 149, 220, 0.1)',
      to: 'rgba(47, 149, 220, 0)'
    }
  }
};

export const darkColors: ThemeColors = {
  primary: '#2196F3',
  background: {
    default: '#121212',
    secondary: '#1E1E1E'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#AAAAAA',
    default: '#FFFFFF'
  },
  border: '#333333',
  error: '#FF453A',
  button: {
    primary: {
      background: '#2196F3',
      text: '#FFFFFF'
    }
  },
  crypto: {
    positive: '#4CAF50',
    negative: '#F44336',
    changeBackground: {
      positive: 'rgba(76, 175, 80, 0.15)',
      negative: 'rgba(244, 67, 54, 0.15)'
    }
  },
  chart: {
    line: '#4BC0C0',
    gradient: {
      from: '#121212',
      to: '#121212'
    }
  }
};
