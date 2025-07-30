import { useAuthContext } from "@/app/context/AuthContext";
import { useCopy } from "@/hooks/useCopy";
import { handlerErrForBind } from "@/hooks/useShowParamsError";
import backendApi, { Api, BASE_API } from "@/lib/api";
import { retry } from "@/lib/async";
import { envText, formatNumber } from "@/lib/utils";
import { postX } from "@/lib/x";
import { SVGS } from "@/svg";
import { UserCampaignsRewards } from "@/types/user";
import { cn, Image, Input, Skeleton } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { telegramAuth } from "@use-telegram-auth/hook";
import Aos from 'aos';
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, Fragment, PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { FaLink, FaXTwitter } from "react-icons/fa6";
import { FiCheck, FiArrowUpRight } from "react-icons/fi";
import { IoAlertCircle } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { useToggle } from "react-use";
import { toast } from "react-toastify";
import { currentENVName } from "../ADashboard";
import { Btn, IconBtn } from "../btns";
import { IconCard } from "../cards";
import { ForceModal } from "../dialogs";
import { DupleInfo, DupleSplit } from "../EdgeNode/AOverview";
import { TbClipboardText } from "react-icons/tb";

import { HelpTip } from "../tips";
import ArrowIcon from "./Components/ArrowIcon";
import useMobileDetect from "@/hooks/useMobileDetect";
import { InputRedeemCode, InputSplitCode } from "../inputs";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";



const DEF_ANIMITEM = false
function ItemCard({ className, active, children, disableAnim = !DEF_ANIMITEM }: { className?: string, active?: boolean, disableAnim?: boolean } & PropsWithChildren) {
  const animProps = disableAnim ? {} : {
    'data-aos': "fade-up",
    'data-aos-duration': "1000"
  }
  return <div {...animProps} className={cn("bg-l1 shadow-1 rounded-xl bg-no-repeat bg-cover bg-center p-5 ", { "bg-online  rounded-lg": active, 'commonTab': !active }, className)}>
    {children}
  </div>
}

function Title({ text, tip, needIcon }: { text?: string, tip?: string | ReactNode, needIcon?: boolean }) {
  return <div className="text-xl flex gap-2 items-center font-Alexandria smd:text-base">
    {needIcon ? <Fragment> <Image src='./task.svg' width={20} height={20} alt='task' /> {text}</Fragment> : text}{Boolean(tip) && <HelpTip content={tip} />}
  </div>
}


function FinishBadge({ className }: { className?: string }) {
  return <div
    className={cn("flex justify-end absolute top-0 right-0 bg-[#FFCA1A] rounded-bl-[9995px] pt-[calc(var(--finish-badge-size)*0.1538)] pr-[calc(var(--finish-badge-size)*0.1282)] [--finish-badge-size:39px] w-[var(--finish-badge-size)] h-[var(--finish-badge-size)] text-[calc(var(--finish-badge-size)*21/39)] ", className)}>
    <FiCheck className="text-white" />
  </div>
}

type StepData = { finished: boolean, tit: string | ReactNode, action: string, addJade?: number, actionLoading?: boolean, onAction: () => void, userName?: string, connectd?: string }
function SocialTaskItem({ data, className }: { data: { icon: IconType | FC, first: StepData, secend?: StepData, title?: string, jade?: number, isHidden?: boolean, highlighted?: boolean }, className?: string, }) {
  const Micon = data.icon
  const finished = data.first.finished && (!data.secend || data.secend.finished)


  return (
    <div className={cn(" flex  flex-col task-tab w-full gap-5", className)}>
      {finished && <FinishBadge className="[--finish-badge-size:26px] smd:[--finish-badge-size:32px]" />}

      <div className="flex gap-2.5 items-center smd:justify-center">
        <div className="font-medium  text-lg smd:text-base">
          {data.title}
        </div>
        <div className=" text-[26px] font-semibold text-[#00E42A]">
          +{data.jade}
        </div>
        <div className="text-sm font-normal  smd:text-base"> Jade</div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-9 smd:gap-2.5 xs:gap-5 items-center smd:flex-col  h-[100px] smd:h-full">
          <div className="rounded-xl shrink-0 relative 0 bg-no-repeat bg-cover  flex justify-center items-center overflow-hidden w-[120px] ">
            <Micon className={`text-[90px] ${data.highlighted ? 'text-[#96EA63] ' : 'text-white'} smd:text-[60px]  `} />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex  py-4  justify-between shrink-0 w-full smd:h-auto items-center smd:flex-col gap-5  ">
              <div className="flex items-center gap-2.5">
                {!data.isHidden && <div className=" rounded-full border w-[18px] h-[18px] flex items-center justify-center font-AlbertSans">1</div>}
                <div className="text-sm leading-tight text-left text-wrap ">{data.first.tit}</div>
              </div>
              {/* data.first.finished */}
              <Btn className={cn("w-[120px] smd:w-full mt-auto text-xs font-medium h-[30px] smd:h-12 smd:text-base  ", { ' !border-none !text-[#00E42A] !opacity-100': data.first.finished })} isDisabled={data.first.finished} onPress={data.first.finished ? undefined : data.first.onAction} isLoading={data.first.actionLoading}>
                {data.first.finished ? data.first.connectd : data.first.action}
              </Btn>

            </div>
            {data.secend && <div className="flex  gap-2.5 py-4 h-full justify-between shrink-0 w-full smd:h-auto items-center smd:flex-col smd:gap-5">
              <div className="flex items-center gap-2.5">
                <div className=" rounded-full border  flex w-[18px] h-[18px]  items-center justify-center font-AlbertSans">2</div>
                <div className="text-sm leading-tight text-center">
                  {data.secend.tit}
                </div>
              </div>

              <Btn className={cn("w-[120px] smd:w-full mt-auto text-xs font-medium h-[30px] smd:h-12 smd:text-base ", { ' !border-none text-[#00E42A] !opacity-100': data.secend.finished || !data.first.finished })} isDisabled={!data.first.finished || data.secend.finished} onPress={data.secend.onAction} isLoading={data.secend.actionLoading}>
                {data.secend.finished ? data.secend.connectd : data.secend.action}
              </Btn>
            </div>}
          </div>
        </div>

      </div>
    </div>
  );
}


const tipList = [
  {
    content: `Earn 4500 Jade for each ARO Pod you pre-order! Rewards will be automatically credited to your account and added to Jade in Lock section upon successful pre-order.`
  },
  { content: '' },


  {
    content: `Earn 1500 Jade after successfully running an ARO Client. Rewards will be credited within one day of success and added to Jade in Lock section. Running multiple clients won’t increase your rewards—one is enough!`
  },
  {
    content: `Earn 500 Jade after successfully running an ARO Lite extension. Rewards will be credited within one hour of success and added to Jade in Lock section. Running multiple extensions won’t increase your rewards—one is enough!`
  },

]

