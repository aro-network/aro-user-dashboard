export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const ENV: "prod" | "preview" | "staging" =
  (process.env.NEXT_PUBLIC_ENV as any) || "staging";
export const EXT_ID = "";
