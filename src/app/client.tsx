"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useThemeState } from "@/components/theme-mode";
import { IoIosCloseCircle } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  }
});

const googleClientId = "425165933886-vpv32tvbhfeqfujnel0fdjm88kfn1lhn.apps.googleusercontent.com";

export function Providers({ children }: { children: React.ReactNode }) {
  useThemeState();
  return (
    <NextUIProvider className="App  ">
      <GoogleOAuthProvider clientId={googleClientId}>
        <QueryClientProvider client={client}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </NextUIProvider>
  );
}

export function PageLayout({ children }: { children: ReactNode }) {
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);
  if (!init) return null;

  // if (process.env.NODE_ENV === "production") {
  //   console.log = function () { };
  //   console.error = function () { };
  //   console.warn = function () { };
  // }
  return (
    <>
      <Toaster
        richColors
        position="top-right"
        offset={100}
        theme="light"
        style={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          { '--width': '16.25rem' }
        }
        toastOptions={{
          classNames: {
            toast: "rounded-xl bg-[#585858] border border-solid border-white/10 text-white/60 text-xs px-4 py-2",
            error: '!bg-[#FFD4D7] flex !items-baseline  gap-[.9375rem]  !text-base  !font-AlbertSans ',
            warning: '!bg-[#585858] !border-[#585858] !text-[#FFF] !gap-5 ',
            title: '!leading-[1.2] !font-normal',
          }
        }}
        icons={{
          error: <div className=""><img src='./error.svg' className="text-[#FF3A3D] " /></div>,
          warning: <CiWarning className="text-[#FFF] text-xs" />
        }}
      />
      <Providers>{children}</Providers>
    </>
  );
}