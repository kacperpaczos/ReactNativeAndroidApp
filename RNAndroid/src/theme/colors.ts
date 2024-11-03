export const baseColors = {
  primary: '#2f95dc',
  error: '#ff0000',
  success: '#00c853',
  crypto: {
    positive: '#16c784',
    negative: '#ea3943',
    changeBackground: {
      positive: '#e8f5e9',
      negative: '#ffebee'
    }
  }
};

export const lightColors = {
  ...baseColors,
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
  button: {
    primary: {
      background: '#2f95dc',
      text: '#ffffff'
    }
  },
  chart: {
    line: '#2f95dc',
    gradient: {
      start: 'rgba(47,149,220,0.8)',
      end: 'rgba(47,149,220,0.1)'
    }
  }
};

export const darkColors = {
  ...baseColors,
  background: {
    default: '#121212',
    secondary: '#1E1E1E'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
    default: '#FFFFFF'
  },
  border: '#404040',
  button: {
    primary: {
      background: '#2196F3',
      text: '#FFFFFF'
    }
  },
  chart: {
    line: '#64B5F6',
    gradient: {
      start: 'rgba(100,181,246,0.8)',
      end: 'rgba(100,181,246,0.1)'
    }
  }
};
