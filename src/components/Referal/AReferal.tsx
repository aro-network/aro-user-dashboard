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
              <DupleInfo tit={referredPoint} sub="BERRY" />
            </div>

            <DupleSplit />

            <DupleInfo
              tit={referredCount}
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
        className="flip_item col-span-full h-[10.625rem] "
        icon={() => <IoAlertCircle />}
        iconSize={20}
        tit={
          <div className=" flex items-center gap-20  mt-[3.75rem] font-Alexandria   ">

            <div className="flex flex-col  text-white w-full ">
              <span className="text-base ">
                How Referral Program Works?
              </span>
              <div className=" text-[#FFFFFFB2] text-sm flex flex-col">
                <span >
                  Ask your friends to join EnReach Network
                </span>
                <span>
                  and get referral bonus!
                </span>
              </div>
            </div>

            <img src="./refer.png" className="w-full h-full" />

            <img src="./refer1.png" className="w-full h-full" />

          </div>
        }
        content={
          <></>

        }
      />


    </div>
  );
}
