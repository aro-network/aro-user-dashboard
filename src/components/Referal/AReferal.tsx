import { useAuthContext } from "@/app/context/AuthContext";
import { useCopy } from "@/hooks/useCopy";
import { handlerErrForBind } from "@/hooks/useShowParamsError";
import backendApi, { BASE_API } from "@/lib/api";
import { retry } from "@/lib/async";
import { envText, handlerError } from "@/lib/utils";
import { postX } from "@/lib/x";
import { SVGS } from "@/svg";
import { UserCampaignsRewards } from "@/types/user";
import { cn, Skeleton } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { telegramAuth } from "@use-telegram-auth/hook";
import Aos from 'aos';
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, Fragment, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { FaLink, FaXTwitter } from "react-icons/fa6";
import { FiCheck, FiArrowUpRight } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoAlertCircle } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdPlayArrow } from "react-icons/md";
import { useToggle } from "react-use";
import { toast } from "sonner";
import { currentENVName } from "../ADashboard";
import { Btn, IconBtn } from "../btns";
import { IconCard } from "../cards";
import { ForceModal } from "../dialogs";
import { DupleInfo, DupleSplit } from "../EdgeNode/AOverview";
import { fmtBerry } from "../fmtData";
import { InputRedeemCode } from "../inputs";
import { HelpTip } from "../tips";
import Link from "next/link";


const DEF_ANIMITEM = false
function ItemCard({ className, active, children, disableAnim = !DEF_ANIMITEM }: { className?: string, active?: boolean, disableAnim?: boolean } & PropsWithChildren) {
  const animProps = disableAnim ? {} : {
    'data-aos': "fade-up",
    'data-aos-duration': "1000"
  }
  return <div {...animProps} className={cn("bg-l1 shadow-1 rounded-xl bg-no-repeat bg-cover bg-center p-5 ", { "bg-online [--tw-shadow-color:#089121]": active, 'commonTab': !active }, className)}>
    {children}
  </div>
}

function Title({ text, tip }: { text?: string, tip?: string }) {
  return <div className="text-xl flex gap-2 items-center font-Alexandria smd:text-base">{text}{Boolean(tip) && <HelpTip content={tip} />}</div>
}


function FinishBadge({ className }: { className?: string }) {
  return <div
    className={cn("flex justify-end absolute top-0 right-0 bg-[#FFCA1A] rounded-bl-full pt-[calc(var(--finish-badge-size)*0.1538)] pr-[calc(var(--finish-badge-size)*0.1282)] [--finish-badge-size:39px] w-[var(--finish-badge-size)] h-[var(--finish-badge-size)] text-[calc(var(--finish-badge-size)*21/39)] ", className)}>
    <FiCheck className="text-white" />
  </div>
}

type StepData = { finished: boolean, tit: string, action: string, addJade?: number, actionLoading?: boolean, onAction: () => void, userName?: string, connectd?: string }
function SocialTaskItem({ data, className }: { data: { icon: IconType | FC, first: StepData, secend?: StepData }, className?: string, }) {
  const Micon = data.icon
  const ac = useAuthContext();
  const finished = data.first.finished && (!data.secend || data.secend.finished)



  console.log('finishedfinishedfinishedfinished', data);

  return (
    <div className={cn(" flex items-center gap-5 smd:flex-col", className)}>
      <div className="rounded-xl shrink-0 relative bg-no-repeat bg-cover  bg-[url(/connectBg.svg)] flex justify-center items-center overflow-hidden w-[120px] h-[120px] smd:w-[100px] smd:h-[100px]">
        <Micon className="text-[40px] smd:text-[43px] text-[#96EA63] h-[120px]" />
        {finished && <FinishBadge className="[--finish-badge-size:26px] smd:[--finish-badge-size:32px]" />}
      </div>
      <div className="flex flex-col  py-4 h-full justify-center shrink-0 w-[130px] smd:h-auto items-center">
        <div className=" rounded-full border w-7 h-7 flex items-center justify-center font-AlbertSans">1</div>
        <div className="text-sm leading-tight text-center mt-2.5">{data.first.tit}<br />{!data.secend && <><span className="text-primary">+{data.first.addJade ?? 200}</span> Jade</>}</div>
        {/* data.first.finished */}
        <div className="text-sm smd:mt-2.5">{data.first.userName}</div>
        <Btn className={cn("w-full mt-auto text-xs font-medium h-[30px] smd:h-12 smd:text-base smd:mt-2.5", { ' !border-none': data.first.finished })} isDisabled={data.first.finished} onPress={data.first.finished ? undefined : data.first.onAction} isLoading={data.first.actionLoading}>
          {data.first.finished ? data.first.connectd : data.first.action}
        </Btn>

      </div>
      {data.secend && <div className="flex flex-col gap-2.5 py-4 h-full justify-center shrink-0 w-[130px] smd:h-auto items-center">
        <div className=" rounded-full border w-7 h-7 flex items-center justify-center font-AlbertSans">2</div>
        <span className="text-sm leading-tight text-center">
          {data.secend.tit}
          <br />
          <div className="smd:mt-2.5">
            <span className="text-primary smd:mt-2.5">+{data.secend.addJade ?? 200}</span> Jade
          </div>
        </span>
        <Btn className={cn("w-full mt-auto text-xs font-medium h-[30px] smd:h-12 smd:text-base", { ' !border-none': data.secend.finished })} isDisabled={!data.first.finished || data.secend.finished} onPress={data.secend.onAction} isLoading={data.secend.actionLoading}>
          {data.secend.finished ? data.secend.connectd : data.secend.connectd}
        </Btn>
      </div>}

    </div>
  );
}

