import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getItem } from "@/lib/storage";

const useRedirect = (redirectPath = "/") => {
  const router = useRouter();

  useEffect(() => {
    const lastLoginUser = getItem("last-login-user");
    if (lastLoginUser) {
      router.replace(redirectPath);
    }
  }, [router, redirectPath]);
};

export default useRedirect;
