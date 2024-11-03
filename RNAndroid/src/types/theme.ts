export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: {
    default: string;
    secondary: string;
  };
  text: {
    default: string;
    primary: string;
    secondary: string;
  };
  button: {
    primary: {
      background: string;
      text: string;
    };
  };
  crypto: {
    positive: string;
    negative: string;
    changeBackground: {
      positive: string;
      negative: string;
    };
  };
  chart: {
    line: string;
    gradient: {
      start: string;
      end: string;
    };
  };
  primary: string;
  border: string;
  error: string;
  success: string;
}