function AddJade({ add = 1, jade = 'Jade', index = 0 }: { add?: number, jade?: string, index: number }) {
  return <div className="flex text-xs smd:text-sm gap-1  pt-[5px] smd:pt-0">
    <div className="flex gap-2.5 items-center">
      <span className="text-primary text-[26px] font-semibold">+{add}</span>
      <span>{jade}</span>
      {index !== 1 && tipList[index]?.content &&
        <HelpTip className="max-w-[300px]" content={
          tipList[index]?.content
        } />
      }
    </div>

  </div>
}
type AroNodeItem = {
  icon: string,
  tit: string,
  description: string[]
  cost: string
  Rewards: string
  "User-friendly": string
  docs: string
  goToText: string
  isComming?: boolean,
  isDisable?: boolean,
  add: number,
  action: string,
  finish: boolean,
  foreach?: boolean,
  onAction?: () => void

}
function GetARONodeItem(data: AroNodeItem, highlighted: boolean, index: number) {
  // box-shadow: 0px 1px 4px 0px #00000033;
  // backdrop-filter: blur(10px)

  const disabled = (data.finish && !data.foreach) || data.action === 'Coming Soon...'
  return <div className="relative task-tab  shadow bg-white/5 smd:flex-col p-5 gap-5 items-center rounded-xl overflow-hidden flex">
    {data.finish && <FinishBadge className="[--finish-badge-size:26px]" />}
    <div className="flex gap-[30px] smd:flex-col smd:w-full smd:my-5">
      <div className="flex flex-col justify-between gap-5 ">
        <div className={cn(`rounded-lg bg-[#575757] w-[198px] smd:w-full smd:p-5 py-[23px] pl-[11px] `, {
          '!bg-[#FFFFFF1A]': highlighted
        })}>

          <Image src={data.icon} width={144} height={85} alt={data.tit} classNames={{ 'wrapper': 'mx-auto' }} />

        </div>
        <Btn className={cn("ml-auto w-full smd:w-full text-xs font-medium  h-[30px] smd:h-12", { ' !text-primary !bg-primary/10 !opacity-100': disabled })} onPress={data.onAction} disabled={disabled}>{data.finish && !data.foreach ? "Done" : data.action}</Btn>

      </div>

      <div className="flex flex-col gap-2">
        <div
          className="rounded-xl  flex  gap-10 smd:gap-[30px] flex-col  smd:flex-wrap h-full ">
          <div className="text-left flex flex-col justify-between smd:justify-start h-full smd:gap-5 bf  ">
            <div className="text-sm smd:text-base  font-semibold flex gap-2.5 flex-col">
              <div className="flex gap-2.5">
                <span className="text-lg smd:text-base">
                  {data.tit}
                </span>
                <HelpTip className="max-w-[300px]" content={
                  <div className=" flex flex-col justify-center">
                    {data?.description.map((item) => {
                      return <div key={`des_${item}`} >{item}</div>
                    })}
                  </div>

                } />
              </div>

              <div className="flex gap-2.5">
                <AddJade add={data.add} jade={'Jade'} index={index} />
              </div>

            </div>
            <div>

              <div className="text-sm">Cost: {data?.cost}</div>
              <div className="text-sm">Rewards: {data?.Rewards}</div>
              <div className="text-sm">User-friendly: {data && data!["User-friendly"]}</div>
            </div>
            <div className=" flex gap-5  smd:flex-col pb-1  ">
              <button onClick={() => window.open(data.docs)} className="text-[#568AFF] text-xs underline underline-offset-1 text-nowrap">User Guide</button>
            </div>

          </div>


        </div>

      </div>
    </div>
  </div>
}


