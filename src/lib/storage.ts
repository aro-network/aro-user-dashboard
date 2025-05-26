import Cookies from "js-cookie";

export const setItem = <T>(key: string, value: T) => {
  Cookies.set(key, JSON.stringify(value), { expires: 7 });
};

export const getItem = <T>(key: string) => {
  const data = Cookies.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch (e) {
    console.error("Parse cookie error:", e);
    return null;
  }
};

export const removeItem = (key: string) => {
  Cookies.remove(key);
};
