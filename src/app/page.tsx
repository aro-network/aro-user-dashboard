"use client";

import "aos/dist/aos.css"
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "@/app/signin/page";
import { useShowParamsError } from "@/hooks/useShowParamsError";
import ADashboard, { currentENVName } from "@/components/ADashboard";
import { removeItem } from "@/lib/storage";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const exclusive = params.has('exclusive')

  const router = useRouter();
  const { user } = useContext(AuthContext);



  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (!user?.token && !user?.accessToken) {
      localStorage.setItem("pendingParams", params.toString());
    }

    if ((user?.token || user?.accessToken) && typeof window !== "undefined") {
      const storedParams = localStorage.getItem("pendingParams");
      if (storedParams) {
        localStorage.removeItem("pendingParams");

        const url = storedParams;
        const finalUrl = url.replace(/exclusive=$/, 'exclusive');
        router.replace('?' + finalUrl);

      }
    }


  }, [user, searchParams]);

  return user?.token || user?.accessToken ? <ADashboard /> : <Login />;
}
