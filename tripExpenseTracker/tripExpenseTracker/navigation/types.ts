export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; otherParam?: string };
};

export type TabParamList = {
  Feed: undefined;
  Profile: undefined;
};

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: {
    navigate: (screen: T, params?: RootStackParamList[T]) => void;
    goBack: () => void;
  };
};