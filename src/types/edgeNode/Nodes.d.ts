declare namespace Nodes {
  type DevicesInfo = {
    nodeType: "x86" | "box";
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
        nodeType?: "x86" | "box";
      }[];
    };
    nodeChainInfo:
      | {
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
        }
      | {
          nodeId: string;
          nodePubkey: string;
          userId: string;
          deviceType: string;
          regionCode: string;
          trafficType: number;
          registerStatus: string;
          cheatStatus: string;
          reputationPoint: number;
          creator: string;
          createAt: number;
          updator: string;
          updateAt: number;
        };
  }
  interface TrendingList {
    date: number;
    rewards: string;
    total?: string;
  }

  type DeviceType = {
    iconName: "aro-pod" | "aro-link" | "aro-client" | "aro-lite";
    value?: "box" | "client" | "link" | "lite";
    name: "ARO Pod" | "ARO Link" | "ARO Client" | "ARO Lite";
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