function MyJadeRewards({ data, refetch }: { data: UserCampaignsRewards, refetch: () => void }) {

  const [chooseType, setChooseType] = useState<Record<string, string> | undefined>(undefined)

  const [showRedeem, toggleShowRedeem] = useToggle(false)
  const [redeemCode, setRedeemCode] = useState('')
  const { mutate: doRedeem, isPending: isPendingRedeem } = useMutation({
    mutationFn: async () => {
      await backendApi.redeemCampaignsByCode(redeemCode, chooseType?.type)
    },
    onSuccess: () => {
      toast.success("Redeem Successed!")
      refetch()
      setRedeemCode('')
      toggleShowRedeem(false)
      setChooseType(undefined)

    },
    // onSettled: () => toggleShowRedeem(false)
  })

  const ac = useAuthContext();
  const user = ac.queryUserInfo?.data;

  const copy = useCopy();
  const onPostX = () => {
    const refferralLink = `${origin}/signup?referral=${user?.inviteCode}`;

    postX({
      text: `Don’t Just Pay for the Internet. Get Paid for It!

Join the revolution with @AroNetwork.
Share your idle internet and earn rewards effortlessly.

👉 Start here: ${refferralLink}
#AROtoEarn` })
  };

  const redeemList = [
    {
      type: 'gift',
      icon: './giftCode.svg',
      title: 'Redeem Gift Code',
      text: `Enter your Gift Code below and click 'Confirm' to claim your bonus!
Note: You can redeem up to 3,000 Jades in Previewnet."`,
      width: '59',
      height: '52'
    },
    {
      type: 'order',
      icon: './orderCode.svg',
      title: 'Redeem Bonus for ordering ARO Pod',
      text: `Ordered an ARO Pod? Enter your Order Number to claim your exclusive bonus!`,
      width: '64',
      height: '47'
    },
  ]

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const exclusive = params.has('exclusive')
  const highlighted = (data?.bind.x && data?.bind.followX && data?.bind.tg && data?.bind.joinTg)
  const [showPerks, setShowPerks] = useState(false)
  const [code, setCode] = useState('')


  const onInputCode = async () => {
    const validValues = ['1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999'];
    if (!validValues.includes(code)) {
      toast.error('Invalid Code')
      return
    }
    await backendApi.claimOfflineReward(code)
    setShowPerks(false);
    setCode('')
    refetch()
  }


  return <ItemCard className="p-[60px]  smd:px-5 smd:py-10 xsm:py-10 gap-10 h-full flex flex-wrap justify-between ">
    <div className="flex gap-[3.125rem]  xsm:gap-10 smd:gap-10 h-[115px] smd:h-auto ">
      <SVGS.SvgJadeRewards className="text-[97px]" />
      <DupleInfo
        className="h-full justify-between"
        tit={<Title text="My Jade Rewards" tip={
          <div>
            Jade is your reward during Previewnet and Testnet.<br /> Earn Jade by completing tasks on this campaign page!

          </div>
        }
        />}
        subClassName="text-[62px] font-semibold text-white items-baseline leading-none smd:text-[40px]"
        titClassName=""
        sub={<>
          {formatNumber(Number(data.jadeRewards) ?? '0')}
          <div className="text-sm font-normal pl-2.5">Jades</div>
        </>} />
    </div>
    <DupleInfo
      className="justify-between  h-[115px] smd:w-full xsm:gap-10 smd:h-auto smd:gap-5"
      tit={<Title text="Jade in Lock" tip={
        <div>
          Specific tasks (running ARO Nodes or redeeming Gift Codes)<br /> grant “Jade in Lock”, holding higher rewards for Testnet. <br />Unlock them by mining in Testnet!
        </div>
      }
      />}
      subClassName="text-[36px] font-semibold text-white items-baseline leading-none smd:text-2xl"
      titClassName=""
      sub={<>
        {formatNumber(Number(data.lockedJadeRewards) ?? '0')}
        <div className="text-sm font-normal pl-2.5">Jades</div>
      </>} />
    <DupleSplit className="hidden smd:block smd:h-[1px] smd:w-full" />
    {/* <DupleInfo
      className="justify-between h-full smd:h-auto smd:gap-5"
      tit={<Title text="Redeem More Jade" />}
      subClassName="text-sm text-white/80 items-baseline "
      titClassName=""
      sub={<div className="text-[#FFFFFFCC]">
        Redeem Jade with your Gift Code.
      </div>} /> */}
    <DupleInfo
      className="justify-between h-[115px] xsm:gap-10 smd:h-auto smd:w-full smd:gap-5"
      tit={<Title text="Redeem More Jade" />}
      subClassName="text-sm text-white/80 items-baseline smd:w-full"
      titClassName="smd:w-full"
      sub={
        <div className="flex gap-5">
          <div className="w-full">
            <Btn className={`self-end  w-[106px] text-xs smd:h-12 font-medium  smd:w-full smd:text-base`} onPress={() => toggleShowRedeem(true)}>Redeem</Btn>
          </div>
          {exclusive &&
            <div className="flex items-center gap-2">
              <Btn
                isDisabled={!highlighted || data.offlineRewardClaimed}
                className="self-end w-[85px] smd:h-12 text-xs font-medium  smd:w-full smd:text-base"
                onPress={() => !data.offlineRewardClaimed ? setShowPerks(!showPerks) : undefined}>
                {!data.offlineRewardClaimed ? 'Perks' : 'Perked'}
              </Btn>
              <HelpTip className="max-w-[300px]" content='Perks are event-exclusive. Keep an eye on our event schedule!' />
            </div>}
        </div>

      } />
    {/* <DupleSplit className="h-full smd:h-[1px] smd:w-full xsm:hidden" /> */}


    <DupleInfo
      className="justify-between h-[115px] xsm:gap-10 smd:h-auto smd:gap-5 smd:w-full"
      tit={<Title text="My Referral Code" />}
      subClassName="text-sm text-white/80 items-baseline "
      titClassName=""
      sub={
        <div>
          <div className="flex items-center gap-4 h-full">
            <div className="uppercase text-4xl smd:text-[2rem] leading-8 font-bold">{user?.inviteCode}</div>
            <IconBtn className="bg-[#00E42A] hover:bg-[#5CF077]" tip="Copy Referral Link" onPress={() => copy(`${origin}/signup?referral=${user?.inviteCode}`)}>
              <FaLink />
            </IconBtn>
            <IconBtn className="bg-[#00E42A] hover:bg-[#5CF077]" tip="Tweet Your Referral" onPress={onPostX}>
              <FaXTwitter />
            </IconBtn>
          </div>
        </div>
      } />

    {/* <div className="flex flex-col gap-10 justify-between h-full  smd:hidden">
                  <div className="text-xl  smd:text-base leading-10 ">
                    My Referral Code
                  </div>
                
                </div> */}

    {
      <ForceModal isOpen={showPerks} className=" w-[440px]  smd:!mx-5">
        <div className="flex justify-between w-full flex-col gap-5">
          {/* <div className="flex justify-between w-full">
            <button onClick={() => {
              setShowPerks(false);
              setCode('')
            }}>
              <img src="./close.png" />
            </button>
          </div> */}
          <div className="flex flex-col gap-5 ">
            <InputSplitCode onChange={setCode} value={code} length={4} validChars="0-9" />
            <Btn isDisabled={code.length < 4} onPress={() => onInputCode()} className="w-full">Confirm</Btn>
            <Btn color='default' className="w-full  bg-default border  !border-white text-white hover:bg-l1" onPress={() => {
              setShowPerks(false);
              setCode('')
            }} >
              Cancel
            </Btn>

          </div>

        </div>

      </ForceModal>

    }
    <ForceModal isOpen={showRedeem} className=" !max-w-[540px] !w-full smd:!mx-5">
      <div className="flex justify-between w-full">
        <p className="self-stretch flex-grow-0 flex-shrink-0 font-semibold  text-base  text-white">Redeem Gift Code</p>
        <button onClick={() => {
          toggleShowRedeem(false);
          setRedeemCode('')
        }}>
          <img src="./close.png" />
        </button>
      </div>
      <p className="self-stretch flex-grow-0 flex-shrink-0  text-sm text-white/50">Enter your Gift Code below and click 'Confirm' to claim your bonus!<br />
        Note: You can redeem up to 3,000 Jades in Previewnet."</p>

      <InputRedeemCode setValue={setRedeemCode} value={redeemCode} />
      <div className="flex w-full gap-[.625rem] smd:gap-5 ">
        <Btn isDisabled={redeemCode.length !== 6} className="w-full smd:h-12" onPress={() => doRedeem()} isLoading={isPendingRedeem}>
          Confirm
        </Btn>
        {/* <Btn color='default' className="w-full  bg-default border smd:h-12 !border-white text-white hover:bg-l1" onPress={() => {
          toggleShowRedeem(false);
          setRedeemCode('')

        }}>
          Cancel
        </Btn> */}
      </div>
    </ForceModal>
  </ItemCard>
}


