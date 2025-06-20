import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import plugDur from "dayjs/plugin/duration";
import _ from "lodash";
import { toast } from "sonner";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { ENV } from "./env";
import { DateValue } from "@nextui-org/react";
dayjs.extend(plugDur);

export function strToSearchParams(str: string) {
  const data = str.toLowerCase().replaceAll(" ", "");
  return data;
}

export function getErrorMsg(error: any) {
  // msg
  let msg = "Unkown";
  if (typeof error == "string") msg = error;
  else if (error instanceof AxiosError)
    msg = error.response?.data?.message || error.message;
  else if (typeof error?.msg == "string") msg = error?.msg;
  else if (typeof error?.message == "string") msg = error?.message;
  // replace
  //   if (msg.includes("User denied") || msg.includes("user rejected transaction")) return "You declined the action in your wallet.";
  //   if (msg.includes("transaction failed")) return "Transaction failed";
  return msg;
}

export function handlerError(err: any) {
  toast.error(_.upperFirst(getErrorMsg(err).trim()));
}

export function sleep(time: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, time));
}

export function fmtDate(date: number, fmt: string) {
  return dayjs(date).format(fmt);
}

export function fmtDuration(time: number, fmt: string) {
  return dayjs.duration(time).format(fmt);
}

export function pxToRem(px: number, base: number = 16) {
  return _.round(px / base, 4) + "rem";
}

export function truncateEmail(email: string = "", maxLength = 25) {
  if (email.length <= maxLength) return email || "-";

  const [localPart, domainPart] = email.split("@");
  const localPartLength = localPart.length;

  if (localPartLength <= 4) {
    return `${localPart}@${domainPart.slice(0, 3)}...`;
  }
  return `${localPart.slice(0, 7)}...@${domainPart}`;
}

export const convertToNew = (hexString?: string | undefined) => {
  if (!hexString) return "";

  const cleanedHex = hexString.split("-").slice(1).join("");

  return BigInt(`0x${cleanedHex}`).toString().slice(0, 20);
};

export const scrollToTop = () => {
  const data = document.getElementsByClassName("nodes");
  data[0].scrollTop = 0;
};

