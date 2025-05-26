import backendApi from "@/lib/api";
import { getItem, removeItem, setItem } from "@/lib/storage";
import { Opt } from "@/lib/type";
import { LoginResult } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";



export const AuthContext = createContext<OtherTypes.AuthContextProps>({
  login: async () => { },
  setUser: () => { },
  logout: () => { },
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const storageKey = "last-login-user";


export const getLastLoginUser = () => {
  try {
    const json = getItem<string>(storageKey);

    console.log('jsonjsonjson', json);
    if (!json) return null;
    const u = JSON.parse(json) as LoginResult;
    return u;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const refIsLogout = useRef(false);
  const r = useRouter();
  const [user, setUser] = useState<Opt<LoginResult>>(getLastLoginUser());
  const params = useSearchParams()
  const redirect = params.get("redirect");
  console.info('redirect:', redirect)


  const wrapSetUser = (u?: Opt<LoginResult>) => {
    if (!u) {
      refIsLogout.current = true;
      setUser(null);
      removeItem(storageKey);
      r.push("/signin");
    } else {
      refIsLogout.current = false;
      setUser(u);
      setItem(storageKey, JSON.stringify(u));
      r.push(redirect ? redirect : "/");
    }
  };

  const logout = () => {
    wrapSetUser();
  };


  const login = async (credentials: { email: string; password: string }) => {
    try {
      if (!credentials.email || !credentials.password) return;
      const user = await backendApi.loginApi(credentials);
      wrapSetUser(user);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const queryUserInfo = useQuery({
    queryKey: ["QueryUserInfo", user?.token],
    enabled: Boolean(user?.token),
    queryFn: () => backendApi.userInfo(),
  });
  // const queryUserInfo = useSWR(["QueryUserInfo", user?.token, location.href], () => (user?.token ? backendApi.userInfo() : undefined));
  return <AuthContext.Provider value={{ user, login, logout, setUser: wrapSetUser, queryUserInfo }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