function AddJade({ add = 1, jade = 'Jade' }: { add?: number, jade?: string }) {
  return <div className="flex text-xs gap-1">
    <span className="text-primary">+{add}</span>
    <span>{jade}</span>
  </div>
}
type AroNodeItem = {
  icon: ReactNode,
  tit: string,
  add: number,
  action: string,
  finish: boolean,
  foreach?: boolean,
  onAction?: () => void
}
function GetARONodeItem({ data }: { data: AroNodeItem }) {
  // box-shadow: 0px 1px 4px 0px #00000033;
  const disabled = (data.finish && !data.foreach) || data.action === 'Coming Soon...'
  return <div className="relative shadow smd:flex-col bg-white/5 p-5 gap-5 items-center rounded-xl overflow-hidden flex">
    {data.finish && <FinishBadge className="[--finish-badge-size:26px]" />}
    {data.icon}
    <div className="flex flex-col gap-2">
      <div className="text-sm font-semibold">{data.tit}</div>
      <AddJade add={data.add} jade={data.foreach ? "Jade for each" : 'Jade'} />
    </div>
    <Btn className={cn("ml-auto w-[120px] text-xs font-medium h-[30px]", { ' !text-primary !bg-primary/10 !opacity-100': disabled })} onPress={data.onAction} disabled={disabled}>{data.finish && !data.foreach ? "Done" : data.action}</Btn>
  </div>
}


function VUser({ user = 'A', className }: { className?: string, user?: string }) {
  return <div className={cn("w-[1em] h-[1em] text-[52px] border border-[#585858] bg-[#D3D3D3] rounded-full shrink-0 flex justify-center items-center text-black", className)}>
    <div className="text-[.5em]">{user}</div>
  </div>
}


