import { IoAlertCircle, IoTerminal } from "react-icons/io5";
import { SVGS } from "@/svg";
import { FaLink, FaXTwitter } from "react-icons/fa6";
import { IoIosCheckmarkCircle, IoIosMore } from "react-icons/io";
import { useAuthContext } from "@/app/context/AuthContext";
import { useCopy } from "@/hooks/useCopy";
import { IconCard, TitCard } from "../cards";
import { Btn, IconBtn } from "../btns";
import { fmtBerry } from "../fmtData";
import { DupleInfo, DupleSplit } from "../EdgeNode/AOverview";
import { HelpTip } from "../tips";
import { useQuery } from "@tanstack/react-query";
import backendApi from "@/lib/api";

export default function AMyReferral() {
  const ac = useAuthContext();
  const user = ac.queryUserInfo?.data;
  const referredCount = user?.referral.valid || 0;
  const referringCount = user?.referral.pending || 0;
  const referredPoint = fmtBerry(user?.point.referral);
  const copy = useCopy();
  const onPostX = () => {
    const refferralLink = `${origin}/signup?referral=${user?.inviteCode}`;
    const text = `
Join the magic journey with @EnReachAI – the genesis of open edge cloud, for the AI era.

Get your EnReach Edge Node ready for🫐BerryBurst Season 1🫐

    `;
    const postXUrl = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(refferralLink)}`;
    window.open(postXUrl, "_blank");
  };


  const { data, isFetching, refetch } = useQuery({
    queryKey: ["ReferralRewards"],
    enabled: true,
    refetchOnWindowFocus: false,
    queryFn: () => backendApi.getReferralRewards()
  })


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full  mt-5 ">
      <IconCard
        className="flip_item"
        iconSize={20}
        icon={SVGS.SvgReferral}
        tit={<div className="text-xl font-Alexandria w-full">My Referral Code</div>}
        content={
          <div className="flex items-center gap-4">
            <div className="uppercase text-4xl leading-8 font-bold">{user?.inviteCode}</div>
            <IconBtn tip="Copy Referral Link" onClick={() => copy(`${origin}/signup?referral=${user?.inviteCode}`)}>
              <FaLink />
            </IconBtn>
            <IconBtn tip="Tweet Your Referral" onClick={onPostX}>
              <FaXTwitter />
            </IconBtn>
          </div>
        }
      />

      <IconCard
        className="flip_item"
        icon={SVGS.SvgRewards}
        iconSize={20}
        tit={
          <div className="text-xl flex items-center gap-2  font-Alexandria">
            Referral Bonus{" "}
            <HelpTip content="Referral Bonus include an one-time bonus for a qualified referral, and a permanent percentage share of your referees’ Network Bonus." />
          </div>

        }
        content={
          <div className="flex items-center gap-[10%] min-w-[13.75rem]">

            <div className="flex items-center gap-[10%]">
              <DupleInfo tit={data?.referredRewards} sub="BERRY" />
            </div>

            <DupleSplit />

            <DupleInfo
              tit={data?.referred}
              subClassName="text-green-400 opacity-100"
              sub={
                <>
                  <IoIosCheckmarkCircle /> Referred
                </>
              }
            />
          </div>
        }
      />
      <IconCard
        className="flip_item col-span-full h-[10.625rem] w-full "
        icon={() => <IoAlertCircle />}
        iconSize={20}
        tit={
          <div className=" flex items-center w-full  md:gap-10 mt-[3.75rem] font-Alexandria   ">

            <div className="flex flex-col  text-white w-auto ">
              <span className="text-base ">
                How Referral Program Works?
              </span>
              <div className=" text-[#FFFFFFB2] text-sm pt-1 flex flex-col">
                <span >
                  {` The Referrer enjoy 15% commission from the Referee's mining rewards.`}
                </span>
                <span>
                  Contact us to get whitelisted for the extra seond-tier commission.
                </span>
              </div>
            </div>
            <div className="flex  items-center xsl:justify-center xsl:gap-5 gap-20 w-full flex-wrap">
              <img src="./refer.png" className="w-auto h-auto" />
              <img src="./refer1.png" className="w-auto h-auto" />
            </div>
          </div>

        }
        content={
          <></>

        }
      />


    </div>
  );
}
