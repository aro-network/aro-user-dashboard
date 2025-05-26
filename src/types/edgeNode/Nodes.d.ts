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
    todayRewards: string;
    nodeName: string;
    nodeId: string;
    nodeID: string;
    ip?: string;
    createTimestamp: number;
    deviceInfo: {
      ip: string;
      date: string;
      cpuUse: number;
      memUse: number;
      cpuCores: number;
      memTotal: number;
      memAvailable: number;
      networkInterfaces: {
        ip: string;
        mac: string;
        name: string;
      }[];
    };
    nodeChainInfo: {
      Node: {
        nodeID: string;
        userID: string;
        nodeName: string;
        deviceType: string;
        regionCode: string;
        trafficType: number;
        registerStatus: string;
        workingStatus?: string;
        cheatStatus?: string;
        reputationPoint: string;
        creator: string;
        createAt: string;
        updator: string;
        updateAt: string;
      };
    };
  }

  interface TrendingList {
    date: number;
    rewards: string;
    total?: string;
  }

  type DeviceType = {
    iconName: "Software" | "Hardware";
    name: string;
    value?: "box" | "x86";
  };

  type AddType = {
    switchTo: () => void;
  };

  type RewardsHistory = {
    date: string;
    total: number;
    startTime: number;
    endTime: number;
  };

  type WhiteListInfo = {
    whiteListUser: boolean;
    inviteCounts: {
      level1: number;
      level2: number;
    };
  };
}
