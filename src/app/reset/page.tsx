"use client";

import { Btn } from "@/components/btns";
import { InputEmail, InputPassword, InputVerifyCode } from "@/components/inputs";
import backendApi from "@/lib/api";
import { sleep } from "@/lib/utils";
import { validateConfirmPassword, validateEmail, validatePassword, validateVerifyCode } from "@/lib/validates";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCounter, useInterval } from "react-use";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { AutoFlip } from "@/components/auto-flip";
import { PageUnlogin } from "@/components/layouts";
import { loginTitleClassName } from "@/components/classes";
import { MLink } from "@/components/links";
import { TurnstileWidget } from "@/components/ACommonTurnstile";

export default function Page() {
  const sp = useSearchParams();
  const [email, setEmail] = useState(sp.get("email") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [sendCount, actionSendCount] = useCounter(0, 60, 0);
  useInterval(() => {
    actionSendCount.dec(1);
  }, 1000);
  const r = useRouter();
  const ac = useAuthContext();
  const { mutate: onReset, isPending } = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      if (!email) throw new Error("Please enter email");
      if (!password || !confirmPassword) throw new Error("Please enter email or password");
      if (password !== confirmPassword) throw new Error("Please confirm password");
      if (!verifyCode) throw new Error("Please enter verify code");
      await backendApi.resetPassword({ email, password, verifyCode: verifyCode.trim() });

      toast.success("Reset Password Success!");
      ac.logout();
      await sleep(2000);
      r.push("/signin");
    },
  });
  const [verifyToken, setVerifyToken] = useState<string | undefined>('')


  const {
    mutate: onSend,
    isPending: isPendingSend,
    isIdle: isIdleSend,
  } = useMutation({
    mutationFn: async () => {
      if (!email) throw new Error("Please enter email");
      await backendApi.sendResetPassword(email, verifyToken);
      actionSendCount.reset(60);
    },
  });

  console.log('verifyTokenverifyTokenverifyToken', verifyToken);


  const disableReset =
    isPending ||
    validateVerifyCode(verifyCode) !== true ||
    validateEmail(email) !== true ||
    validatePassword(password) !== true ||
    validateConfirmPassword(confirmPassword, password) !== true
  const disableSend = isPendingSend || sendCount > 0 || validateEmail(email) !== true || !verifyToken;
  return (
    <PageUnlogin headerClassNmae="smd:!flex-[2]" childrenClassName="smd:!flex-[8]" type='reset'>
      <AutoFlip className="mx-auto p-5 md:min-h-full flex flex-col gap-5 items-center w-full max-w-[25rem]">
        {/* <img src="logo.svg" alt="Logo" className="flip_item mt-auto h-[4.9375rem]" /> */}
        <span className={loginTitleClassName}>Reset Password</span>
        <form onSubmit={onReset} className="flex flex-col gap-5 w-full mb-auto">
          <InputEmail value={email} setEmail={setEmail} />
          <InputPassword label="New Password" setPassword={setPassword} />
          <InputPassword label="Confirm Password" setPassword={setConfirmPassword} validate={(value) => validateConfirmPassword(value, password)} />
          <TurnstileWidget
            onVerify={setVerifyToken}
          />
          <div className="flex gap-5 items-center w-full">
            <div className="flex-1">
              <InputVerifyCode setVerifyCode={setVerifyCode} />
            </div>
            <Btn className="!w-[100px] text-center relative shrink-0" type="button" isDisabled={disableSend} isLoading={isPendingSend} onClick={onSend as any}>
              {isPendingSend ? "" : isIdleSend ? "Send" : sendCount > 0 ? `${sendCount}s` : "Resend"}
            </Btn>
          </div>

          <Btn type="submit" isDisabled={disableReset} isLoading={isPending}>
            Reset Password
          </Btn>
          <MLink href="/signin" className="text-xs smd:text-sm text-left hover:text-[#00E42A]">
            Go back
          </MLink>
        </form>
      </AutoFlip>
    </PageUnlogin>
  );
}
