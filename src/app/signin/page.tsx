"use client";

import { AutoFlip } from "@/components/auto-flip";
import { Btn } from "@/components/btns";
import { loginTitleClassName } from "@/components/classes";
import { InputEmail, InputPassword } from "@/components/inputs";
import { PageUnlogin } from "@/components/layouts";
import { MLink } from "@/components/links";
import { SignInWithGoogle } from "@/components/SignInWithGoogle";
import { validateEmail } from "@/lib/validates";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import useRedirect from "@/hooks/useRedirect";
import { envText } from "@/lib/utils";
import Turnstile from 'react-turnstile'
import { TurnstileWidget } from "@/components/ACommonTurnstile";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ac = useContext(AuthContext);
  const params = useSearchParams();
  const referral = params.get("referral");
  const sq = useMemo(() => new URLSearchParams(params.toString()), [params]);
  const r = useRouter();
  const [verifyToken, setVerifyToken] = useState<string | undefined>(undefined)
  const exclusive = sq.has("exclusive") || ""

  const { mutate: handleSubmit, isPending: isPendingSignIn } = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      await ac.login({ email, password, verifyToken });
    },
    onError: (error: any) => {
      setVerifyToken(undefined)
    },
  });
  useRedirect()


  const href = referral ? `/signup?referral=${referral}` : exclusive ? `/signup?${params.toString()}` : '/signup'


  const disableSignIn = isPendingSignIn || validateEmail(email) !== true || !password || !verifyToken;
  return (
    <PageUnlogin headerClassNmae=" smd:!flex-[3]" type="sign">
      <AutoFlip className="mx-auto px-5 md:min-h-full flex sd flex-col gap-4 md:items-center w-full max-w-[25rem]">
        {/* <img src="logo.svg" alt="Logo" className="flip_item mt-auto h-[4.9375rem]" /> */}
        <span className={loginTitleClassName + ' flex items-center gap-2 smd:justify-center'}>
          {envText('sign')}
        </span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <InputEmail setEmail={setEmail} />
          <InputPassword setPassword={setPassword} validate={() => null} />
          <TurnstileWidget
            onVerify={setVerifyToken}
          />
          <Btn className="smd:!h-12" type="submit" isDisabled={disableSignIn} isLoading={isPendingSignIn} >
            Sign In
          </Btn>
          <SignInWithGoogle />
        </form>
        <div className="flip_item mb-auto flex items-center w-full text-xs smd:text-sm text-white/60">
          Don’t have an account?
          <MLink href={href} className="ml-2 text-xs hover:text-[#00E42A]">
            Sign Up
          </MLink>
          <MLink href={`/reset?email=${email}`} className="ml-auto text-xs  hover:text-[#00E42A]">
            Forget Password?
          </MLink>
        </div>
      </AutoFlip>
    </PageUnlogin>
  );
}
