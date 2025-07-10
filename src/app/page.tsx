"use client";

import "aos/dist/aos.css"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "@/app/signin/page";
import { useShowParamsError } from "@/hooks/useShowParamsError";
import ADashboard from "@/components/ADashboard";
import { removeItem } from "@/lib/storage";

export default function Page() {
  const { user } = useContext(AuthContext);
  useShowParamsError();
  return user?.token || user?.accessToken ? <ADashboard /> : <Login />;
}
