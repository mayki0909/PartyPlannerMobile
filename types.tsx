declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  // Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Landing:undefined;
  Archive:undefined;
  PartyInfo:undefined;
  Modal: undefined;
  NotFound: undefined;
  TabOne: undefined;
  TabTwo: undefined;
};