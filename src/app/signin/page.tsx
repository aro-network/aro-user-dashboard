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
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSearchParams } from "next/navigation";
import useRedirect from "@/hooks/useRedirect";
import { envText } from "@/lib/utils";
import { ENV } from "@/lib/env";
import { HelpTip } from "@/components/tips";
import { CiCircleQuestion } from "react-icons/ci";
import useMobileDetect from "@/hooks/useMobileDetect";
import { SVGS } from "@/svg";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ac = useContext(AuthContext);
  const params = useSearchParams();
  const referral = params.get("referral");
  const [isOpen, setIsOpen] = useState(false)
  const helpTipRef = useRef<any>(null);
  const isMobile = useMobileDetect()

  const { mutate: handleSubmit, isPending: isPendingSignIn } = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      await ac.login({ email, password });
    },
  });
  useRedirect()
  const href = referral ? `/signup?referral=${referral}` : '/signup'

  const openPage = () => {
    window.open("https://enreach.network/#target-section", "_blank");
  };

  useEffect(() => {
    const handleClose = (event: { type: string; target: any; }) => {
      if (event.type === "click" && helpTipRef.current!.contains(event.target)) {
        return;
      }
      setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("click", handleClose, true);
      window.addEventListener("scroll", handleClose, true);
    }

    return () => {
      window.removeEventListener("click", handleClose, true);
      window.removeEventListener("scroll", handleClose, true);
    };
  }, [isOpen]);


  const disableSignIn = isPendingSignIn || validateEmail(email) !== true || !password;
  return (
    <PageUnlogin headerClassNmae=" smd:!flex-[3]">
      <AutoFlip className="mx-auto px-5 md:min-h-full flex sd flex-col gap-4 md:items-center w-full max-w-[25rem]">
        {/* <img src="logo.svg" alt="Logo" className="flip_item mt-auto h-[4.9375rem]" /> */}
        <span className={loginTitleClassName + ' flex items-center gap-2 smd:justify-center smd:text-xl'}>
          {envText('sign')}
          <div hidden={ENV !== 'prod'} ref={helpTipRef} className="text-[#FFFFFF80] " onClick={() => setIsOpen(!isOpen)} onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <HelpTip content={
              <span>
                Devnet is for closed test only. Devnet is not Testnet. No mining rewards will be generated in Devnet. Testnet is coming soon. To join Devnet, please refer to the
                <button onClick={openPage} className=" underline underline-offset-1"> Pioneer Program.</button>
              </span>

            } isOpen={isOpen} className=" w-[12.5rem]" placement={isMobile ? 'top' : 'bottom'} >
              <div>
                <SVGS.SvgQuesiton />
              </div>
            </HelpTip>
          </div>
        </span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <InputEmail setEmail={setEmail} />
          <InputPassword setPassword={setPassword} validate={() => null} />
          <Btn type="submit" className="!" isDisabled={disableSignIn} isLoading={isPendingSignIn}>
            Sign In
          </Btn>
          <SignInWithGoogle />
        </form>
        <div className="flip_item mb-auto flex items-center w-full text-xs text-white/60">
          Don’t have an account?
          <MLink href={href} className="ml-2 text-xs">
            Sign Up
          </MLink>
          <MLink href={`/reset?email=${email}`} className="ml-auto text-xs">
            Forget Password?
          </MLink>
        </div>
      </AutoFlip>
    </PageUnlogin>
  );
}