function MyJadeRewards({ data }: { data: UserCampaignsRewards }) {
  const r = useRouter()
  const [showRedeem, toggleShowRedeem] = useToggle(false)
  const [redeemCode, setRedeemCode] = useState('')
  const { mutate: doRedeem, isPending: isPendingRedeem } = useMutation({
    mutationFn: async () => {
      await backendApi.redeemCampaignsByCode(redeemCode)
    },
    onError: handlerError,
    onSuccess: () => toast.success("Redeem Successed!"),
    onSettled: () => toggleShowRedeem(false)
  })

  return <ItemCard disableAnim className="py-[60px] flex items-center w-full justify-around gap-4 flex-wrap smd:flex-col smd:p-5 smd:items-start">
    <div className="flex gap-8 h-full smd:h-auto">
      <SVGS.SvgJadeRewards className="text-[97px]" />
      <DupleInfo
        className="h-full justify-between"
        tit={<Title text="My Jade Rewards" tip="Jade Rewards Tips //TODO" />}
        subClassName="text-[62px] font-semibold text-white items-baseline leading-none smd:text-[40px]"
        titClassName=""
        sub={<>
          {data.jadeRewards}
          <span className="text-sm font-normal">Jades</span>
        </>} />
    </div>
    <DupleSplit className="h-20 smd:h-[1px] smd:w-full" />
    <DupleInfo
      className="justify-between h-full smd:h-auto smd:gap-5"
      tit={<Title text="Jade to Vest" tip="Jade to Vest Tips //TODO" />}
      subClassName="text-[36px] font-semibold text-white items-baseline leading-none smd:text-2xl"
      titClassName=""
      sub={<>
        {fmtBerry(data.lockedJadeRewards)}
        <span className="text-sm font-normal">Locked Jades</span>
      </>} />
    <DupleSplit className="hidden smd:block smd:h-[1px] smd:w-full" />
    <DupleInfo
      className="justify-between h-full smd:h-auto smd:gap-5"
      tit={<Title text="Redeem More Jade" />}
      subClassName="text-sm text-white/80 items-baseline"
      titClassName=""
      sub={<>
        Got a Gift Code?<br />
        Redeem your Jade rewards here!
      </>} />
    <Btn className="self-end w-[106px] text-xs font-medium h-[30px] smd:h-12 smd:w-full smd:text-base" onPress={() => toggleShowRedeem(true)}>Redeem</Btn>
    <ForceModal isOpen={showRedeem} className="!w-[650px] smd:!w-full smd:!mx-5">
      <p className="self-stretch flex-grow-0 flex-shrink-0 font-semibold  text-base text-center  text-white">Redeem by code</p>
      <p className="self-stretch flex-grow-0 flex-shrink-0 text-center text-sm text-white/50"></p>
      <InputRedeemCode setValue={setRedeemCode} value={redeemCode} />
      <div className="flex w-full gap-[.625rem] smd:gap-5 ">
        <Btn isDisabled={redeemCode.length !== 6} className="w-full smd:h-12" onPress={() => doRedeem()} isLoading={isPendingRedeem}>
          Confirm
        </Btn>
        <Btn color='default' className="w-full  bg-default border smd:h-12 !border-white text-white hover:bg-l1" onPress={() => {
          toggleShowRedeem(false);
        }}>
          Cancel
        </Btn>
      </div>
    </ForceModal>
  </ItemCard>
}


function SocialsTasks({ data }: { data: UserCampaignsRewards }) {
  const ac = useAuthContext()
  const active = true


  const reportFinishTask = (t: Parameters<typeof backendApi.reportCampaignsSocails>[0]) => {
    retry(() => backendApi.reportCampaignsSocails(t))
  }

  const onFollowX = () => {
    const to = 'AroNetwork'
    const origin = 'aro.network'
    const url = `https://x.com/intent/follow?original_referer=${origin}&ref_src=twsrc^tfw|twcamp^buttonembed|twterm^follow|twgr^${to}&screen_name=${to}`
    window.open(encodeURI(url))

    reportFinishTask('followX')
  }

  const onJoinTg = () => {
    const group = 'ARO_Network'
    const url = `https://t.me/${group}`
    window.open(encodeURI(url))

  }
  const activeJoin = !(data.bind.x && data.bind.followX && data.bind.tg && data.bind.joinTg)
  const user = ac.queryUserInfo?.data;


  const mutConnect = useMutation({
    mutationFn: async (type: 'x' | "telegram" | 'discord') => {
      const token = await backendApi.getAccessToken();
      const redirectUrl = encodeURIComponent(`${BASE_API}/user/auth/handler/${type}`);
      console.log('redirectUrlredirectUrlredirectUrlredirectUrl', redirectUrl, `${BASE_API}/user/auth/handler/${type}`);

      let url: string = "";
      switch (type) {
        case "x":
          url = `https://x.com/i/oauth2/authorize?response_type=code&client_id=b1JXclh6WXJoZnFfZjVoSVluZ0c6MTpjaQ&redirect_uri=${redirectUrl}&scope=users.read%20tweet.read&code_challenge=challenge&code_challenge_method=plain&state=${token}`;
          ac.queryUserInfo?.refetch();
          break;
        case "telegram":
          const result = await telegramAuth(envText('tgCode'), { windowFeatures: { popup: true, width: 600, height: 800 } });
          const res = await axios.get(`${BASE_API}/user/auth/handler/telegram`, { params: { ...result, state: token }, });

          if (typeof res.request?.responseURL === 'string') {
            const err = new URL(res.request?.responseURL).searchParams.get("err");
            handlerErrForBind(err);
          }
          ac.queryUserInfo?.refetch();
          //todo refresh campains data
          return;
      }
      window.open(url, "_blank");

    }
  })

  return <>
    <ItemCard disableAnim className={cn("flex flex-col order-1", { "order-[0]": activeJoin })} active={activeJoin}>
      <Title text="Join ARO Community" />
      <div className="flex justify-between gap-[152px] xs:gap-20 smd:gap-[3.75rem] pt-[50px] pb-[60px] flex-wrap smd:flex-col px-20 ">
        <SocialTaskItem data={{
          icon: FaXTwitter,
          first: { tit: 'Connect X Account', action: 'Connect', connectd: 'Connected', finished: data.bind.x, actionLoading: mutConnect.isPending, onAction: () => mutConnect.mutate("x"), userName: user.social.x?.username ? '@' + user.social.x?.username : undefined },
          secend: { tit: 'Follow ARO on X', action: 'Follow', connectd: 'Followed', finished: data.bind.followX, onAction: onFollowX, addJade: data.jadePoint.followX }
        }} />
        <SocialTaskItem className="mr-auto smd:mr-0" data={{
          icon: FaTelegramPlane,
          first: { tit: 'Connect Telegram ', action: 'Connect', connectd: 'Connected', finished: data.bind.tg, actionLoading: mutConnect.isPending, onAction: () => mutConnect.mutate("telegram") },
          secend: { tit: 'Join Telegram', action: 'Join', connectd: 'Joined', finished: data.bind.joinTg, onAction: onJoinTg, addJade: data.jadePoint.joinTG }
        }} />
      </div>
    </ItemCard>

  </>
}

