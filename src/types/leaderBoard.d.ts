declare namespace LeaderBoardMode {
  interface top100List {
    num: number;
    name: string;
    email: string;
    twitterAccountInfo?: {
      id: string;
      name: string;
      username: string;
    };

    referralPoint: string;
    inviteV1Length: number;
    inviteV2Length: number;
  }
}