function SocialsTasks({ data, refetch, highlighted }: { data: UserCampaignsRewards, refetch: () => void, highlighted: boolean, isFirst?: boolean }) {
  const ac = useAuthContext()
  const user = ac.queryUserInfo?.data;


  const reportFinishTask = (t: Parameters<typeof backendApi.reportCampaignsSocails>[0]) => {
    retry(() => backendApi.reportCampaignsSocails(t), { delayMs: 10000, maxAttempts: 1 })
  }

  const onFollowX = () => {
    const to = 'AroNetwork'
    const origin = 'aro.network'
    const url = `https://x.com/intent/follow?original_referer=${origin}&ref_src=twsrc^tfw|twcamp^buttonembed|twterm^follow|twgr^${to}&screen_name=${to}`
    window.open(encodeURI(url))
    reportFinishTask('followX')
    refetch()
    ac.queryUserInfo?.refetch();

  }

  const onJoinTg = () => {
    const group = 'ARO_Network'
    const url = `https://t.me/${group}`
    window.open(encodeURI(url))
    refetch()
    ac.queryUserInfo?.refetch();


  }
  const activeJoin = !(data.bind.x && data.bind.followX && data.bind.tg && data.bind.joinTg)


  // const mutConnect = useMutation({
  //   mutationFn: async (type: 'x' | "telegram" | 'discord') => {
  //     const token = await backendApi.getAccessToken();
  //     const redirectUrl = encodeURIComponent(`${BASE_API}/user/auth/handler/${type}`);

  //     let url: string = "";
  //     switch (type) {
  //       case "x":
  //         url = `https://x.com/i/oauth2/authorize?response_type=code&client_id=b1JXclh6WXJoZnFfZjVoSVluZ0c6MTpjaQ&redirect_uri=${redirectUrl}&scope=users.read%20tweet.read&code_challenge=challenge&code_challenge_method=plain&state=${token}`;
  //         ac.queryUserInfo?.refetch();
  //         break;
  //       case "telegram":
  //         const result = await telegramAuth(envText('tgCode'), { windowFeatures: { popup: true, width: 600, height: 800 } });
  //         const res = await axios.get(`${BASE_API}/user/auth/handler/telegram`, { params: { ...result, state: token }, });

  //         if (typeof res.request?.responseURL === 'string') {
  //           const err = new URL(res.request?.responseURL).searchParams.get("err");
  //           handlerErrForBind(err);
  //         }
  //         ac.queryUserInfo?.refetch();
  //         //todo refresh campains data
  //         return;
  //     }
  //     window.open(url, "_blank");

  //   }
  // })

  const mutConnectX = useMutation({
    mutationFn: async () => {
      const token = await backendApi.getAccessToken();
      const redirectUrl = encodeURIComponent(`${BASE_API}/user/auth/handler/x`);
      const url = `https://x.com/i/oauth2/authorize?response_type=code&client_id=${envText('xCode')}&redirect_uri=${redirectUrl}&scope=users.read%20tweet.read&code_challenge=challenge&code_challenge_method=plain&state=${token}`;
      ac.queryUserInfo?.refetch();
      refetch()
      window.open(url, "_blank");
    }
  });

  const mutConnectTelegram = useMutation({
    mutationFn: async () => {
      const token = await backendApi.getAccessToken();
      const result = await telegramAuth(envText('tgCode'), { windowFeatures: { popup: true, width: 600, height: 800 } });
      await Api.get(`${BASE_API}/user/auth/handler/telegram`, { params: { ...result, state: token }, });
      ac.queryUserInfo?.refetch();
      refetch()
    }
  });

  const [isOpen, setIsOpen] = useState(highlighted);

  useEffect(() => {
    setIsOpen(highlighted);
  }, [highlighted]);







  return <div className="h-full">

    <ItemCard disableAnim className={cn("flex flex-col 0 smd:h-min smd:gap-10 ",)} active={highlighted}>
      <div className="flex justify-between w-full cursor-pointer  items-center" onClick={() => !highlighted ? setIsOpen(!isOpen) : undefined}>
        <Title needIcon={true} text="Join ARO Community" />
        {!highlighted &&
          <div className="flex items-center gap-5">

            <ArrowIcon isOpen={isOpen} />
          </div>
        }
      </div>
      {/* <div className="flex justify-between  xs:px-10 xs:gap-10 smd:gap-[3.75rem] pt-[50px] pb-[60px] flex-wrap smd:flex-col px-[60px]"> */}
      {isOpen && <div className=" grid grid-cols-1 gap-[38px] xl:grid-cols-2  w-full  xs:px-10  smd:py-5 smd:gap-5  pt-[80px] pb-[60px] px-[60px] smd:px-0" >
        <SocialTaskItem data={{
          icon: FaXTwitter,
          highlighted: highlighted,
          jade: data.jadePoint.followX,
          title: `Follow Twitter/X`,
          first: { tit: 'Connect X Account', action: 'Connect', connectd: 'Connected', finished: data.bind.x, actionLoading: mutConnectX.isPending, onAction: () => mutConnectX.mutate(), userName: user?.social.x?.username ? '@' + user.social.x?.username : undefined },
          secend: { tit: 'Follow ARO on X', action: 'Follow', connectd: 'Completed', finished: data.bind.followX, onAction: onFollowX }
        }} />
        <SocialTaskItem data={{
          highlighted: highlighted,
          icon: FaTelegramPlane,
          jade: data.jadePoint.joinTG,
          title: `Join Telegram`,
          first: { tit: 'Connect Telegram ', action: 'Connect', connectd: 'Connected', finished: data.bind.tg, actionLoading: mutConnectTelegram.isPending, onAction: () => mutConnectTelegram.mutate(), userName: user?.social.tg?.username ? '@' + user.social.tg?.username : undefined },
          secend: { tit: 'Join Telegram', action: 'Join', connectd: 'Completed', finished: data.bind.joinTg, onAction: onJoinTg, }
        }} />
      </div>}
    </ItemCard>



  </div>
}

