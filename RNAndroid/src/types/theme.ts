export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };
  crypto: {
    positive: string;
    negative: string;
    neutral: string;
  };
  components: {
    card: {
      background: string;
      border: string;
    };
    button: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    input: {
      border: string;
      focus: string;
      error: string;
    };
  };
}

