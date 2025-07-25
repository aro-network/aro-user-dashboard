"use client";

import { AutoFlip } from "@/components/auto-flip";
import { Btn } from "@/components/btns";
import { loginTitleClassName } from "@/components/classes";
import { InputEmail, InputPassword, InputSplitCode } from "@/components/inputs";
import { PageUnlogin } from "@/components/layouts";
import { MLink } from "@/components/links";
import { SignInWithGoogle } from "@/components/SignInWithGoogle";
import backendApi from "@/lib/api";
import { validateConfirmPassword, validateEmail, validatePassword, validateVerifyCode } from "@/lib/validates";
import { SingUpResult } from "@/types/user";
import { Checkbox, cn, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useCounter, useInterval, useToggle } from "react-use";
import { useAuthContext } from "../context/AuthContext";
import { ForceModal } from "@/components/dialogs";
import { envText } from "@/lib/utils";
import useMobileDetect from "@/hooks/useMobileDetect";
export default function Page() {
  const sq = useSearchParams();

  const ac = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referalCode, setReferalCode] = useState(sq.get("referral") || "");
  const [showToVerify, setShowToVerify] = useState(false);
  const [checkedTermPrivacy, setCheckedTermPrivacy] = useToggle(false);
  // const [checkedReceiveEmail, setCheckedReceiveEmail] = useToggle(false);
  const [reSendSecends, actionResendScends] = useCounter(60, 60, 0);
  useInterval(() => actionResendScends.dec(1), 1000);
  const [showInputReferral, toggleShowInputReferral] = useToggle(false);
  const isMobile = useMobileDetect()
  const params = useMemo(() => new URLSearchParams(sq.toString()), [sq]);


  const [verifyCode, setVerifyCode] = useState("");
  const r = useRouter();
  const refRegisterUser = useRef<SingUpResult>();
  const { mutate: handlerSubmit, isPending } = useMutation({
    mutationFn: async () => {
      try {
        if (!email || !password || !confirmPassword) throw new Error("Please enter email or password");
        if (password !== confirmPassword) throw new Error("Please confirm password");
        if (!checkedTermPrivacy) throw new Error("Plase checked Term of Service and Privacy Policy");
        refRegisterUser.current = await backendApi.registerApi({ email, password, referralCode: referalCode ? referalCode.trim() : undefined });
        actionResendScends.reset(60);
        setShowToVerify(true);
        const exclusive = sq.has("exclusive") || ""
        if (exclusive) {
          params.set('exclusive', '')
        }
      } catch (e) {
        setReferalCode('')
      }
    },
  });

  const onSkip = () => {
    toggleShowInputReferral(false)
    handlerSubmit()
  }

  const { mutate: handlerVerify, isPending: isPendingVerify } = useMutation({
    mutationFn: async () => {
      try {
        if (!verifyCode || validateVerifyCode(verifyCode) !== true) throw new Error("Please enter verify code");
        if (!refRegisterUser.current) throw new Error("Please sign up");
        const res = await backendApi.verifyRegisterCode(refRegisterUser.current.userId, verifyCode.trim());
        if (res && res.token) {
          ac.setUser(res);
        } else {
          // try sign
          const res = await backendApi.loginApi({ email, password });
          if (res.token) {
            ac.setUser(res);
          } else {
            r.push("/signin");
          }
        }
      } catch (e) {
        setVerifyCode('')
      }
    },
  });
  const { mutate: handlerResendVerify, isPending: isPendingResendVerify } = useMutation({
    mutationFn: async (e: MouseEvent) => {
      e.preventDefault();
      if (!refRegisterUser.current) throw new Error("Please sign up");
      await backendApi.resendRegisterVerifyCode(refRegisterUser.current.userId);
      actionResendScends.reset(60);
    },
  });

  const disableVerifyEmail = isPendingVerify || validateVerifyCode(verifyCode) !== true;

  const disableSignUp =
    !checkedTermPrivacy ||
    validateEmail(email) !== true ||
    validatePassword(password) !== true ||
    validateConfirmPassword(confirmPassword, password) !== true;
  const disableResendEmail = reSendSecends > 0 || isPendingResendVerify;


  const [isShow, setIsShow] = useState(false)




  return (
    <>
      {!isShow && isMobile ?
        <div className="w-full h-full flex smd:flex-col  ">
          <div className={cn("flex-[4] smd:flex-[1] px-[33px]  bg-[url(/mainBg.png)] bg-no-repeat bg-cover bg-center items-center  md:min-h-full  smd:h-full basis-0 flex flex-col  justify-center pt-10 md:overflow-auto  text-base",)}>
            <img src="https://aro.network/aro-logo.svg" alt="Logo" className=" h-[22px]" />
            <div className="flex gap-6  flex-col justify-center items-center px-5 mt-10">
              <div className="text-[26px] font-bold text-center ">ARO Previewnet Is LIVE!</div>
              <div className={`text-[42px]  xs:text-[1.75rem] smd:text-lg  leading-normal text-center text-xl text-[#00FF0D]`}>
                <div className="text-left leading-[190%]">
                  - Join the $ARO Reward Rush<br />
                  - Run and test ARO Nodes<br />
                  - $30k Top Referrer Bonus<br />
                </div>
              </div>
            </div>

            <img src="/block.svg" width={25} height={63} alt='block' className="mt-5" />
            <Btn className="w-full mx-12 mt-5  h-12" onPress={() => setIsShow(true)}>Sign Up</Btn>
            <button onClick={() => window.open('https://docs.aro.network/campaigns/previewnet')} className="underline underline-offset-1 hover:text-[#00FF0D] text-white mt-5">Learn More</button>
          </div>
        </div>
        :

        <PageUnlogin headerClassNmae=" smd:!flex-[2] " type="signUp" >
          <AutoFlip className="mx-auto p-5 md:min-h-full flex h-full flex-col gap-5 items-center w-full max-w-[25rem]">
            <div className={loginTitleClassName + ' flex items-center gap-2'} >
              {envText('signUp')}
            </div>
            {/* <img src="logo.svg" alt="Logo" className="mt-auto h-[4.9375rem]" /> */}
            {showToVerify ? (
              <div className="flex flex-col items-center gap-5 smd:w-full mb-auto  w-[400px] smd:px-5">
                <div className="text-center  w-full mx-auto">
                  Verify your email
                  <br />
                  Enter the 6-digit verification code we sent to your inbox below:
                </div>
                <InputSplitCode onChange={setVerifyCode} value={verifyCode} />
                <Btn className="w-full" onPress={() => handlerVerify()} isDisabled={disableVerifyEmail} isLoading={isPendingVerify}>
                  Verify Email
                </Btn>
                <MLink className="text-xs -mt-1 flex items-center gap-2" onClick={handlerResendVerify} isDisable={disableResendEmail}>
                  {isPendingResendVerify && <Spinner size="sm" />}
                  {reSendSecends > 0 ? `Resend Email (${reSendSecends}s)` : "Resend Email"}
                </MLink>
              </div>
            ) : (
              <div className="flex flex-col gap-5 w-full mb-auto smd:mb-10">
                <InputEmail setEmail={setEmail} />
                <InputPassword setPassword={setPassword} />
                <InputPassword label="Confirm Password" setPassword={setConfirmPassword} validate={(value) => validateConfirmPassword(value, password)} />
                <div className="flex items-center flex-wrap smd:text-sm text-xs text-white/60">
                  <Checkbox className=" " classNames={{ wrapper: 'flip_item', label: "text-xs smd:text-sm text-white/60", icon: "w-2.5 h-2.5" }} checked={checkedTermPrivacy} onValueChange={setCheckedTermPrivacy}>
                    I agree to the ARO{"\u00A0"}
                  </Checkbox>
                  <MLink target="_blank" className="text-xs smd:text-sm   hover:text-[#00E42A]" href="https://aro.network/terms" >
                    Terms of Service
                  </MLink>{" "}
                  <div className="">
                    {"\u00A0"}and{"\u00A0"}
                  </div>
                  <MLink target="_blank" className="text-xs smd:text-sm   hover:text-[#00E42A]" href="https://aro.network/privacy">
                    {" "}Privacy Policy
                  </MLink>
                  .
                </div>

                <Btn onPress={() => {

                  if (referalCode) {
                    handlerSubmit()
                    return
                  }
                  toggleShowInputReferral(true)

                }
                } isDisabled={disableSignUp} >
                  Sign Up
                </Btn>
                <SignInWithGoogle btn="Sign up with Google" defReferralCode={referalCode} />
                <div className="flip_item text-center text-xs smd:text-sm text-white/60">
                  Already have an account?{" "}
                  <MLink href="/signin" className="text-xs smd:text-sm   hover:text-[#00E42A]">
                    Sign In
                  </MLink>
                </div>
              </div>
            )}
          </AutoFlip>
        </PageUnlogin>
      }
      <ForceModal isOpen={showInputReferral}>
        <p className="self-stretch flex-grow-0 flex-shrink-0  text-base text-center text-white">Got a Referral Code?</p>
        <p className="self-stretch flex-grow-0 flex-shrink-0  text-sm text-center text-white/50">{`Add your Referral Code here to claim 200 Jade rewards! No code yet? Enter it later in your Dashboard.`}</p>
        <InputSplitCode onChange={setReferalCode} />
        <Btn isDisabled={referalCode.length !== 6} className="w-full" onPress={() => onSkip()} >
          Get Boosted
        </Btn>
        <div className="flex justify-center text-white/80  text-sm h-5 items-center">
          <MLink onClick={() => onSkip()} className="ml-2 text-xs">
            {isPending ? <Spinner size="sm" /> : "Skip"}
          </MLink>
        </div>
      </ForceModal>
    </>



  );
}