function GetNodes({ data, highlighted }: { data: UserCampaignsRewards, highlighted: boolean, isFirst?: boolean }) {
  // const activeJoin = !(data.aroNode.pod && data.aroNode.link && data.aroNode.client && data.aroNode.liteNode)
  const r = useRouter()
  const [isOpen, setIsOpen] = useState(highlighted)
  useEffect(() => {
    setIsOpen(highlighted);
  }, [highlighted]);


  const runNode = [
    {
      icon: "aro-pod.png",
      tit: "Order an ARO Pod",
      description: [
        `• A plug-and-play device that runs 24/7 with low energy use.`,
        `• Best for household runners.`,
      ],
      cost: "$",
      Rewards: "⭐️⭐️⭐️",
      "User-friendly": "⭐️⭐️⭐️",
      docs: "https://docs.aro.network/user-guides/device-setup",
      goToText: "Order ARO Pod",
      isComming: false,
      isDisable: true,
      add: data.jadePoint.orderPod,
      foreach: true,
      action: 'Order ARO Pod',
      finish: data.aroNode.pod,
      onAction: () => { window.open('https://shop.aro.network/?coupon=gmvn25') }
    },
    {
      icon: "aro-link.png",

      tit: "ARO Link",
      description: [
        `• A Wi-Fi router with a built-in ARO node.`,
        `• Ideal for business use.`,
      ],
      cost: "$$",
      Rewards: "⭐️⭐️⭐️",
      "User-friendly": "⭐️⭐️⭐️",
      docs: "https://docs.aro.network/user-guides/device-setup",
      // goToText: "Order ARO Link",
      goToText: "Coming soon...",
      isComming: true,
      add: data.jadePoint.orderLink, foreach: true, action: 'Coming Soon...', finish: data.aroNode.link, onAction: () => { }
    },

    {
      icon: "aro-client.png",

      tit: "Run an ARO Client",
      description: [
        `• A software image for your server or PC.`,
        `• Perfect for pro users with strong internet.`,
      ],
      cost: "Your device",
      Rewards: "Flexible",
      "User-friendly": "⭐️",
      docs: " https://docs.aro.network/user-guides/software-setup",
      goToText: "Add an ARO Client",
      add: data.jadePoint.x86, action: 'Add ARO Client', finish: data.aroNode.client, onAction: () => r.push(`?mode=${currentENVName}&tab=nodes&type=add&chooseType=client`)
    },
    {
      icon: "aro-lite.png",
      tit: "Run an ARO Lite",
      description: [
        `• A lightweight browser extension.`,
        `• Runs with zero cost and minimal effort.`,
      ],
      cost: "0",
      Rewards: "⭐️",
      "User-friendly": "⭐️⭐️⭐️",
      docs: "https://docs.aro.network/user-guides/aro-lite/",
      goToText: "Add an ARO Lite",
      add: data.jadePoint.liteNode, action: 'Add ARO Lite', finish: data.aroNode.liteNode, onAction: () => r.push(`?mode=${currentENVName}&tab=nodes&type=add&chooseType=lite`)
    },
  ];


  return <ItemCard disableAnim className={cn("flex flex-col order-1 smd:gap-10",)} active={highlighted}>
    <div className="flex justify-between w-full cursor-pointer" onClick={() => !highlighted ? setIsOpen(!isOpen) : undefined}>
      <Title needIcon={true} text="Run an ARO Node" />
      {!highlighted &&
        <ArrowIcon isOpen={isOpen} />
      }
    </div>

    {isOpen && <Fragment>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px] pt-[80px] pb-[20px] smd:pt-5 smd:pb-0   px-[60px] smd:px-0  xs:px-10">
        {runNode.map((item, index) => {
          return <Fragment key={`node_${index}`}>{GetARONodeItem(item, highlighted, index)}</Fragment>
        })}
      </div>
      <div className="px-[60px] smd:px-0  xs:px-10 ml-auto smd:mx-auto  mb-[20px]">
        <a className="text-[#FFFFFF80] hover:text-primary underline underline-offset-1 text-sm" target="_blank" href='https://docs.aro.network/user-guides/run-node'> Which node type suits me best?</a>
      </div>

    </Fragment>
    }
  </ItemCard>
}

function SocialActivites({ data, refetch, highlighted }: { data: UserCampaignsRewards, refetch: () => void, highlighted: boolean, isFirst?: boolean }) {
  const ac = useAuthContext()

  const onJoinDiscord = () => {
    const code = 'Rc4BMUjbNB'
    const url = `https://discord.com/invite/${code}`
    window.open(encodeURI(url))
    refetch()
  }

  const reportFinishTask = (t: Parameters<typeof backendApi.reportCampaignsSocails>[0]) => {
    retry(() => backendApi.reportCampaignsSocails(t), { delayMs: 10000, maxAttempts: 1 })
  }

  const onPostX = () => {
    const refferralLink = `${origin}/signup?referral=${envText('inviteCode')}`;


    postX({
      text: `
🚀 Join the @AroNetwork Previewnet Referral Sprint!
Invite friends, earn Jade points, and compete for your share of $30,000+ in rewards!
🏆 Top referrer wins $10,000 + exclusive perks!
Start now 👉 ${refferralLink}
#DePIN #AROtoEarn`
    })
    reportFinishTask('postX')

    refetch()
  }

  const mutConnect = useMutation({
    mutationFn: async (type: 'x' | "telegram" | 'discord') => {
      const token = await backendApi.getAccessToken();
      const redirectUrl = encodeURIComponent(`${BASE_API}/user/auth/handler/${type}`);

      let url: string = "";
      if (type == 'discord') {
        url = `https://discord.com/oauth2/authorize?client_id=1303958338488238090&response_type=code&redirect_uri=${redirectUrl}&scope=identify+email&state=${token}`;
        ac.queryUserInfo?.refetch();
      }
      window.open(url, "_blank");
    }
  })


  const [isOpen, setIsOpen] = useState(highlighted)

  useEffect(() => {
    setIsOpen(highlighted);
  }, [highlighted]);

  const { open, close } = useAppKit()
  const { address, isConnected, } = useAppKitAccount()


  const lastBoundAddress = useRef<string | undefined>(undefined);

  const bind = async () => {
    await backendApi.userBindAdress(address);
    lastBoundAddress.current = address;
    refetch()


  };

  useEffect(() => {
    if (isConnected && address && lastBoundAddress.current !== address) {
      bind();
    }
  }, [isConnected, address]);

  const onBindWallet = () => {
    if (!isConnected) {
      open();
    }
  };







  return <ItemCard disableAnim className={cn("flex flex-col ",)} active={highlighted}>

    <div className="flex justify-between w-full cursor-pointer items-center" onClick={() => setIsOpen(!isOpen)}>
      <Title needIcon={true} text="Engage in the Community" />
      {!highlighted &&
        <ArrowIcon isOpen={isOpen} />
      }
    </div>
    {/* <div className="flex justify-between  smd:gap-[60px]  xs:px-10 xs:gap-10 pt-[50px] pb-[60px] flex-wrap smd:flex-col  px-[60px] "> */}
    {/* <div className="flex justify-between w-full  xs:px-10 xs:gap-10 smd:gap-[3.75rem] pt-[50px] pb-[60px] flex-wrap smd:flex-col px-[60px]"> */}
    {isOpen && <div className=" grid grid-cols-1 xl:grid-cols-2 gap-[38px] w-full  xs:gap-10  smd:pt-[50px] smd:pb-5 pt-20 pb-[60px] px-[60px] smd:px-0  xs:px-10" >

      <SocialTaskItem data={{
        highlighted: highlighted,
        icon: FaDiscord,
        jade: data.jadePoint.joinDiscord,
        title: `Join Discord`,
        first: { tit: 'Connect Discord', action: 'Connect', connectd: 'Connected', finished: data.bind.discord, actionLoading: mutConnect.isPending, onAction: () => mutConnect.mutate('discord') },
        secend: { tit: 'Join Discord', action: 'Join', connectd: 'Completed', finished: data.bind.joinDiscord, onAction: onJoinDiscord, }
      }} />
      <SocialTaskItem data={{
        highlighted: highlighted,
        isHidden: true,
        icon: TbClipboardText,
        jade: data.jadePoint.sendTweet,
        title: ` Post on Twitter/X`,
        first: { tit: 'Share on X', action: 'Post', connectd: 'Completed', finished: data.bind.postX, onAction: onPostX, addJade: data.jadePoint.sendTweet },

      }} />
      <SocialTaskItem data={{
        highlighted: highlighted,
        isHidden: true,
        icon: TbClipboardText,
        jade: data.jadePoint.sendTweet,
        // Bind Ethereum address  +100 Jade
        title: `Bind Ethereum address`,
        first: { tit: 'Bind your Ethereum wallet and verify your address.', action: 'Bind', connectd: 'Completed', finished: data.bind.bindEth, onAction: onBindWallet, addJade: data.jadePoint.bindEth },

      }} />
    </div>}
  </ItemCard>
}