export const config = getDefaultConfig({
  appName: "ARO",
  projectId: "7dbfe391a389f1dd5555a5d31c90f523",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export const formatStr = (address?: string, start = 0, end = 10) => {
  if (!address) {
    return "-";
  } else if (address.length < 10) {
    return address;
  }
  const prefix = address?.slice(start, end);
  const suffix = address?.slice(-10);
  const ellipsis = "...";

  return `${prefix}${ellipsis}${suffix}`;
};

export const covertText = (type: "box" | "x86" | "Box") => {
  const list = {
    box: "ARO Pod",
    Box: "ARO Pod",
    x86: "ARO Client",
    router: "ARO Link",
  };
  return list[type] || "-";
};

export const generateLast15DaysRange = (): {
  start: CalendarDate;
  end: CalendarDate;
} => {
  const end = today(getLocalTimeZone());
  const start = end.subtract({ days: 14 });
  return { start, end };
};

export function getAdjustedDateRange(
  startTimestamp: number,
  endTimestamp: number
) {
  const secondsInDay = 86400;

  const adjustedStart =
    Math.floor(startTimestamp / secondsInDay) * secondsInDay;

  const adjustedEnd =
    (Math.floor(endTimestamp / secondsInDay) + 1) * secondsInDay - 1;

  return {
    startTime: adjustedStart,
    endTime: adjustedEnd,
  };
}

export const formatNumber = (num: number) => {
  if (num === 0) return "0";
  if (num >= 1000) {
    const units = ["", "K", "M", "B", "T"];
    const index = Math.floor(Math.log10(num) / 3);
    const scaled = num / Math.pow(1000, index);
    return scaled.toFixed(2) + units[index];
  }
  return Math.round(num).toString();
};

// function formatLargeNumber(num) {
//   if (num >= 1_000_000_000) {
//     return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
//   } else if (num >= 1_000_000) {
//     return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
//   } else if (num >= 10_000) {
//     return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
//   } else {
//     return num.toString();
//   }
// }

export const shortenMiddle = (str: string, maxLength = 20) => {
  if (str.length <= maxLength) return str;

  const half = Math.floor((maxLength - 3) / 2);
  return str.slice(0, half) + "..." + str.slice(-half);
};

export function generateDateList(startTimestamp: number, endTimestamp: number) {
  const result: { date: string; total: number }[] = [];

  const startDate = new Date(startTimestamp * 1000);
  const endDate = new Date(endTimestamp * 1000);

  startDate.setHours(8, 0, 0, 0);

  endDate.setHours(7, 59, 59, 999);

  const current = new Date(startDate);

  while (current <= endDate) {
    const dateStr = current.toISOString().split("T")[0];
    result.push({ date: dateStr, total: 0 });
    current.setDate(current.getDate() + 1);
  }

  return result;
}

export const envText = (module?: string) => {
  const env = ENV;
  const config: Record<string, Record<string, string>> = {
    prod: {
      sign: "Sign In For Devnet",
      signUp: "Sign Up For Devnet",
      mode: "Devnet",
    },
    beta: {
      sign: "Sign In",
      signUp: "Sign Up",
      mode: "beta",
    },
    staging: {
      sign: "Sign In",
      signUp: "Sign Up",
      mode: "Testnet",
    },
  };

  return config[env]?.[module || "default"] ?? "Unknown environment or module";
};

export const isIPv6 = (address: string) => {
  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|::([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,6}:)$/;
  return ipv6Regex.test(address);
};

export const getCurrentDate = (dateList: {
  start: CalendarDate | DateValue;
  end: CalendarDate | DateValue;
}) => {
  const timeZone = getLocalTimeZone();
  const startDate = dateList.start.toDate(timeZone);
  const endDate = dateList.end.toDate(timeZone);
  startDate.setHours(8, 0, 0, 0);
  endDate.setDate(endDate.getDate() + 1);
  endDate.setHours(7, 59, 59, 999);
  const startTime = Math.floor(startDate.getTime() / 1000);
  const endTime = Math.floor(endDate.getTime() / 1000);

  return { startTime, endTime };
};

export const sortIp = (network: any[]) => {
  return network.sort((a, b) => {
    const getPriority = (name: string) => {
      if (name.startsWith("macvlan")) return 0;
      if (name === "eth0") return 1;
      return 2;
    };

    return getPriority(a.name) - getPriority(b.name);
  });
};

type HourlyGroup = {
  hour: string;
  total: number;
};

export function groupByHour<T extends Record<string, any>>(
  data: T[],
  dateFiled: string,
  countFiled: string
): HourlyGroup[] {
  const grouped: Record<string, number> = {};

  data.forEach((item) => {
    const hourStr = dayjs(item[dateFiled] * 1000)
      .startOf("hour")
      .format("YYYY-MM-DD HH:00:00");
    if (!grouped[hourStr]) {
      grouped[hourStr] = 0;
    }

    grouped[hourStr] += Number(item[countFiled]);
  });

  const result: HourlyGroup[] = Object.entries(grouped)
    .map(([hour, total]) => ({ hour, total }))
    .sort((a, b) => new Date(a.hour).getTime() - new Date(b.hour).getTime());

  return result;
}

export function groupPackageOrDelayByHour(
  data: {
    timestamp: number | string;
    packageLostPercent?: string;
    averageDelay?: number;
  }[]
) {
  const result: {
    hour: string;
    averagePackageLostPercent: string;
    averageDelay: number;
  }[] = [];

  const grouped: Record<
    string,
    {
      totalLoss: number;
      lossCount: number;
      totalDelay: number;
      delayCount: number;
    }
  > = {};

  for (const item of data) {
    const timestamp = Number(item.timestamp);
    const date = new Date(timestamp * 1000);
    const hourKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:00`;

    if (!grouped[hourKey]) {
      grouped[hourKey] = {
        totalLoss: 0,
        lossCount: 0,
        totalDelay: 0,
        delayCount: 0,
      };
    }

    if (typeof item.packageLostPercent === "string") {
      const loss = Number(item.packageLostPercent);
      if (!isNaN(loss)) {
        grouped[hourKey].totalLoss += loss;
        grouped[hourKey].lossCount += 1;
      }
    }

    if (typeof item.averageDelay === "number") {
      grouped[hourKey].totalDelay += item.averageDelay;
      grouped[hourKey].delayCount += 1;
    }
  }

  for (const [
    hour,
    { totalLoss, lossCount, totalDelay, delayCount },
  ] of Object.entries(grouped)) {
    const avgLoss = lossCount > 0 ? totalLoss / lossCount : 0;
    const avgDelay = delayCount > 0 ? totalDelay / delayCount : 0;

    const formattedLoss =
      avgLoss <= 0.01 ? "0" : `${parseFloat(avgLoss.toFixed(1))}`;

    result.push({
      hour,
      averagePackageLostPercent: formattedLoss,
      averageDelay: Math.round(avgDelay),
    });
  }

  return result.sort(
    (a, b) => new Date(a.hour).getTime() - new Date(b.hour).getTime()
  );
}

export function groupVolumeByHourInMB(
  data: { timestamp: number; volume: number }[]
) {
  const result: { hour: string; totalVolumeMB: string }[] = [];
  const grouped: Record<string, number> = {};

  for (const item of data) {
    const date = new Date(item.timestamp * 1000);
    const hourKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:00`;

    if (!grouped[hourKey]) {
      grouped[hourKey] = 0;
    }

    grouped[hourKey] += Number(item.volume);
    console.log("adasdasda", item.volume);
  }

  for (const [hour, totalBytes] of Object.entries(grouped)) {
    const totalMB = totalBytes / (1024 * 1024);
    result.push({
      hour,
      totalVolumeMB: `${totalMB.toFixed(2)}`,
    });
  }

  return result.sort(
    (a, b) => new Date(a.hour).getTime() - new Date(b.hour).getTime()
  );
}
