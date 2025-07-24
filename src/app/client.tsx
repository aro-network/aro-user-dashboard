"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useThemeState } from "@/components/theme-mode";
import { ToastContainer } from 'react-toastify';
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

  if (process.env.NODE_ENV === "production") {
    // console.log = function () { };
    console.error = function () { };
    console.warn = function () { };
  }

  return (
    <>
      <ToastContainer
        style={{ top: '100px', right: '50px' }}
        toastClassName="smd:w-[200px]"
      />
      <Providers>{children}</Providers>
    </>
  );
}