function InviteFriends({ data }: { data: UserCampaignsRewards }) {
  const ac = useAuthContext();
  const user = ac.queryUserInfo?.data;

  const copy = useCopy();
  const onPostX = () => {
    const refferralLink = `${origin}/signup?referral=${user?.inviteCode}`;

    postX({
      text: `Don’t Just Pay for the Internet. Get Paid for It!

Join the revolution with @AroNetwork.
Share your idle internet and earn rewards effortlessly.

👉 Start here: ${refferralLink}
#AROtoEarn` })
  };

  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobileDetect()


  const r = useRouter()
  const [showWorks, toggleShowWorks] = useToggle(false)
  const renderReferred = (value: string, name: string) => (
    <div className="flex gap-1 ">
      <span className="text-primary">{formatNumber(Number(value))} </span>
      <span className={'text-[#FFFFFFB2]'}>{name}</span>
    </div>)

  return <ItemCard className="flex flex-col gap-5 order-1 smd:h-auto !h-full">
    <div className="flex justify-between w-full cursor-pointer  items-center" onClick={() => {
      setIsOpen(!isOpen)
      toggleShowWorks(false)
    }}>
      <Title needIcon={true} text=" Invite Your Friends" />
      <ArrowIcon isOpen={isOpen} />
    </div>



    {isOpen &&
      <>
        <IconCard
          className="col-span-full h-auto  flex-wrap flex-row gap-0 smd:flex-col smd:p-5 smd:mb-5 mx-[60px] smd:mx-0 smd:mt-10 mt-[60px]  task-tab "
          icon={SVGS.SvgReferral}
          iconSize={20}
          contentClassname="smd:!basis-full md:h-min"
          titClassName={'md:!items-baseline md:!h-full md:!w-full   '}
          leftTopIconClassName="!top-[-7px]"
          tit={
            <Fragment>
              <div className="flex  w-full md:h-auto px-5 justify-between gap-5 flex-wrap smd:flex-col smd:justify-start smd:mt-[60px]  h-auto smd:hidden ">
                <div className="flex flex-col gap-10 justify-between h-full  smd:hidden">
                  <div className="text-xl  smd:text-base leading-10 ">
                    My Referral Code
                  </div>
                  <div className="flex items-center gap-4 h-full">
                    <div className="uppercase text-4xl smd:text-[2rem] leading-8 font-bold">{user?.inviteCode}</div>
                    <IconBtn className="bg-[#00E42A] hover:bg-[#5CF077]" tip="Copy Referral Link" onPress={() => copy(`${origin}/signup?referral=${user?.inviteCode}`)}>
                      <FaLink />
                    </IconBtn>
                    <IconBtn className="bg-[#00E42A] hover:bg-[#5CF077]" tip="Tweet Your Referral" onPress={onPostX}>
                      <FaXTwitter />
                    </IconBtn>
                  </div>
                </div>
                {/* border: 1px solid #5E5E5E */}
                {/* <DupleSplit className="h-20 smd:w-full smd:h-[1px] mx-auto" /> */}

                <div className="flex flex-col gap-5 justify-between smd:justify-start pr-4 smd:pl-0 h-full smd:mt-[30px] items-start">
                  <div className="text-xl leading-10 smd:text-base 0">
                    My Referral Bonus
                  </div>
                  <div className="flex justify-between gap-10 smd:gap-6 smd:flex-col flex-wrap h-[100%]">
                    <div className="flex flex-col gap-2 font-medium text-white  smd:w-full smd:mb-2.5">
                      <div className="text-sm">Get referred</div>
                      <div className="font-normal text-xs"><span className="text-primary">+{data.jadePoint.invite}</span> Jade</div>
                      <div className={`text-xs smd:text-base  leading-normal smd:mt-6 text-center py-[3px] w-[120px] smd:w-[145px] rounded-full ${user?.invited ? 'bg-[#00E42A1A]' : 'bg-[#02B421] cursor-pointer'}  `}
                        onClick={() => user?.invited ? undefined : r.push(`/?mode=${currentENVName}&tab=aroId`)}>
                        {user?.invited ? <div className="text-[#00E42A] flex items-center gap-2 justify-center">
                          Referrered
                          <FiCheck className="text-[#00E42A]" />
                        </div> : 'Add My Referrer'}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 smd:gap-6 font-medium text-white justify-between ">
                      <div className="text-sm">Refer friends</div>
                      <div className="text-xs ">
                        <div className="flex items-center  smd:items-start smd:flex-col ">
                          <div className=" smd:w-full">My Tier 1 Referral:</div>
                          <div className="flex   text-wrap ">
                            {"\u00A0"}{renderReferred(`${data.referralTier1.count ?? 0}`, 'friends referred')},{"\u00A0"}
                            {renderReferred((data.referralTier1.jadeRewards ?? 0) + (data.referralTier1.lockedJadeRewards ?? 0), 'Jades earned.')}{"\u00A0"}
                          </div>
                        </div>
                        <div className="flex items-center   smd:items-start smd:flex-col smd:mt-4 mt-2 ">
                          <div className="smd:w-full">My Tier 2 Referral:</div>
                          <div className="flex text-wrap  ">
                            {"\u00A0"}{renderReferred(`${data.referralTier2.count ?? 0}`, 'friends referred')},{"\u00A0"}
                            {renderReferred((data.referralTier2.jadeRewards ?? 0) + (data.referralTier2.lockedJadeRewards ?? 0), 'Jades earned.')}{"\u00A0"}

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex flex-col gap-5 smd:gap-7 justify-between h-full  md:hidden smd:pt-2.5">
                <div className="text-xl leading-10  smd:text-base">
                  My Referral Code
                </div>
                <div className="flex items-center gap-4 h-full flex-wrap">
                  <div className="uppercase text-4xl smd:text-[2rem] leading-8 font-bold">{user?.inviteCode}</div>
                  <div className="smd:w-full smd:flex smd:gap-5">
                    <IconBtn className="bg-[#00E42A] hover:bg-[#5CF077]" tip="Copy Referral Link" onPress={() => copy(`${origin}/signup?referral=${user?.inviteCode}`)}>
                      <FaLink />
                    </IconBtn>
                    <IconBtn className="bg-[#00E42A] hover:bg-[#5CF077]" tip="Tweet Your Referral" onPress={onPostX}>
                      <FaXTwitter />
                    </IconBtn>
                  </div>
                </div>
              </div>
            </Fragment>
          }
          content={<div className="flex  w-full md:h-full justify-between gap-5 flex-wrap smd:flex-col md:hidden smd:justify-start smd:mt-[60px]">

            {/* border: 1px solid #5E5E5E */}
            {/* <DupleSplit className="h-20 smd:w-full smd:h-[1px] mx-auto" /> */}

            <div className="flex flex-col gap-5 justify-between smd:justify-start pr-7 smd:pl-0 h-full smd:mt-[30px] items-start">
              <div className="text-xl leading-10 smd:text-base ">
                My Referral Bonus
              </div>
              <div className="flex justify-between gap-8 smd:gap-6 smd:flex-col flex-wrap">
                <div className="flex flex-col gap-2 font-medium text-white  smd:w-full">
                  <div className="text-sm">Get referred</div>
                  <div className="font-normal text-xs"><span className="text-primary">+{data.jadePoint.invite}</span> Jade</div>
                  {/* <div className="text-xs smd:text-base  leading-normal smd:mt-6 text-center py-[3px] w-[112px] smd:w-[145px] rounded-full bg-[#02B421] cursor-pointer" onClick={() => r.push(`/?mode=${currentENVName}&tab=aroId`)}>Add My Referrer</div> */}
                  <div className={`text-xs smd:text-base  leading-normal smd:mt-6 text-center py-[3px] w-[112px] smd:w-[145px] rounded-full ${user?.invited ? 'bg-[#00E42A1A]' : 'bg-[#02B421] cursor-pointer'}  `}
                    onClick={() => user?.invited ? undefined : r.push(`/?mode=${currentENVName}&tab=aroId`)}>
                    {user?.invited ? <div className="text-[#00E42A] flex items-center gap-2 justify-center">
                      Referrered
                      <FiCheck className="text-[#00E42A]" />
                    </div> : 'Add My Referrer'}
                  </div>
                </div>
                <div className="flex flex-col gap-2 smd:gap-6 font-medium text-white justify-between ">
                  <div className="text-sm">Refer friends</div>
                  <div className="text-xs ">
                    <div className="flex items-center justify-between  smd:items-start smd:flex-col ">
                      <div className=" smd:w-full">My Tier 1 Referral:</div>
                      <div className="flex flex-wrap  ">
                        {"\u00A0"}{renderReferred(`${data.referralTier1.count ?? 0}`, 'friends referred')},{"\u00A0"}
                        {renderReferred((data.referralTier1.jadeRewards ?? 0) + (data.referralTier1.lockedJadeRewards ?? 0), 'Jades earned.')}{"\u00A0"}
                      </div>

                    </div>
                    <div className="flex items-center justify-between  smd:items-start smd:flex-col smd:mt-4 mt-2 ">

                      <div className="smd:w-full">My Tier 2 Referral:</div>
                      <div className="flex text-wrap  flex-wrap">
                        {"\u00A0"}{renderReferred(`${data.referralTier2.count ?? 0}`, 'friends referred')},{"\u00A0"}
                        {renderReferred((data.referralTier2.jadeRewards ?? 0) + (data.referralTier2.lockedJadeRewards ?? 0), 'Jades earned.')}{"\u00A0"}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>}
        />

        {!showWorks && <div className={cn("rounded-xl bg-white/5 flex items-center gap-2 justify-center cursor-pointer text-start select-none shadow mx-[60px] mb-[60px] smd:mx-0 task-tab py-6")} onClick={() => toggleShowWorks(true)}>
          <span>How Referral Program Works?</span>
          <ArrowIcon isOpen={showWorks} width={'16'} height={'16'} />
        </div>}
      </>
    }

    {
      showWorks &&
      <IconCard
        className="col-span-full md:max-h-[300px] smd:mb-5 smd:h-auto flex-row gap-0 smd:flex-col mb-[50px] mx-[60px] smd:mx-0 task-tab"
        icon={() => <IoAlertCircle />}
        iconSize={28}
        leftTopIconClassName="!top-[-5px]"
        titClassName="smd:justify-between  pl-[5px]"
        tit={
          isMobile ? <div className=" md:hidden flex justify-between">
            <button onClick={() => toggleShowWorks(false)} className="" >
              <ArrowIcon isOpen={showWorks} />
            </button>
          </div>
            : null

        }
        contentClassname="smd:!basis-full smd:h-full"

        content={<div className="flex  smd:items-start w-full h-full flex-wrap smd:pt-2.5  justify-between gap-5 smd:flex-col smd:h-auto smd:mb-[50px] px-5">

          <div className=" md:w-full flex justify-between cursor-pointer " onClick={() => toggleShowWorks(false)}>

            <div className="text-xl  smd:text-base leading-10  smd:self-start ">
              How Referral Program Works?
            </div>
            <button onClick={() => toggleShowWorks(false)} className="smd:hidden"  >
              <ArrowIcon isOpen={showWorks} />
            </button>
          </div>
          <div className="md:hidden">
            <Image src="./referralWorks-mo.svg" width={204} height={630} />
          </div>
          <div className="smd:hidden">
            <Image src="./referralWorks.svg" width={728} height={123} />
          </div>
          {/* <div className="smd:hidden">
            <button onClick={() => toggleShowWorks(false)} >
              <ArrowIcon isOpen={showWorks} />
            </button>
          </div> */}

        </div>}
      />
    }
  </ItemCard>
}

