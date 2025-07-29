import backendApi from "@/lib/api";
import { getItem, removeItem, setItem } from "@/lib/storage";
import { Opt } from "@/lib/type";
import { LoginResult } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { getInjectAROAI } from "@/lib/ext";


interface UseDisclosureProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  onChange?(isOpen: boolean | undefined): void;
  id?: string;
}
export const AuthContext = createContext<OtherTypes.AuthContextProps>({
  login: async () => { },
  setUser: () => { },
  logout: () => { },
  setLink: () => { },
  useDisclosure: {
    isOpen: false,
    onOpen: function (): void {
      throw new Error("Function not implemented.");
    },
    onClose: function (): void {
      throw new Error("Function not implemented.");
    },
    onOpenChange: function (): void {
      throw new Error("Function not implemented.");
    },
    isControlled: false,
    getButtonProps: function (props?: any) {
      throw new Error("Function not implemented.");
    },
    getDisclosureProps: function (props?: any) {
      throw new Error("Function not implemented.");
    }
  }

});

interface AuthProviderProps {
  children: React.ReactNode;
}

const storageKey = "last-login-user";


export const getLastLoginUser = () => {
  try {
    const json = getItem<string>(storageKey);
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
  const [link, setLink] = useState<string>()
  const params = useSearchParams()
  const redirect = params.get("redirect");
  const disclosure = useDisclosure();



  const wrapSetUser = (u?: Opt<LoginResult>) => {

    if (!u) {
      refIsLogout.current = true;
      setUser(null);
      removeItem(storageKey);
      // getInjectAROAI()?.request({ name: "clearAccessToken" }).catch(console.error);
      r.push("/signin");
    } else {
      refIsLogout.current = false;
      setUser(u);
      setItem(storageKey, JSON.stringify(u));
      r.push(redirect ? redirect : `/?${params.toString()}`);
    }
  };

  const logout = () => {
    wrapSetUser();
  };

  const login = async (credentials: { email: string; password: string, verifyToken: string }) => {
    console.log('credentialscredentialscredentialscredentials', credentials);

    try {
      if (!credentials.email || !credentials.password || !credentials.verifyToken) return;
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
    refetchInterval: 60000,

  });
  // const queryUserInfo = useSWR(["QueryUserInfo", user?.token, location.href], () => (user?.token ? backendApi.userInfo() : undefined));
  return <AuthContext.Provider value={{ user, setLink, link, login, useDisclosure: disclosure, logout, setUser: wrapSetUser, queryUserInfo }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
