declare namespace Nodes {
  type DevicesInfo = {
    nodeType: string;
    nodeUUID: string;
    online: boolean;
    ip: string;
    bindState: string;
  };

  interface NodeInfoList {
    nodeUUID: string;
    online: boolean;
    nodeType: "x86" | "box";
    rewards: string;
    totalRewards: string;
    nodeName: "string";
  }

  interface TrendingList {
    date: number;
    rewards: string;
  }
}
