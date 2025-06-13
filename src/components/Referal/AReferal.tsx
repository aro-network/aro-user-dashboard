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
import { AllText } from "@/lib/allText";

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
Join the magic journey with @EnReachAI – the New Edge of AI. Testnet is LIVE!


Share your idle internet, earn rewards, build a smarter web, together. 


    `;
    const postXUrl = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(refferralLink)}`;
    window.open(postXUrl, "_blank");
  };


  const { data, isFetching, refetch } = useQuery({
    queryKey: ["ReferralRewards"],
    enabled: true,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const [rewardsInfo, whiteListInfo] = await Promise.all([backendApi.getReferralRewards(), backendApi.getWhiteListInfo()])
      return { rewardsInfo, whiteListInfo }
    }
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
              <IconBtn className="bg-[#00E42A] hover:bg-[#5CF077]" tip="Copy Referral Link" onClick={() => copy(`${origin}/signup?referral=${user?.inviteCode}`)}>
                <FaLink className="text-black" />
              </IconBtn>
              {/* <IconBtn tip="Tweet Your Referral" onClick={onPostX}>
                <FaXTwitter />
              </IconBtn> */}
            </div>
          }
        />

        <IconCard
          className="flip_item h-full smd:min-h-[12.5rem]"
          icon={SVGS.SvgRewards}
          iconSize={20}
          tit={
            <div className="flex w-full items-center justify-between  smd:flex-wrap smd:gap-[.625rem]">
              <div className="text-xl smd:text-base flex items-center gap-2  font-Alexandria">
                Referral Bonus{" "}
                <HelpTip className=" w-[12.5rem]" content={AllText.referral.referralBonusTips} />
              </div>
              {data?.whiteListInfo.whiteListUser &&
                <div>
                  <HelpTip className=" w-[12.5rem]" content={AllText.referral.whitelistedTips} >
                    <div className="bg-[#FF8748] rounded-[1.875rem] text-white text-xs py-1 px-2">
                      Whitelisted
                    </div>
                  </HelpTip>
                </div>
              }
            </div>



          }
          content={
            <div className="flex items-center gap-[10%] smd:gap-[30%] min-w-[13.75rem] smd:h-full">

              <div className="flex items-center gap-[10%]">
                <DupleInfo titClassName="smd:text-2xl" subClassName="smd:text-xs" tit={formatNumber(Number(data?.rewardsInfo.referredRewards) || 0)} sub="Jades" />
              </div>

              <DupleSplit className="smd:hidden" />

              <DupleInfo
                tit={

                  data?.whiteListInfo.whiteListUser ?
                    <div className="flex items-center gap-2">
                      <span>
                        {(data?.whiteListInfo.inviteCounts.level1 || 0)} + {(data?.whiteListInfo.inviteCounts.level2 || 0)}
                      </span>
                      <HelpTip className=" w-[12.5rem]" content={AllText.referral.isInvitedTips} />

                    </div>
                    : (data?.rewardsInfo.referred || 0)}
                subClassName="text-[#00E42A]  smd:text-xs "
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
                    Referrers earn a 15% commission on their referees' Edge Node rewards.
                  </span>
                  <span>
                    Contact us to get whitelisted for an additional second-tier commission.
                  </span>
                </div>
              </div>
              <div className="flex  smd:hidden items-center xsl:justify-center xsl:gap-10 xsl:mt-5 gap-20 w-full flex-wrap">
                <img src="./refer.png" className="w-[8.6875rem]  h-auto" />
                <img src="./refer1.png" className="w-[15.625rem] h-auto" />
              </div>
            </div>

          }
          content={
            <div className="md:hidden h-full ">
              <div className="w-full smd:text-sm text-[#FFFFFFB2] smd:pt-[.625rem]">
                Referrers earn a 15% commission on their referees' Edge Node rewards.     Contact us to get whitelisted for an additional second-tier commission.
              </div>
              <div className="flex  pt-10  items-center xsl:justify-center xsl:gap-10 xsl:mt-5 gap-14 w-full flex-wrap">
                <img src="./refer.png" className="w-[8.6875rem] h-auto" />
                <img src="./refer1.png" className="w-[15.625rem] h-auto" />
              </div>
            </div>

          }
        />


      </div>
    </div>
  );
}