function GetNodes({ data }: { data: UserCampaignsRewards }) {
  const activeJoin = !(data.aroNode.pod && data.aroNode.link && data.aroNode.client && data.aroNode.liteNode)

  return <ItemCard disableAnim className={cn("flex flex-col order-1 gap-8", { "order-[0]": activeJoin })} active={activeJoin}>
    <Title text="Get an ARO Node" />
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <GetARONodeItem data={{ icon: <SVGS.SvgNodePod />, tit: 'Order ARO Pod', add: data.jadePoint.orderPod, foreach: true, action: 'Order Now', finish: data.aroNode.pod, onAction: () => { } }} />
      <GetARONodeItem data={{ icon: <SVGS.SvgNodeLink />, tit: 'Order ARO Link', add: data.jadePoint.orderLink, foreach: true, action: 'Coming Soon...', finish: data.aroNode.link, onAction: () => { } }} />
      <GetARONodeItem data={{ icon: <SVGS.SvgNodeClient />, tit: 'Run ARO Client', add: data.jadePoint.x86, action: 'Add ARO Client', finish: data.aroNode.client, onAction: () => { } }} />
      <GetARONodeItem data={{ icon: <SVGS.SvgNodeLite />, tit: 'Run ARO Lite', add: data.jadePoint.liteNode, action: 'Add ARO Lite', finish: data.aroNode.liteNode, onAction: () => { } }} />
    </div>
  </ItemCard>
}

