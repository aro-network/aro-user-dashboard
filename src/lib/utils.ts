import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import plugDur from "dayjs/plugin/duration";
import _ from "lodash";
import { toast } from "sonner";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { ENV } from "./env";
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
  appName: "EnReach",
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

export const covertText = (type: "box" | "x86") => {
  const list = { box: "Home Box", x86: "X86 Server", router: "Router" };
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
  if (num >= 1000) {
    const raw = Math.floor((num * 100) / 1000) / 100;
    return raw.toFixed(2) + "K";
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
    },
    beta: {
      sign: "Sign In",
      signUp: "Sign Up",
    },
    staging: {
      sign: "Sign In",
      signUp: "Sign Up",
    },
  };

  return config[env]?.[module || "default"] ?? "Unknown environment or module";
};
