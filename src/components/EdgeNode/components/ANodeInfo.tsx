import { TitCard } from "@/components/cards";
import backendApi from "@/lib/api";
import { CircularProgress, cn, DateRangePicker, DateValue, Image, Input, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import EChartsReact from "echarts-for-react";
import { FC, useEffect, useMemo, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDebounceMeasureWidth } from "../AOverview";
import {
  covertText,
  formatNumber,
  generateDateList,
  generateLast15DaysRange,
  getCurrentDate,
  isIPv6,
  shortenMiddle,
} from "@/lib/utils";
import numbro from "numbro";
import _ from "lodash";
import { HelpTip } from "@/components/tips";
import dayjs from "dayjs";
import {
  CalendarDate,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import useMobileDetect from "@/hooks/useMobileDetect";
import { ConfirmDialog } from "@/components/dialogimpls";
import { useSearchParams } from "next/navigation";
import AStats from "../AStats";

const ANodeInfo: FC<{
  nodeInfo: (arg0: any) => void;
  onBack: () => void
}> = ({ nodeInfo, onBack }) => {
  const [isEdit, setIsEdit] = useState(false);
  const isMobile = useMobileDetect(1100)
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const nId = params.get("nId") || ''
  const [detailInfo,setDetailInfo] = useState<{detail:Nodes.NodeInfoList,countRewards:{ today: string; total: string; yesterday: string }}>()
  const [isFetching,setIsFetching] = useState(true)
  const [chooseDate, setChooseDate] = useState<{
    start: DateValue;
    end: DateValue;
  }>(generateLast15DaysRange());
  

  const isUserOwner = async() =>{
    const isOwner = await backendApi.currentOwner(nId)
    
    if (isOwner?.owner === false) {
      onBack(); 
    }else{
      getCurrentDetail()
    }
  }


  const getCurrentDetail = async() =>{
    const [detail, countRewards] = await Promise.all([
      backendApi.getNodeInfoByNodeId(nId),
      backendApi.countRewards(nId),
    ]);
    setIsFetching(false)

    nodeInfo(detail);
    setNodeName(detail.nodeName);
    setDetailInfo( { detail, countRewards })

  }

  
  useEffect(() => {
    isUserOwner()
  }, []);



  const [nodeName, setNodeName] = useState("");

  const onSubmit = async (value: string) => {
    await backendApi.editCurrentNodeName(detailInfo?.detail.nodeUUID, value);
    getCurrentDetail
    setIsEdit(false);
  };

  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();

  const result = useQuery({
    queryKey: ["TrendingChart", chooseDate],
    enabled: !!chooseDate.start && !!chooseDate.end,
    queryFn: async () => {
      const result = getCurrentDate(chooseDate)
      const res = await backendApi.rewardHistory(nId, result);
      const list = generateDateList(result.startTime, result.endTime);
      return !res.length ? list : res;
    },
  });


  const chartOpt = useMemo(() => {
    if (!width) return {};
    const datas = result.data || [];

    const xData = datas.map((item: { date: string }) => item.date);
    const yData = datas.map((item: { total: number }) =>
      _.toNumber(item.total)
    );
    console.info("width:", width);
    const showCount = Math.floor(width / 60);
    const endValue = xData.length - 1;
    const startValue = Math.max(0, endValue - showCount);
    return {
      animation: true,
      animationDuration: 200,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: (params: any) => {
          // console.info("params:", params)
          // <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(0,0,0,0);"></span>
          return `<div>${params[0].marker.replace(
            "background-color:rgba(0,0,0,0)",
            "background-color:#00E42A"
          )}${formatNumber(params[0].data)}</div>`;
        },
      },
      grid: { left: 40, top: 10, bottom: 30, right: 20, show: false },
      // toolbox: { show: false },
      dataZoom: [
        {
          type: "inside",
          // start: 0,
          startValue,
          endValue,
          zoomOnMouseWheel: false,
          moveOnMouseWheel: true,
          preventDefaultMouseMove: false,
        },
        {
          show: false,
        },
      ],
      xAxis: {
        type: "category",
        data: xData,
        axisLabel: { fontSize: 10, color: "rgba(255,255,255,0.5)" },
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "10%"],
        // max: (value: number) => value * 1.2,

        axisLabel: {
          color: "rgba(255,255,255,0.5)", formatter: (value: number) => numbro(value)
            .format({
              mantissa: 2,
              trimMantissa: true,
              average: value >= 1000,
            })
            .toUpperCase(),
        },
        splitLine: {
          lineStyle: { type: "dashed", color: "#fff", opacity: 0.05 },
        },
      },
      series: [
        {
          data: yData,
          type: "bar",
          itemStyle: {
            borderRadius: 15,
            color: "rgba(0,0,0,0)",
            decal: {
              color: "rgba(256,256,256,0.2)",
              dashArrayY: 3,
              dashArrayX: 1000,
              rotation: Math.PI / 4,
            },
          },

          label: {
            show: true,
            formatter: (d: any) => formatNumber(d.value),
            position: "top",
            color: "rgba(255,255,255,0.5)",
          },
          emphasis: {
            itemStyle: {
              color: "#00E42A",
              decal: "none",
            },
          },
          barWidth: 30,
          barMinWidth: 30,
          barCategoryGap: 30,
        },
      ],
      darkMode: true,
    };
  }, [width, result.data]);


  const memTotalGB = (
    (detailInfo?.detail.deviceInfo.memTotal || 0) /
    (1024 * 1024 * 1024)
  ).toFixed(2);
  const memUseGB = (
    (detailInfo?.detail.deviceInfo.memUse || 0) /
    (1024 * 1024 * 1024)
  ).toFixed(2);

  const network = detailInfo?.detail.deviceInfo.networkInterfaces || [];

  const newResult = (): EdgeNodeMode.IpInfo[] => {
    return network.sort((a, b) => {
      const getPriority = (name: string) => {
        if (name.startsWith("macvlan")) return 0;
        if (name === "eth0") return 1;
        return 2;
      };

      return getPriority(a.name) - getPriority(b.name);
    });
  };

  const handleChange = (e: { start: CalendarDate; end: CalendarDate }) => {
    const { start, end } = e;
    if (start && end) {
      const diffInTime =
        end.toDate(getLocalTimeZone()).getTime() -
        start.toDate(getLocalTimeZone()).getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
      if (diffInDays >= 6) {
        setChooseDate({ start, end });
      }
    } else {
      setChooseDate({ start, end });
    }
  };

  const onSubmitEdit = () => {
    if (
      !nodeName ||
      nodeName === detailInfo?.detail.nodeName
    ) {
      setIsEdit(false);
      setNodeName(detailInfo?.detail.nodeName as string)
      return
    }

    onSubmit(
      nodeName
        .replace(/[\u4e00-\u9fa5]/g, "")
        .trim()
    );


  }

  const isIpv6 = isMobile && isIPv6(detailInfo?.detail.ip as string)


  console.log('adasdasdsadsa',detailInfo);
  


  return (
    <>
      {!isFetching ? (

      <div className=" mx-auto w-full mt-5 text-white mb-5 flex justify-between smd:flex-col gap-5 ">
        <div className="w-[60%] smd:w-full">
          <div className="flex w-full gap-5 smd:flex-wrap">
            <div className="flex rounded-[1.25rem] w-full p-5  h-[9.375rem] smd:h-full flex-col   gap-[.625rem] smd:gap-5 bg-[#6D6D6D66]">
              <div className="flex w-full justify-between">
                <span className="font-semibold text-base  ">Rewards</span>
                {/* <Btn disabled className="h-5 font-normal">
                  Go to Claim Page
                </Btn> */}
              </div>
              <div className="flex justify-between smd:flex-wrap h-full smd:w-full">
                <div className="text-sm  flex flex-col justify-between xsl:justify-start    gap-[.625rem] smd:w-full flex-wrap">
                  <span className="font-normal text-sm text-[#FFFFFF80]">
                    Total
                  </span>
                  <div className="flex  gap-[10px] items-baseline xsl:flex-wrap">
                    <span className="text-3xl">
                      {formatNumber(Number(detailInfo?.countRewards.total || 0))}
                    </span>
                    <span>Jades</span>
                  </div>
                </div>
                <div className="text-sm  flex flex-col justify-between xsl:justify-start  gap-[.625rem]  flex-wrap smd:pt-5 ">
                  <span className="font-normal text-sm text-[#FFFFFF80]">
                    Today
                  </span>
                  <div className="flex  gap-[10px] items-baseline xsl:flex-wrap">
                    <span className="text-3xl">
                      + {formatNumber(Number(detailInfo?.countRewards.today || 0))}
                    </span>
                    <span>Jades</span>
                  </div>
                </div>
                <div className="text-sm  flex flex-col justify-between xsl:justify-start  gap-[.625rem] smd:pt-5 flex-wrap ">
                  <span className="font-normal text-sm text-[#FFFFFF80]">
                    Yesterday
                  </span>
                  <div className="flex  gap-[10px] items-baseline xsl:flex-wrap">
                    <span className="text-3xl">
                      +{" "}
                      {formatNumber(Number(detailInfo?.countRewards.yesterday || 0))}
                    </span>
                    <span>Jades</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TitCard
            tit="Rewards History"
            className={cn(
              "col-span-1 h-[19.375rem]   bg-[#6D6D6D66] w-full mt-5 !p-5 lg:col-span-2  gap-4 "
            )}
            contentClassName={(' smd:flex-wrap smd:gap-[.625rem]')}
            right={
              <div className=" !text-sm ">
                <I18nProvider locale="en-US">
                  <DateRangePicker
                    className="!w-full !text-2xl custom-date-picker"
                    showMonthAndYearPickers={true}
                    value={chooseDate as any}
                    onChange={handleChange as any}
                    maxValue={today(getLocalTimeZone())}
                  />
                </I18nProvider>
              </div>
            }
          >
            <div className="w-full" ref={ref}>
              <EChartsReact
                className="w-full  !h-[12.5rem]"
                option={chartOpt}
              />
            </div>
          </TitCard>

          <AStats />

        </div>
        <div className="w-[40%] smd:w-full">
          <div className="flex rounded-[1.25rem] flex-col w-full p-5 gap-[.625rem] h-[9.375rem]  smd:h-full  bg-[#6D6D6D66]">
            <div className="font-semibold text-base ">
              <span>Node Info</span>
            </div>
            <div className="flex w-full gap-[.625rem] md:gap-5 h-full  ">
              <div className="smd:w-[40%]">
                {!detailInfo?.detail?.nodeType ?
                  <Skeleton className="rounded-2xl"><div className="w-[5.4375rem] rounded-3xl" /></Skeleton> :
                  <img
                    src={`../${detailInfo?.detail?.nodeType}.png`}
                    className="w-[5.4375rem] h-full"
                    alt={`${detailInfo?.detail?.nodeType}`}
                  />
                }

              </div>
              <div className="flex flex-col justify-between w-full smd:py-[.625rem] ">
                <div className="text-sm  flex   gap-[.625rem]  items-center">
                  <span>Node Name:</span>
                  <div
                    style={{ alignItems: "anchor-center" }}
                    className="text-[#FFFFFF80]  flex  gap-[.625rem] nodeName "
                  >
                    {isEdit && !isMobile ? (
                      <input
                        autoFocus
                        maxLength={30}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            onSubmitEdit()
                          }
                        }}
                        onBlur={(e) => {
                          onSubmitEdit()
                        }}
                        className="rounded-sm !bg-[#FFFFFFCC] smd:w-[7.5rem] text-black"
                        onChange={(e) =>
                          setNodeName(
                            e.target.value
                              .replace(/[\u4e00-\u9fa5]/g, "")
                              .trim()
                          )
                        }
                        value={nodeName}
                      />
                    ) : (
                      <div >
                        <HelpTip content={detailInfo?.detail?.nodeName}>
                          {shortenMiddle(detailInfo?.detail.nodeName || "-", isMobile ? 10 : 15)}
                        </HelpTip>
                      </div>

                    )}
                    {isEdit && isMobile && <ConfirmDialog
                      tit=""
                      btnClassName='flex '
                      confirmClassName='w-full !bg-[#F5F5F51A] text-white'
                      cancelClassName="w-full"
                      confirmText='Cancel'
                      cancelText='Confirm'
                      cancelDisable={!nodeName}
                      msg={
                        <Input
                          maxLength={30}
                          className=" mt-5 "
                          classNames={{ 'inputWrapper': '!rounded-lg !bg-[#FFFFFF1A] h-12', 'input': '!text-[#FFFFFF66] outline-none' }}
                          value={nodeName}
                          onChange={(e) =>
                            setNodeName(
                              e.target.value
                                .replace(/[\u4e00-\u9fa5]/g, "")
                                .trim()
                            )
                          }
                        />
                      }
                      className="smd:mx-5 "
                      isOpen={isEdit}
                      onConfirm={() => {
                        setNodeName(detailInfo?.detail.nodeName as string)
                        setIsEdit(!isEdit)
                      }
                      }
                      onCancel={() => onSubmitEdit()}
                    />}

                    <button onClick={() => setIsEdit(true)}>
                      <FiEdit className="text-white text-xs" />
                    </button>
                  </div>
                </div>
                <div className="text-sm  mt-1 w-full flex   gap-[.625rem]">
                  <span className="w-auto">Serial Number:</span>
                  <div className="text-[#FFFFFF80] " >
                    <HelpTip content={detailInfo?.detail?.nodeUUID} >
                      {shortenMiddle(detailInfo?.detail?.nodeUUID || "-", 18)}
                    </HelpTip>
                  </div>
                </div>
                <div className="text-sm   mt-1 flex  gap-[.625rem]">
                  <span>Node Type:</span>
                  <div className="text-[#FFFFFF80]">
                    {covertText(detailInfo?.detail?.nodeType as "x86" | "box")}
                  </div>
                </div>
              </div>
            </div>


          </div>

          <div className="flex justify-between w-full gap-5 flex-col mt-5  ">
            <div className=" smd:mb-0  p-5 bg-[#6D6D6D66] rounded-[1.25rem] w-full  h-[19.375rem] smd:h-full   ">
              <span className=" text-base font-semibold">Basics</span>
              <div className="flex flex-col gap-[.5rem] mt-[1.125rem] text-sm">
                <div className="flex justify-between">
                  <span>Create Date</span>
                  <span className="text-[#FFFFFF80]">
                    {dayjs(
                      Number(detailInfo?.detail.createTimestamp || 0) * 1000
                    ).format("YYYY-MM-DD")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Device</span>
                  <span className="text-[#FFFFFF80] capitalize">
                    {covertText(detailInfo?.detail.nodeChainInfo.Node.deviceType as "box" | "x86" | "Box") || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Registered Region</span>
                  <span className="text-[#FFFFFF80]">
                    {detailInfo?.detail.nodeChainInfo.Node.regionCode || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex gap-[.375rem] items-center">
                    Reputation Point
                  </span>
                  <span className="text-[#FFFFFF80]">
                    {detailInfo?.detail.nodeChainInfo.Node.reputationPoint || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="flex gap-[.375rem] items-center">
                    {" "}
                    Cheat Status{" "}
                  </span>
                  <span className="text-[#FFFFFF80]">
                    {detailInfo?.detail.nodeChainInfo.Node.cheatStatus || "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className=" smd:my-0 p-5 bg-[#6D6D6D66] rounded-[1.25rem] w-full h-[15rem] smd:h-full">
              <span className=" text-base font-semibold">Network Info</span>
              <div className="flex flex-col gap-[.5rem] mt-[1.125rem] text-sm">
                <div className="flex justify-between">
                  <span>Public IP</span>
                  {isIpv6 ? <HelpTip content={detailInfo?.detail.ip} >
                    <span className={cn('text-[#FFFFFF80] text-sm   text-center ')}>
                      {shortenMiddle(detailInfo?.detail.ip as string)}
                    </span>
                  </HelpTip>
                    :
                    <span className="text-[#FFFFFF80]">{detailInfo?.detail.ip}</span>}
                </div>
                <div className="flex justify-between">
                  <span>IP Location</span>
                  <span className="text-[#FFFFFF80]">{"-"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local IP</span>
                  <span className="text-[#FFFFFF80]">
                    {newResult()![0]?.ip || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>MAC Address</span>
                  <span className="text-[#FFFFFF80]">
                    {newResult()![0]?.mac || "-"}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                          <span >NAT Type</span>
                          <span className="text-[#FFFFFF80]">{nodeData.natType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span >Packet Loss Rate</span>
                          <span className="text-[#FFFFFF80]">{nodeData.upnp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span >Delay</span>
                          <span className="text-[#FFFFFF80]">{nodeData.delay}</span>
                        </div> */}
              </div>
            </div>

            <div className=" smd:my-0 p-5 bg-[#6D6D6D66] rounded-[1.25rem] w-full  h-[15rem] smd:h-full">
              <span className=" text-base font-semibold">Device States</span>
              <div className="flex flex-col gap-[.5rem] mt-[1.125rem] text-sm">
                <div className="flex justify-between">
                  <span>CPU Cores</span>
                  <span className="text-[#FFFFFF80]">
                    {detailInfo?.detail.deviceInfo.cpuCores || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>CPU Use</span>
                  <span className="text-[#FFFFFF80]">
                    {((detailInfo?.detail.deviceInfo.cpuUse || 0) * 100).toFixed(2) +
                      "%" || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>RAM</span>
                  <span className="text-[#FFFFFF80]">
                    {memUseGB + "GB /" + memTotalGB + "GB"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ROM</span>
                  <span className="text-[#FFFFFF80]">-</span>
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>
     ) : (
        <div className="flex justify-center pt-[4.5625rem]  w-full items-center h-full">
          <CircularProgress label="Loading..." classNames={{ 'svg': 'text-[#00E42A]' }} />
        </div>
      )} 
    </>
  );
};
export default ANodeInfo;