function SocialActivites({ data }: { data: UserCampaignsRewards }) {
  const ac = useAuthContext()
  const activeSocial = !(data.bind.postX && data.bind.discord && data.bind.joinDiscord)

  const onJoinDiscord = () => {
    const code = 'Rc4BMUjbNB'
    const url = `https://discord.com/invite/${code}`
    window.open(encodeURI(url))
  }

  const onPostX = () => {
    postX({ text: '' })
  }

  const mutConnect = useMutation({
    mutationFn: async (type: 'x' | "telegram" | 'discord') => {
      const token = await backendApi.getAccessToken();
      const redirectUrl = encodeURIComponent(`${BASE_API}/user/auth/handler/${type}`);
      console.log('redirectUrlredirectUrlredirectUrlredirectUrl', redirectUrl, `${BASE_API}/user/auth/handler/${type}`);

      let url: string = "";
      if (type == 'discord') {
        url = `https://discord.com/oauth2/authorize?client_id=1303958338488238090&response_type=code&redirect_uri=${redirectUrl}&scope=identify+email&state=${token}`;
        ac.queryUserInfo?.refetch();
      }
      window.open(url, "_blank");

    }
  })

  console.log('activeSocialactiveSocialactiveSocial', activeSocial, data);



  return <ItemCard disableAnim className={cn("flex flex-col order-1", { "order-[0]": activeSocial })} active={activeSocial}>
    <Title text="Social Media Activities" />
    <div className="flex justify-between gap-[152px] xs:gap-20 pt-[50px] pb-[60px] flex-wrap smd:flex-col px-20 ">
      <SocialTaskItem data={{
        icon: FaDiscord,
        first: { tit: 'Connect Discord', action: 'Connect', connectd: 'Connected', finished: data.bind.discord, actionLoading: mutConnect.isPending, onAction: () => mutConnect.mutate('discord') },
        secend: { tit: 'Join Discord', action: 'Join', connectd: 'Joined', finished: data.bind.joinDiscord, onAction: onJoinDiscord, addJade: data.jadePoint.joinDiscord }
      }} />
      <SocialTaskItem className="mr-auto smd:mr-0" data={{
        icon: SVGS.SvgClipboard,
        first: { tit: 'Share on X', action: 'Post', finished: data.bind.postX, onAction: onPostX, addJade: data.jadePoint.sendTweet }
      }} />
    </div>
  </ItemCard>
}

function InviteFriends({ data }: { data: UserCampaignsRewards }) {
  const ac = useAuthContext();
  const user = ac.queryUserInfo?.data;

  const copy = useCopy();
  const onPostX = () => {
    postX({ text: '' })
  };
  const r = useRouter()
  const [showWorks, toggleShowWorks] = useToggle(false)
  const renderReferred = (value: string, name: string) => (<div className="flex gap-1  w-20"><span className="text-primary">{value}</span> {name}</div>)
  return <ItemCard className="flex flex-col gap-5 order-1">
    <Title text="Explore More" />
    <IconCard
      className="col-span-full h-auto flex-row gap-0"
      icon={SVGS.SvgReferral}
      iconSize={24}
      tit={null}
      content={<div className="flex items-center w-full h-full justify-between gap-5  smd:flex-col smd:justify-start">
        <div className="flex flex-col gap-5 justify-between h-full">
          <div className="text-xl leading-10  smd:text-base">
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
        <DupleSplit className="h-20 smd:w-full smd:h-[1px] mx-auto" />
        <div className="flex flex-col gap-5 justify-between h-full items-start mr-auto">
          <div className="text-xl leading-10 smd:text-base">
            My Referral Bonus
          </div>
          <div className="flex justify-between gap-8">
            <div className="flex flex-col gap-2 font-medium text-white">
              <div className="text-sm">Get referred</div>
              <div className="font-normal text-xs"><span className="text-primary">+5</span> Jades</div>
              <div className="text-xs leading-normal text-center py-[3px] w-[112px] rounded-full bg-[#02B421] cursor-pointer" onClick={() => r.push(`/?mode=${currentENVName}&tab=aroId`)}>Add My Referrer</div>
            </div>
            <div className="flex flex-col gap-2 font-medium text-white justify-between">
              <div className="text-sm">Refer friends</div>
              <div className="text-xs">
                <div className="flex items-center justify-between">
                  <div className="pr-[.875rem]">My Tier 1 Referral:</div>
                  {renderReferred(`${data.referralTier1.count}`, 'Referred')}
                  <DupleSplit className="h-3 mr-4" />
                  {renderReferred(fmtBerry(data.referralTier1.jadeRewards), 'Jades')}
                  <DupleSplit className="h-3 mr-4" />
                  {renderReferred(data.referralTier1.lockedJadeRewards, 'Jade to Vest')}
                </div>
                <div className="flex items-center justify-between ">
                  <div className="pr-[.875rem]">My Tier 2 Referral:</div>
                  {renderReferred(`${data.referralTier2.count}`, 'Referred')}
                  <DupleSplit className="h-3 mr-4" />
                  {renderReferred(fmtBerry(data.referralTier2.jadeRewards), 'Jades')}
                  <DupleSplit className="h-3 mr-4" />
                  {renderReferred(data.referralTier2.lockedJadeRewards, 'Jade to Vest')}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>}
    />
    {!showWorks && <div className={cn("rounded-xl bg-white/5 flex items-center gap-2 justify-center cursor-pointer text-start select-none shadow w-full py-6 col-span-full")} onClick={() => toggleShowWorks(true)}>
      <span>How Referral Program Works?</span>
      <IoIosArrowDown className="text-base" />
    </div>}
    {
      showWorks &&
      <IconCard
        className="col-span-full h-[10.625rem] smd:min-h-[440px] flex-row gap-0"
        icon={() => <IoAlertCircle />}
        iconSize={28}
        tit={null}
        content={<div className="flex items-center w-full h-full justify-between gap-5">
          <div className="text-[30px] leading-10 self-center">
            How Referral<br />Program Works?
          </div>
          <div className="flex gap-5">
            <div className="flex items-center gap-5">
              <VUser user="A" />
              <div className="text-sm opacity-70">+ 15% Extra Bonus <div className="inline-block align-text-top"><HelpTip content="//Todo Extra Bonus Tips" /></div><br />+ Bonus continue in Testnet</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-sm">{"refer(invite)"}</div>
              <div className="h-[1px] bg-white w-[120px] relative flex items-center">
                <MdPlayArrow className="absolute -right-2 text-xs" />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <VUser user="B" />
              <div className="text-sm opacity-70">+ 2 Jade in Previewnet<br />+ Mining Boosts in Testnet</div>
            </div>
          </div>
        </div>}
      />
    }
  </ItemCard>
}


