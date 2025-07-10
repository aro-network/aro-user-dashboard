import { LoginResult, SingUpResult, User, UserReward } from "@/types/user";
import axios from "axios";
import { ENV } from "./env";
import _ from "lodash";
import { fmtBoost } from "@/components/fmtData";
import { toast } from "sonner";
import { getItem, removeItem } from "./storage";

const API_MAP: { [k in typeof ENV]: string } = {
  beta: "https://dev-api.aro.network/api",
  staging: "https://staging-api.aro.network/api",
  prod: "https://devnet-api.aro.network/api",
};

export const BASE_API = API_MAP[ENV];

const prefixUrl = "/edgeNode/node/";

const extensionPrefixUrl = "/edgeNode/liteNode/";

const Api = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export type RES<T> = {
  message: string;
  data: T;
};

Api.interceptors.request.use(
  (config) => {
    const result = getItem("last-login-user") as string;
    const { token = "" } = JSON.parse(result ?? "{}");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status || 0;
    const message =
      error.response?.data?.message || error.message || "Network Error";

    if (!error.response) {
      toast.error("Network issue", {
        id: "error-toast",
      });
    } else {
      switch (status) {
        case 400:
          toast.error(message || "Bad Request", { id: "error-toast2" });
          break;
        case 401:
          toast.warning("Session expired, please log in again", {
            id: "error-toast",
          });
          removeItem("last-login-user");
          window.location.href = "/";
          break;
        case 403:
          toast.error("Access denied", { id: "error-toast" });
          break;
        case 500:
          toast.error("Server error, please try again later", {
            id: "error-toast",
          });
          break;
        default:
          toast.error(message || "Request failed", { id: "error-toast" });
      }
    }

    return Promise.reject(error.response.data);
  }
);

