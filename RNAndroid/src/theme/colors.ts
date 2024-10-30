import { ThemeColors } from '@/types/theme';

export const lightColors: ThemeColors = {
  primary: '#2196F3',
  background: {
    default: '#FFFFFF',
    secondary: '#F5F5F5'
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    default: '#000000'
  },
  border: '#E0E0E0',
  error: '#FF3B30',
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
      positive: 'rgba(76, 175, 80, 0.1)',
      negative: 'rgba(244, 67, 54, 0.1)'
    }
  },
  chart: {
    line: '#4BC0C0',
    gradient: {
      from: '#FFFFFF',
      to: '#FFFFFF'
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
