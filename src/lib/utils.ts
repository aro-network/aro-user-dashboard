import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import plugDur from "dayjs/plugin/duration";
import _ from "lodash";
import { toast } from "sonner";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
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

export const getLast15Days = () => {
  const result = [];
  const today = new Date();

  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    result.push(`${year}-${month}-${day}`);
  }

  return result;
};
export const formatNumber = (num: number) => {
  if (num >= 10000) {
    return (num / 1000).toFixed(2).replace(/\.0$/, "") + "K";
  }
  return num.toString();
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
