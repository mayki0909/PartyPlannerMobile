declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  // Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Landing:undefined;
  CreateParty:undefined;
  Party:undefined;
  Archive:undefined;
  Details:undefined;
  PartyInfo:undefined;
  Share:undefined;
  ItemsList:undefined;
  Items:undefined;
  Calculate:undefined;
  Guests:undefined;
  Modal: undefined;
  NotFound: undefined;
  TabOne: undefined;
  TabTwo: undefined;
};