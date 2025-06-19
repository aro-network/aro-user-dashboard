import { TitCard } from "@/components/cards";
import backendApi from "@/lib/api";
import { CircularProgress, cn, DateRangePicker, DateValue, Image, Input, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import EChartsReact from "echarts-for-react";
import { FC, useEffect, useMemo, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDebounceMeasureWidth } from "../AOverview";
import {
  covertCurrentUpTime,
  covertText,
  formatNumber,
  generateDateList,
  generateLast15DaysRange,
  getCurrentDate,
  isIPv6,
  shortenMiddle,
} from "@/lib/utils";
import numbro from "numbro";
import _, { debounce } from "lodash";
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
import { ENV } from "@/lib/env";

const InfoRow = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between px-[.625rem]">
    <span>{label}</span>
    <span className="text-[#FFFFFF80]">{value}</span>
  </div>
);

const InfoCard = ({
  title,
  children,
  height = "h-[240px]",
}: {
  title: string;
  children: React.ReactNode;
  height?: string;
}) => (
  <div className={`smd:my-0 p-5 rounded-[12px] w-full ${height} smd:h-full`}>
    <div className="text-base font-semibold titleBg">{title}</div>
    <div className="flex flex-col gap-[.5rem] mt-[1.125rem] text-sm">{children}</div>
  </div>
);


