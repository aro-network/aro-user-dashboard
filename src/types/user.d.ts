export interface User {
  code: string;

  createAt?: number;

  email: string;

  id: string;

  inviteCode: string;

  name: string;

  node: Node;

  point: Point;

  referral: Referral;

  seasonNo: number;

  social: Social;

  stat: Stat;
  task: Task;

  updateAt: number;
  [property: string]: any;
}

export interface Node {
  connected: number;

  offline: number;
  [property: string]: any;
}

export interface Point {
  currentPoint?: number;
  total: number;
  today: number;
  network: number;
  other: number;
  referral: number;
  [property: string]: any;
}

export interface Referral {
  pending: number;

  total: number;

  valid: number;
  [property: string]: any;
}

export interface Social {
  /**
   * discord
   */
  discord: Discord;
  /**
   * google
   */
  google: Google;
  /**
   * telegram
   */
  tg: Tg;
  /**
   * x
   */
  x: X;
  [property: string]: any;
}

export interface Discord {
  avatar: string;

  email: string;

  id: string;

  name: string;
  [property: string]: any;
}

export interface Google {
  email: string;

  id: number;

  name: string;
  [property: string]: any;
}

/**
 * telegram
 */
export interface Tg {
  avatar: string;

  id: string;
  username: string;
  [property: string]: any;
}

export interface X {
  id: string;

  name: string;
  [property: string]: any;
}

export interface Stat {
  exp: number;

  extraBoost: number;

  level: number;
  [property: string]: any;
}

export interface Task {
  extension: boolean;
  uptime: number;
  [property: string]: any;
}

export interface LoginResult {
  userId: string;

  token: string;
  [property: string]: any;
}

export interface SingUpResult {
  createAt: number;

  userId: string;
  [property: string]: any;
}

export interface UserReward {
  detail: UserRewardDetail;

  extraBoost: number;

  timestamp: number;

  totalPoint: number;
  [property: string]: any;
}

export interface UserRewardDetail {
  network: number;

  referral: number;
  [property: string]: any;
}

export interface UserCampaignsRewards {
  jadeRewards: string;
  lockedJadeRewards: string;
  referredRewards: string;
  offlineRewardClaimed: boolean;
  ethAddress?: string;
  bind: {
    x: boolean;
    followX: boolean;
    postX: boolean;
    tg: boolean;
    joinTg: boolean;
    discord: boolean;
    joinDiscord: boolean;
    bindEth: boolean;
  };
  aroNode: {
    pod: boolean;
    link: boolean;
    client: boolean;
    liteNode: boolean;
  };
  jadePoint: {
    followX: number;
    joinTG: number;
    joinDiscord: number;
    sendTweet: number;
    invite: number;
    x86: number;
    liteNode: number;
    orderPod: number;
    orderLink: number;
    bindEth: number;
  };
  referralTier1: {
    count: number;
    jadeRewards: string;
    lockedJadeRewards: string;
  };
  referralTier2: {
    count: number;
    jadeRewards: string;
    lockedJadeRewards: string;
  };
}
