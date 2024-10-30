export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  background: {
    default: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    default: string;
  };
  border: string;
  error: string;
  button: {
    primary: {
      background: string;
      text: string;
    }
  };
  crypto: {
    positive: string;
    negative: string;
    changeBackground: {
      positive: string;
      negative: string;
    }
  };
  chart: {
    line: string;
    gradient: {
      from: string;
      to: string;
    }
  }
}