const backendApi = {
  loginApi: async (data: { email: string; password: string }) => {
    const response = await Api.post<RES<LoginResult>>("/user/signIn", data);
    return response.data.data;
  },

  loginByGoogleApi: async (data: { accessToken: string }) => {
    const response = await Api.post<RES<LoginResult>>(
      "/user/google/signIn",
      data
    );
    return response.data.data;
  },
  verifyRegisterCode: async (uid: string, code: string) => {
    const response = await Api.post<RES<LoginResult>>(
      `/user/verify/${uid}/${code}`
    );
    return response.data.data;
  },
  resendRegisterVerifyCode: async (uid: string) => {
    await Api.post<RES<undefined>>(`/user/verify/${uid}/resend`);
    return true;
  },

  loginSetReferralApi: async (data: {
    accessToken: string;
    referralCode?: string;
  }) => {
    const response = await Api.post<RES<LoginResult>>(
      "/user/referral/by",
      data
    );
    return response.data.data;
  },

  registerApi: async (data: {
    email: string;
    password: string;
    referralCode?: string;
  }) => {
    const response = await Api.post<RES<SingUpResult>>("/user/signUp", {
      ...data,
    });
    return response.data.data;
  },

  registerByGoogleApi: async (accessToken: string) => {
    const response = await Api.post<RES<SingUpResult>>("/user/google/signUp", {
      accessToken,
    });
    return response.data.data;
  },

  userInfo: async () => {
    const response = await Api.get<RES<User>>("/user/profile");
    const p = response.data.data.point;
    _.keys(p).forEach((key) => {
      p[key] = _.toNumber(p[key]);
    });
    // p.total = _.toNumber(fmtBoost(response.data.data.stat.extraBoost)) * p.total;
    p.network =
      _.toNumber(fmtBoost(response.data.data.stat.extraBoost)) * p.network;
    p.total = p.referral + p.network;
    return response.data.data;
  },
  sendResetPassword: async (email: string) => {
    await Api.post<RES<undefined>>("/user/password/reset/send", { email });
    return true;
  },

  resetPassword: async (data: {
    email: string;
    password: string;
    verifyCode: string;
  }) => {
    await Api.post<RES<undefined>>("/user/password/reset", data);
    return true;
  },

  userUpdate: async (data: {
    username?: string;
    disconnect?: { x?: boolean; tg?: boolean; discord?: boolean };
  }) => {
    await Api.post<RES<undefined>>("/user/profile/update", data);
    return true;
  },

  userReward: async () => {
    const response = await Api.get<RES<UserReward>>("/user/reward");
    return response.data.data;
  },

  getAccessToken: async () => {
    const response = await Api.get<RES<{ accessToken: string }>>(
      "/user/accessToken"
    );
    return response.data.data.accessToken;
  },

  getCurrentEdgeNode: async () => {
    const response = await Api.get(`${prefixUrl}stat`);
    return response.data.data;
  },

  getCurrentEdgeNodeRewards: async () => {
    const response = await Api.get(`${prefixUrl}rewards`);
    return response.data.data;
  },

  getCurrentEdgeNodeRewardsTrending: async () => {
    const response = await Api.get<RES<Nodes.TrendingList[]>>(
      `${prefixUrl}rewards/trending`
    );
    return response.data.data;
  },

  getDeviceStatusInfo: async (nodeId?: string, deviceType?: "box" | "x86") => {
    if (!nodeId) return;
    const url = deviceType
      ? `${prefixUrl}${nodeId}/stat/?deviceType=${deviceType}`
      : `${prefixUrl}${nodeId}/stat`;
    const response = await Api.get<RES<Nodes.DevicesInfo>>(url);
    return response.data.data;
  },

  getRegions: async () => {
    const response = await Api.get(`edgeNode/regions`);
    return response.data.data;
  },

  bindingConfig: async (
    nodeId?: string,
    nodeName?: string,
    regionCode?: string,
    deviceType?: "box" | "x86" | string
  ) => {
    const response = await Api.post(
      `${prefixUrl}${nodeId}/bind?deviceType=${deviceType}`,
      {
        nodeName,
        regionCode,
      }
    );

    return response.data;
  },

  getNodeList: async () => {
    const response = await Api.get<RES<Nodes.NodeInfoList[]>>(
      `${prefixUrl}list`
    );
    return response.data.data;
  },

  getNodeInfoByNodeId: async (nodeId?: string, chooseType?: string) => {
    let url;
    if (chooseType === "lite_node") {
      url = `${extensionPrefixUrl}${nodeId}/details`;
    } else {
      url = `${prefixUrl}${nodeId}/details`;
    }
    const response = await Api.get<RES<Nodes.NodeInfoList>>(url);
    return response.data.data;
  },

  unbingDevice: async (nodeId?: string) => {
    const response = await Api.post<RES<Nodes.NodeInfoList[]>>(
      `${prefixUrl}${nodeId}/unbind`
    );
    return response.data.data;
  },

  countRewards: async (nodeId?: string, chooseType?: string) => {
    let url;
    if (chooseType === "lite_node") {
      url = `${extensionPrefixUrl}${nodeId}/rewards`;
    } else {
      url = `${prefixUrl}${nodeId}/rewards`;
    }

    const response = await Api.get<
      RES<{ today: string; total: string; yesterday: string }>
    >(url);
    return response.data.data;
  },
  rewardHistory: async (
    nodeId?: string,
    chooseDate?: { startTime: number; endTime: number }
  ) => {
    const params = chooseDate?.startTime
      ? {
          params: chooseDate,
        }
      : {};

    const response = await Api.get<RES<Nodes.RewardsHistory[]>>(
      `${prefixUrl}${nodeId}/rewardHistory`,
      params
    );
    return response.data.data;
  },
  getReferralRewards: async () => {
    const response = await Api.get<
      RES<{ referred: number; referredRewards: string }>
    >("/edgeNode/referral/rewards");
    return response.data.data;
  },

  editCurrentNodeName: async (nodeId?: string, nickName?: string) => {
    const response = await Api.post<RES<Nodes.RewardsHistory[]>>(
      `${prefixUrl}${nodeId}/name/reset`,
      { nickName }
    );
    return response.data.data;
  },

  getWhiteListInfo: async () => {
    const response = await Api.get<RES<Nodes.WhiteListInfo>>(
      `user/referral/whiteListInfo`
    );
    return response.data.data;
  },

  addInviteCode: async (referralCode: string) => {
    const response = await Api.post<RES<Nodes.WhiteListInfo>>(
      `user/invite/from`,
      { referralCode }
    );
    return response.data.data;
  },

  currentOwner: async (nodeId?: string) => {
    if (!nodeId) return;

    const response = await Api.get<RES<{ owner: boolean }>>(
      `${prefixUrl}${nodeId}/owner`
    );
    return response.data.data;
  },

  // https://staging-api.aro.network/api/edgeNode/node/{nodeId}/uptime/list

  currentUpTime: async (nodeId?: string, chooseType?: string) => {
    if (chooseType === "lite_node" || !nodeId) return;
    const response = await Api.get<
      RES<{
        lastUpdateTimestamp: string;
        list: { timestamp: number; uptimeCount: number }[];
      }>
    >(`${prefixUrl}${nodeId}/uptime/list`);
    return response.data.data;
  },
  // https://staging-api.aro.network/api/edgeNode/node/{nodeId}/volume/list

  currentUpVolume: async (nodeId?: string, chooseType?: string) => {
    if (chooseType === "lite_node" || !nodeId) return;

    const response = await Api.get<
      RES<{
        lastUpdateTimestamp: string;
        list: { timestamp: number; volume: number }[];
      }>
    >(`${prefixUrl}${nodeId}/volume/list`);
    return response.data.data;
  },
  // https://staging-api.aro.network/api/edgeNode/node/{nodeId}/packageLoss/list

  currentUpPackageLoss: async (nodeId?: string, chooseType?: string) => {
    if (chooseType === "lite_node" || !nodeId) return;

    const response = await Api.get<
      RES<{
        lastUpdateTimestamp: string;
        list: { timestamp: number; packageLostPercent: number }[];
      }>
    >(`${prefixUrl}${nodeId}/packageLoss/list`);
    return response.data.data;
  },

  // https://staging-api.aro.network/api/edgeNode/node/{nodeId}/averageDelay/list
  currentUpAverageDelay: async (nodeId?: string, chooseType?: string) => {
    if (chooseType === "lite_node" || !nodeId) return;

    const response = await Api.get<
      RES<{
        lastUpdateTimestamp: string;
        list: { timestamp: number; averageDelay: number }[];
      }>
    >(`${prefixUrl}${nodeId}/averageDelay/list`);
    return response.data.data;
  },

  // http://localhost:30002/edgeNode/liteNode/e4e72c44-b863-5ff8-b288-afc10369b31e/details

  currentExtensionDetail: async (nodeId?: string) => {
    if (!nodeId) return;

    const response = await Api.get<
      RES<{
        lastUpdateTimestamp: string;
        list: { timestamp: number; averageDelay: number }[];
      }>
    >(`${extensionPrefixUrl}${nodeId}/details`);
    return response.data.data;
  },

  // /edgeNode/liteNode/{clientId}/rewards

  currentExtensionRewards: async (nodeId?: string) => {
    if (!nodeId) return;

    const response = await Api.get<
      RES<{
        total: number;
        today: number;
        yesterday: number;
      }>
    >(`${extensionPrefixUrl}${nodeId}/rewards`);
    return response.data.data;
  },

  currentExtensionNetworkQuality: async (nodeId?: string) => {
    if (!nodeId) return;

    const response = await Api.get<
      RES<{
        list: { total: number; today: number; yesterday: number }[];
      }>
    >(`${extensionPrefixUrl}${nodeId}/networkQuality/list`);
    return response.data.data;
  },

  // /edgeNode/liteNode/{clientId}/uptime/list

  currentExtensionUptime: async (nodeId?: string) => {
    if (!nodeId) return;

    const response = await Api.get<
      RES<{
        list: { total: number; today: number; yesterday: number }[];
      }>
    >(`${extensionPrefixUrl}${nodeId}/uptime/list`);
    return response.data.data;
  },

  // /node/rename/{clientId}/{name}

  editExtensionCurrentNodeName: async (nodeId?: string, nickName?: string) => {
    const response = await Api.post<RES<Nodes.RewardsHistory[]>>(
      `/node/rename/${nodeId}/${nickName}`
    );
    return response.data.data;
  },

  // /edgeNode/liteNode/{clientId}/rewardHistory

  getExtensionRewardsHistory: async (
    nodeId?: string,
    chooseDate?: { startTime: number; endTime: number }
  ) => {
    const params = chooseDate?.startTime
      ? {
          params: chooseDate,
        }
      : {};
    const response = await Api.get<RES<Nodes.RewardsHistory[]>>(
      `${extensionPrefixUrl}${nodeId}/rewardHistory`,
      params
    );
    return response.data.data;
  },

  bindExtensionSN: async (serialNumber?: string) => {
    const response = await Api.post<RES<{ nodeId: string }>>(
      `liteNode/${serialNumber}/bind`,
      {
        serialNumber,
      }
    );
    return response.data.data;
  },

  ownerExtensionSN: async (nodeId?: string) => {
    if (!nodeId) return;

    const response = await Api.get<RES<{ owner: boolean }>>(
      `liteNode/${nodeId}/owner`
    );
    return response.data.data;
  },

  // /api/liteNode/{serialNumber}/unbind
  unbingExtension: async (nodeId?: string) => {
    const response = await Api.post<RES<Nodes.NodeInfoList[]>>(
      `liteNode/${nodeId}/unbind`
    );
    return response.data.data;
  },
};

export default backendApi;
