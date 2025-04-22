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
    nodeName: string;
    nodeId: string;
    nodeID: string;
  }

  interface TrendingList {
    date: number;
    rewards: string;
  }

  type DeviceType = {
    iconName: "Software" | "Hardware";
    name: string;
    value?: "box" | "x86";
  };

  type AddType = {
    switchTo: () => void;
  };
}
