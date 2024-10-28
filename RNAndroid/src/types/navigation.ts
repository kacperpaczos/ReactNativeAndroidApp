export type RootStackParamList = {
  '(tabs)': undefined;
  '(splash)': undefined;
  '(welcome)': undefined;
  'modal': undefined;
  'NewsDetails': { id: number };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