function YouAreEarly() {
  const onApply = () => {
    window.open('https://enreach.fillout.com/Pioneers')

  }
  return <ItemCard className="flex items-center gap-5 py-8 justify-between pl-[10%] order-1">
    <div className="flex flex-col">
      <div className="font-semibold text-[28px] leading-none text-[#00FF0D]">You are Early！</div>
      <div className="text-sm pt-3">Become a Pioneer Aronaut</div>
      <Btn className="mt-5 text-xs font-medium h-[30px] smd:h-12 smd:text-base" onPress={onApply}>
        Apply to be Pioneer
      </Btn>
    </div>
    <div className="flex gap-11">
      <div className="flex flex-col gap-5">
        <div className="font-semibold text-[18px] leading-none ">What We Look For</div>
        <div className="text-xs leading-none text-[#D3D3D6] font-medium h-[30px] smd:h-12 smd:text-base">
          • Continuous feedback & active engagement<br />
          • Content support: writing, videos, local advocacy
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="font-semibold text-[18px] leading-none ">What You Get</div>
        <div className="text-xs leading-none text-[#D3D3D6] font-medium h-[30px] smd:h-12 smd:text-base">
          • Priority access to free ARO devices (select regions)<br />
          • Access to private funding rounds and other exclusive rewards
        </div>
      </div>
    </div>

  </ItemCard>
}

function ExploreMore() {

  return <ItemCard className="flex flex-col gap-5 order-1">
    <Title text="Invite Your Friends" />
    <div className="flex gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-center items-center rounded-lg bg-white/5 shadow-2 w-[200px] h-[60px]">
          <img src="/galxe.svg" alt="galxe" />
        </div>
        <Link href={""} className="flex gap-2 items-center text-primary text-sm">ARO Network on Galxe <FiArrowUpRight className="text-[1.375em]" /></Link>
      </div>
    </div>
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
  const { data, isLoading } = useQuery({
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
    retryDelay: (fcount) => fcount > 3 ? Math.min(fcount * 1000, 60000) : 1000,
  })


  return (
    <div className="w-full flex flex-col gap-7 pb-32">
      {isLoading &&
        <>
          <Skeleton className="rounded-xl w-full"><div className="h-[12.5rem]  rounded-3xl" /></Skeleton>
          <Skeleton className="rounded-xl w-full"><div className="h-[12.5rem]  rounded-3xl" /></Skeleton>
        </>
      }
      {
        Boolean(data) && <>
          <MyJadeRewards data={data!} />
          <SocialsTasks data={data!} />
          <SocialActivites data={data!} />
          <GetNodes data={data!} />
          {/* {sorted.map((item) => (
            <Fragment key={item.name}>{item.component}</Fragment>
          ))} */}
          <InviteFriends data={data!} />
          <YouAreEarly />
          <ExploreMore />
        </>
      }
    </div>
  );
}