const ANodeInfo: FC<{
  nodeInfo: (arg0: any) => void;
  onBack: () => void
}> = ({ nodeInfo, onBack }) => {
  const [isEdit, setIsEdit] = useState(false);
  const isMobile = useMobileDetect(1100)
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const nId = params.get("nId") || ''
  // const [detailInfo, setDetailInfo] = useState<{ detail: Nodes.NodeInfoList, countRewards: { today: string; total: string; yesterday: string } }>()
  // const [isFetching, setIsFetching] = useState(true)
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [chooseDate, setChooseDate] = useState<{
    start: DateValue;
    end: DateValue;
  }>(generateLast15DaysRange());


  const refetchRes = debounce(() => {
    isUserOwner.refetch()
  }, 1300);

  const refetchdetailRes = debounce(() => {
    refetch()
  }, 1300);



  const isUserOwner = useQuery({
    queryKey: ["isOwner", nId],
    enabled: true,
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: 'always',

    queryFn: async () => {
      const isOwner = await backendApi.currentOwner(nId)
      if (isOwner?.owner === false) {
        onBack();
      } else {
        refetchdetailRes()
      }
    }
  });


  // const isUserOwner = async () => {
  //   const isOwner = await backendApi.currentOwner(nId)
  //   if (isOwner?.owner === false) {
  //     onBack();
  //   } else {
  //     getCurrentDetail()
  //   }
  // }


  // const getCurrentDetail = async () => {
  //   const [detail, countRewards] = await Promise.all([
  //     backendApi.getNodeInfoByNodeId(nId),
  //     backendApi.countRewards(nId),
  //   ]);
  //   setIsFetching(false)

  //   nodeInfo(detail);
  //   setNodeName(detail.nodeName);
  //   setDetailInfo({ detail, countRewards })

  // }




  const { data: detailInfo, isFetching, refetch, isLoading, error } = useQuery({
    queryKey: ["NodeDetailList", nId],
    enabled: false,
    queryFn: async () => {

      const [detail, countRewards, upTime, upVolume, upPackageLoss, upAverageDelay] = await Promise.all([
        backendApi.getNodeInfoByNodeId(nId),
        backendApi.countRewards(nId),
        backendApi.currentUpTime(nId),
        backendApi.currentUpVolume(nId),
        backendApi.currentUpPackageLoss(nId),
        backendApi.currentUpAverageDelay(nId),
      ]);
      setNodeName(detail.nodeName);
      nodeInfo(detail);
      setIsInitialLoading(false)
      return { detail, countRewards, upTime, upVolume, upPackageLoss, upAverageDelay };
    },
    refetchOnWindowFocus: true,
  });


  // useEffect(() => {
  //   refetchRes()
  // }, []);



  const [nodeName, setNodeName] = useState("");

  const onSubmit = async (value: string) => {

    await backendApi.editCurrentNodeName(detailInfo?.detail.nodeUUID, value);

    refetch()
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

    const xData = datas.map((item: { date: string }) =>
      dayjs(item.date).format("MMM") + dayjs(item.date).format("D")

    );


    const yData = datas.map((item: { total: number }) =>
      _.toNumber(item.total)
    );
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
      // grid: { left: 40, top: 10, bottom: 30, right: 20, },


      grid: {
        left: 40,
        right: 0,
        top: 10,
        bottom: 50,
        show: false

      },
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
        axisLabel: { fontSize: 10, color: "rgba(255,255,255,0.5)", interval: 0, },
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

  const chainInfo = detailInfo?.detail.nodeChainInfo;
  let info
  if (chainInfo && 'Node' in chainInfo) {
    info = chainInfo.Node;
  } else if (chainInfo) {
    info = chainInfo;
  }
  return (
    <>
      {!isInitialLoading ? (

        <div className=" mx-auto w-full mt-5 text-white  flex justify-between smd:flex-col gap-5  smd:gap-0">
          <div className="w-[calc(100%-378px-20px)] smd:w-full h-fit ">


            <div className=" w-full smd:flex-wrap bg-[url(/rewardsBg.svg)] bg-repeat bg-cover smd:object-cover smd:bg-top smd:bg-fixed  rounded-[12px]  rewards ">
              <div className="flex  w-full p-[20px] h-fit    flex-col   gap-[10px] smd:gap-5">
                <div className="flex w-full justify-between " >
                  <span className="font-semibold text-[16px]  ">Rewards</span>

                </div>
                <div className="flex justify-between flex-wrap h-full w-full gap-5 ">
                  <div className="text-sm  flex flex-col xsl:justify-start  gap-[20px] smd:w-full flex-wrap ">
                    <span className="font-normal text-[14px] text-[#FFFFFF80]">
                      Total
                    </span>
                    <div className="flex  gap-[10px] items-baseline xsl:flex-wrap">
                      <span className="text-[30px]">
                        {formatNumber(Number(detailInfo?.countRewards.total || 0))}
                      </span>
                      <span>Jades</span>
                    </div>
                  </div>
                  <div className="text-sm  flex flex-col xsl:justify-start  gap-[20px] smd:w-full flex-wrap ">

                    <span className="font-normal text-[14px] text-[#FFFFFF80]">
                      Today
                    </span>
                    <div className="flex  gap-[10px] items-baseline xsl:flex-wrap">
                      <span className="text-[30px]">
                        + {formatNumber(Number(detailInfo?.countRewards.today || 0))}
                      </span>
                      <span>Jades</span>
                    </div>
                  </div>
                  <div className="text-sm  flex flex-col xsl:justify-start  gap-[20px] smd:w-full flex-wrap ">

                    <span className="font-normal text-[14px] text-[#FFFFFF80]">
                      Yesterday
                    </span>
                    <div className="flex  gap-[10px] items-baseline xsl:flex-wrap">
                      <span className="text-[30px]">
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
                "col-span-1 h-[278px] smd:h-auto commonTab  !rounded-xl  bg-[#6D6D6D66] w-full mt-5 !p-5 lg:col-span-2  gap-4 "
              )}
              contentClassName={(' smd:flex-wrap smd:gap-[.625rem]')}
              right={
                <div className=" !text-sm ">
                  <DateRangePicker
                    className="!w-full !text-2xl custom-date-picker"
                    showMonthAndYearPickers={true}
                    value={chooseDate as any}
                    onChange={handleChange as any}
                    maxValue={today(getLocalTimeZone())}
                  />
                </div>
              }
            >
              <div className="w-full smd:h-[10rem]" ref={ref}>
                <EChartsReact
                  className="w-full  !h-[13.125rem] smd:!h-[11.875rem] "

                  option={chartOpt}
                />
              </div>
            </TitCard>

            <AStats detailInfo={detailInfo} />

          </div>
          <div className="w-[378px] rightTab h-fit smd:w-full ">
            <div className="flex rounded-[12px] flex-col w-full p-[20px] gap-[.625rem] h-[139px] smd:h-auto">
              <div className="font-semibold text-base ">
                <span className=" text-nowrap">Node Info</span>
              </div>
              <div className="flex w-full gap-[10px] md:gap-5  h-[68px]">
                <img
                  width={68}
                  height={68}
                  src={`../${detailInfo?.detail?.nodeType}.png`}
                  className=" object-contain"
                  alt={`${detailInfo?.detail?.nodeType}`}
                />


                <div className="flex flex-col justify-between w-full  ">
                  <div className="text-sm  flex w-full  gap-[.625rem]  items-center">
                    <span className=" text-nowrap">Node Name:</span>
                    <div
                      className="text-[#FFFFFF80]  flex   gap-[.625rem] nodeName  "
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
                          className="rounded-sm w-[130px] !bg-[#FFFFFFCC] smd:w-[7.5rem] text-black"
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
                            {shortenMiddle(detailInfo?.detail.nodeName || "-", isMobile ? 12 : 15)}
                          </HelpTip>
                        </div>

                      )}
                      {isEdit && isMobile && <ConfirmDialog
                        tit=""
                        btnClassName='flex '
                        confirmClassName='w-full !bg-[#F5F5F51A] !border-white border text-white'
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

                      <button onClick={() => setIsEdit(!isEdit)}>
                        <FiEdit className="text-white text-xs" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm  mt-1 w-full flex   gap-[.625rem]">
                    <span className=" text-nowrap">Serial Number:</span>
                    <div className="text-[#FFFFFF80] truncate shrink-0" >
                      <HelpTip content={detailInfo?.detail?.nodeUUID} >
                        {shortenMiddle(detailInfo?.detail?.nodeUUID || "-", isMobile ? 12 : 17)}
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
            <div className="flex justify-between w-full gap-5 flex-col mt-5">
              <InfoCard title="Basics" height="h-[278px]">
                <InfoRow
                  label="Create Date"
                  value={dayjs(Number(detailInfo?.detail.createTimestamp || 0) * 1000).format("YYYY-MM-DD")}
                />
                <InfoRow
                  label="Device"
                  value={
                    <span className="capitalize">
                      {info?.deviceType === 'x86' ? 'X86 Server' : covertText(info?.deviceType as "box" | "x86" | "Box") || "-"}
                    </span>
                  }
                />
                <InfoRow
                  label="Registered Region"
                  value={info?.regionCode || "-"}
                />
                <InfoRow
                  label="Reputation Point"
                  value={info?.reputationPoint || "-"}
                />

              </InfoCard>

              <InfoCard title="Network Info">
                <InfoRow
                  label="Public IP"
                  value={
                    isIpv6 ? (
                      <HelpTip content={detailInfo?.detail.ip}>
                        <span className="text-[#FFFFFF80] text-sm text-center">
                          {shortenMiddle(detailInfo?.detail.ip as string)}
                        </span>
                      </HelpTip>
                    ) : (
                      detailInfo?.detail.ip || "-"
                    )
                  }
                />
                <InfoRow label="IP Location" value="-" />
                <InfoRow label="Local IP" value={newResult()?.[0]?.ip || "-"} />
                <InfoRow label="MAC Address" value={newResult()?.[0]?.mac || "-"} />
              </InfoCard>

              <InfoCard title="Device States">
                <InfoRow label="CPU Cores" value={detailInfo?.detail.deviceInfo.cpuCores || "-"} />
                <InfoRow
                  label="CPU Use"
                  value={`${((detailInfo?.detail.deviceInfo.cpuUse || 0) * 100).toFixed(2)}%`}
                />
                <InfoRow
                  label="RAM"
                  value={`${memUseGB}GB / ${memTotalGB}GB`}
                />
                <InfoRow label="ROM" value="-" />
              </InfoCard>
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
