import { ENV } from "./env";
import { Opt } from "./type";

const EXTENVInjectMap: { [k in typeof ENV]: string } = {
  preview: "AroExt_preview",
  staging: "AroExt_staging",
  prod: "AroExt",
};
export function getInjectAROAI() {
  return (window as any)[EXTENVInjectMap[ENV]] as Opt<{
    name: string;
    request: (msg: { name: string; body?: any }) => Promise<any>;
  }>;
}
