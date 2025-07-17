import { FcGoogle } from "react-icons/fc";
import { Btn } from "./btns";
import { ForceModal } from "./dialogs";
import { InputSplitCode } from "./inputs";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useToggle } from "react-use";
import { validateReferralCode } from "@/lib/validates";
import backendApi from "@/lib/api";
import { useAuthContext } from "@/app/context/AuthContext";
import { Spinner } from "@nextui-org/react";
import { MLink } from "./links";
import { useRouter, useSearchParams } from "next/navigation";

export function SignInWithGoogle({ defReferralCode, btn = "Sign in with Google", isDisabled }: OtherTypes.SignInWithGoogleProps) {
  const ac = useAuthContext();
  const [referralCode, setReferralCode] = useState("");
  const [showInputReferral, toggleShowInputReferral] = useToggle(false);
  const [isAuthing, setIsAuthing] = useState(false);
  const refGoogleToken = useRef("");
  const params = useSearchParams()
  const referral = params.get("referral");
  const r = useRouter()


  const { mutate: handleGoogle, isPending } = useMutation({
    mutationFn: async (tokenRes: TokenResponse) => {
      setIsAuthing(false);
      refGoogleToken.current = tokenRes.access_token;
      const result = await backendApi.loginByGoogleApi({ accessToken: tokenRes.access_token });
      console.log('resultresultresult', result);
      const referralCode = defReferralCode || referral
      if (result.token) {
        ac.setUser(result);
      } else if (referralCode && validateReferralCode(referralCode) === true) {
        const res = await backendApi.loginSetReferralApi({ accessToken: refGoogleToken.current, referralCode: referralCode.trim() })
        if (res) {
          ac.setUser(res);
        } else {
          toggleShowInputReferral();
        }
      } else {
        toggleShowInputReferral();
      }
    },
  });
  const loginGoogle = useGoogleLogin({
    flow: "implicit",
    onNonOAuthError: () => {
      setIsAuthing(false);
    },
    onError: (err) => {
      setIsAuthing(false);
    },
    onSuccess: handleGoogle,
  });
  const { mutate: onConfirmReferralCode, isPending: isPendingConfirmReferralCode } = useMutation({
    mutationFn: async () => {
      if (validateReferralCode(referralCode) !== true || !refGoogleToken.current) return;
      const res = await backendApi.loginSetReferralApi({ accessToken: refGoogleToken.current, referralCode });
      ac.setUser(res);
      toggleShowInputReferral(false);
    },
  });
  const { mutate: onSkipReferralCode, isPending: isPendingSkiping } = useMutation({
    mutationFn: async () => {
      if (!refGoogleToken.current) return;
      const res = await backendApi.loginSetReferralApi({ accessToken: refGoogleToken.current });
      ac.setUser(res);
      toggleShowInputReferral(false);
    },
  });

  const onClick = () => {
    setIsAuthing(true);
    loginGoogle();
  };
  const disableGetBoosted = isPendingConfirmReferralCode || isPending || validateReferralCode(referralCode) !== true || !refGoogleToken.current;
  const disableLogin = isDisabled || isPending || isAuthing;
  return (
    <>
      <Btn color="default" type="button" className="bg-default hover:bg-l1 smd:!h-12 text-white border !border-none" isDisabled={disableLogin} isLoading={isPending || isAuthing} onClick={onClick}>
        <FcGoogle /> {btn}
      </Btn>

      <ForceModal isOpen={showInputReferral}>
        <p className="self-stretch flex-grow-0 flex-shrink-0  text-base text-center text-white">Got a Referral Code?</p>
        <p className="self-stretch flex-grow-0 flex-shrink-0  text-sm text-center text-white/50">{`Add your Referral Code here to claim 200 Jade rewards! No code yet? Enter it later in your Dashboard.`}</p>
        <InputSplitCode onChange={setReferralCode} />
        <Btn isDisabled={disableGetBoosted} className="w-full" onClick={() => onConfirmReferralCode()} isLoading={isPendingConfirmReferralCode}>
          Get Boosted
        </Btn>
        <div className="flex justify-center text-white/80  text-sm h-5 items-center">
          <MLink onClick={() => onSkipReferralCode()} className="ml-2 text-xs">
            {isPendingSkiping ? <Spinner size="sm" /> : "Skip"}
          </MLink>
        </div>
      </ForceModal>
    </>
  );
}