function ExploreMore() {
  const [isOpen, setIsOpen] = useState(false)

  const exploreMoreList = [
    { mainContent: <Image src="/galxe.svg" alt="galxe" width={102} height={20} />, link: 'https://app.galxe.com/quest/LjE8do44dMenaZmEjyLoA8?sort=Trending', text: 'ARO Network on Galxe ' },
    { mainContent: <span className="font-semibold text-xl text-[#FFFFFFB2]" >You are Early！</span>, link: 'https://enreach.fillout.com/Pioneers', text: 'Join Pioneer Program ' },

  ]

  return <ItemCard className="flex flex-col gap-5 order-1">
    <div className="flex justify-between w-full cursor-pointer  items-center " onClick={() => setIsOpen(!isOpen)}>
      <Title needIcon={true} text="Explore More" />
      <ArrowIcon isOpen={isOpen} />
    </div>

    {isOpen && <div className="flex gap-[30px] smd:flex-col smd:gap-10 mx-[60px] smd:mx-0 py-[60px] smd:py-10 ">
      {exploreMoreList.map((item) => {
        return <div key={`explore_${item.text}`} className="flex gap-5 smd:justify-center ">
          <div className="flex flex-col gap-5 items-center ">
            <div className="flex justify-center items-center w-[200px] h-[60px] smd:w-[240px] smd:h-[80px] task-tab ">
              {item.mainContent}
            </div>
            <a href={item.link} target="_blank" className="flex gap-2 items-center text-primary text-sm smd:text-base">{item.text}<FiArrowUpRight className="text-[1.375em]" /></a>
          </div>
        </div>
      })}
    </div>
    }

  </ItemCard>
}

