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
import { formatNumber } from "@/lib/utils";

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
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 smd:h-full mt-5   ">
        <IconCard
          className="flip_item h-auto smd:min-h-[12.5rem] "
          iconSize={20}
          icon={SVGS.SvgReferral}
          tit={<div className="text-xl smd:text-base font-Alexandria w-full">My Referral Code</div>}
          content={
            <div className="flex items-center gap-4 h-full">
              <div className="uppercase text-4xl smd:text-[2rem] leading-8 font-bold">{user?.inviteCode}</div>
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
          className="flip_item h-full smd:min-h-[12.5rem]"
          icon={SVGS.SvgRewards}
          iconSize={20}
          tit={
            <div className="text-xl smd:text-base flex items-center gap-2  font-Alexandria">
              Referral Bonus{" "}
              <HelpTip className=" w-[12.5rem]" content="As a referrer, you earn a commission from your referee's node rewards." />
            </div>

          }
          content={
            <div className="flex items-center gap-[10%] smd:gap-[30%] min-w-[13.75rem] smd:h-full">

              <div className="flex items-center gap-[10%]">
                <DupleInfo titClassName="smd:text-2xl" subClassName="smd:text-xs" tit={formatNumber(Number(data?.referredRewards) || 0)} sub="BERRY" />
              </div>

              <DupleSplit className="smd:hidden" />

              <DupleInfo
                tit={data?.referred || 0}
                subClassName="text-green-400 opacity-100 smd:text-xs "
                titClassName=" smd:text-2xl"
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
          className="flip_item col-span-full h-[10.625rem] smd:min-h-[440px] w-full "
          icon={() => <IoAlertCircle className="text-[1.25rem]" />}
          iconSize={20}
          tit={
            <div className="  flex  w-full smd:flex-col smd:h-full items-center  md:gap-10 smd:mt-5 mt-[3.75rem] font-Alexandria   ">

              <div className="flex flex-col  text-white w-full ">
                <div className="text-base smd:flex smd:w-full  smd:flex-wrap  smd:overflow-x-auto smd:whitespace-normal">
                  How Referral Program Works?
                </div>
                <div className=" text-[#FFFFFFB2] text-sm pt-1 flex flex-col smd:hidden">
                  <span >
                    {` The Referrer enjoy 15% commission from the Referee's mining rewards.`}
                  </span>
                  <span>
                    Contact us to get whitelisted for the extra seond-tier commission.
                  </span>
                </div>
              </div>
              <div className="flex  smd:hidden items-center xsl:justify-center xsl:gap-10 xsl:mt-5 gap-20 w-full flex-wrap">
                <img src="./refer.png" className="w-auto h-auto" />
                <img src="./refer1.png" className="w-auto h-auto" />
              </div>
            </div>

          }
          content={
            <div className="md:hidden h-full ">
              <div className="w-full smd:text-sm text-[#FFFFFFB2] smd:pt-[.625rem]">
                The Referrer enjoy 15% commission from the Referee's mining rewards.   Contact us to get whitelisted for the extra seond-tier commission.
              </div>
              <div className="flex  pt-10  items-center xsl:justify-center xsl:gap-10 xsl:mt-5 gap-14 w-full flex-wrap">
                <img src="./refer.png" className="w-auto h-auto" />
                <img src="./refer1.png" className="w-auto h-auto" />
              </div>
            </div>

          }
        />


      </div>
    </div>
  );
}
