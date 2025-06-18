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

const FOUR_HOURS = 4 * 60 * 60;
const ONE_HOUR = 60 * 60;

export function covertCurrentUpTime<T extends Record<string, any>>(
  data: T[] = [],
  dateFiled: string,
  countFiled: string
) {
  const grouped: Record<
    number,
    Record<number, { totalUpCount: number; dataPoints: number }>
  > = {};

  data.forEach((item) => {
    const dateValue = item[dateFiled] as number;
    const uptimeCount = item[countFiled] as number;

    const fourHourStart = Math.floor(dateValue / FOUR_HOURS) * FOUR_HOURS;
    const hourStart = Math.floor(dateValue / ONE_HOUR) * ONE_HOUR; // 这里改成 dateValue

    if (!grouped[fourHourStart]) {
      grouped[fourHourStart] = {};
    }

    if (!grouped[fourHourStart][hourStart]) {
      grouped[fourHourStart][hourStart] = {
        totalUpCount: 0,
        dataPoints: 0,
      };
    }

    grouped[fourHourStart][hourStart].totalUpCount += Number(uptimeCount);
    grouped[fourHourStart][hourStart].dataPoints += 1;
  });

  const resultList = Object.entries(grouped).map(([fourHourTs, hourData]) => {
    const fourHourStart = Number(fourHourTs);

    const hours = Array.from({ length: 4 }, (_, i) => {
      const hourTs = fourHourStart + i * ONE_HOUR;

      const hour = dayjs.unix(hourTs).format("HH:00");

      const stats = hourData[hourTs] || { totalUpCount: 0, dataPoints: 0 };

      return {
        hour,
        totalUpCount: stats.totalUpCount,
        dataPoints: stats.dataPoints,
      };
    });

    return {
      // timeRange: `${dayjs
      //   .unix(fourHourStart)
      //   .format("YYYY-MM-DD HH:00")} - ${dayjs
      //   .unix(fourHourStart + 3 * ONE_HOUR)
      //   .format("HH:00")}`,
      hours,
    };
  });

  return resultList;
}