export default function AMyReferral() {
  useEffect(() => {
    if (DEF_ANIMITEM) {
      Aos.init({
        disable: false,
        startEvent: "DOMContentLoaded",
        initClassName: "aos-init",
        animatedClassName: "aos-animate",
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 120,
        delay: 0,
        duration: 400,
        easing: "ease",
        once: false,
        mirror: false,
        anchorPlacement: "top-top",
      });
    }
  }, []);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getUserCampaignsRewards'],
    queryFn: () => backendApi.getCampaignsRewards().catch(() => ({
      jadeRewards: "0",
      lockedJadeRewards: "0",
      referredRewards: "0",
      bind: { x: false, followX: false, postX: false, tg: false, joinTg: false, discord: false, joinDiscord: false },
      aroNode: { client: false, link: false, liteNode: false, pod: false },
      referralTier1: {
        count: 0,
        jadeRewards: "0",
        lockedJadeRewards: "0",
      },
      referralTier2: {
        count: 0,
        jadeRewards: '0',
        lockedJadeRewards: '0',
      },
      jadePoint: {
        "followX": 200,
        "joinTG": 100,
        "joinDiscord": 100,
        "sendTweet": 100,
        "invite": 200,
        "x86": 1500,
        "liteNode": 500,
        "orderPod": 4500,
        "orderLink": 4500
      }

    }) as UserCampaignsRewards),
    retry: true,
    refetchInterval: 60000,
    retryDelay: (fcount) => fcount > 3 ? Math.min(fcount * 1000, 60000) : 1000,
  })


  const taskComponents = [
    {
      key: ' Join ARO Community',
      completed: (data?.bind.x && data?.bind.followX && data?.bind.tg && data?.bind.joinTg),
      render: (highlighted: boolean, isFirst?: boolean) => (

        <SocialsTasks data={data!} refetch={() => refetch()} highlighted={highlighted} isFirst={isFirst} />

      )
    },
    {
      key: ' Run an ARO Node',
      completed: (data?.aroNode.pod && data?.aroNode.link && data?.aroNode.client && data?.aroNode.liteNode),
      render: (highlighted: boolean, isFirst?: boolean) => (
        <GetNodes data={data!} highlighted={highlighted} isFirst={isFirst} />
      )

    },
    {
      key: ' Engage in the Commmunity',
      completed: (data?.bind.postX && data?.bind.discord && data?.bind.joinDiscord),
      render: (highlighted: boolean, isFirst?: boolean) => (
        <SocialActivites data={data!} refetch={() => refetch()} highlighted={highlighted} isFirst={isFirst} />
      )
    },
  ];

  const firstUnfinishedIndex = taskComponents.findIndex(t => !t.completed);
  const firstUnfinishedTask = firstUnfinishedIndex !== -1 ? taskComponents[firstUnfinishedIndex] : null;

  const otherUnfinished = taskComponents
    .filter((t, idx) => !t.completed && idx !== firstUnfinishedIndex);

  const completed = taskComponents.filter(t => t.completed);

  const orderedComponents = [
    ...(firstUnfinishedTask ? [firstUnfinishedTask] : []),
    ...otherUnfinished,
    ...completed,
  ];





  return (
    <div className="w-full flex flex-col gap-5 pb-32 smd:pb-20">
      {isLoading &&
        <>
          <Skeleton className="rounded-xl w-full"><div className="h-[12.5rem]  rounded-3xl" /></Skeleton>
          <Skeleton className="rounded-xl w-full"><div className="h-[12.5rem]  rounded-3xl" /></Skeleton>
          <Skeleton className="rounded-xl w-full"><div className="h-[12.5rem]  rounded-3xl" /></Skeleton>
          <Skeleton className="rounded-xl w-full"><div className="h-[12.5rem]  rounded-3xl" /></Skeleton>
          <Skeleton className="rounded-xl w-full"><div className="h-[12.5rem]  rounded-3xl" /></Skeleton>
          <Skeleton className="rounded-xl w-full"><div className="h-[12.5rem]  rounded-3xl" /></Skeleton>
        </>
      }
      <div>
        Campaign - ARO Previewnet
      </div>
      {
        Boolean(data) && <>
          <MyJadeRewards data={data!} refetch={() => refetch()} />
          {orderedComponents.map((task, idx) => (
            <div
              key={task.key}
              style={idx === 0 && !task.completed ? {
                borderRadius: '12px',
                backgroundClip: 'padding-box, padding-box, border-box',
                backgroundOrigin: 'padding-box, padding-box, border-box',
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(111.63deg, #186224 -132.02%, rgba(115, 115, 115, 0) -71.94%),linear-gradient(to right, #000, #000),linear-gradient(114.04deg, #1FFF2A 8.43%, #192626 48.22%, #1FFF2A 98.57%)'
              } : undefined}
            >
              {task.render(idx === 0 && !task.completed)}
            </div>
          ))}

          {/* {sorted.map((item) => (
            <Fragment key={item.name}>{item.component}</Fragment>
          ))} */}
          <InviteFriends data={data!} />
          <ExploreMore />
        </>
      }
    </div>
  );
}
