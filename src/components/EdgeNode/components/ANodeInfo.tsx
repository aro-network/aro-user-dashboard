import { Btn } from "@/components/btns";
import { TitCard } from "@/components/cards";
import backendApi from "@/lib/api";
import { CircularProgress, cn, DateRangePicker } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import EChartsReact from "echarts-for-react";
import { FC, useMemo, useState } from "react";
import { FiEdit, FiHelpCircle } from "react-icons/fi";
import { useDebounceMeasureWidth } from "../AOverview";
import { fmtBerry } from "@/components/fmtData";
import { covertText, formatNumber, formatStr, getLast15Days } from "@/lib/utils";
import numbro from "numbro";
import _ from "lodash";
import { HelpTip } from "@/components/tips";
import dayjs from "dayjs";
import { CalendarDate, getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { I18nProvider } from "@react-aria/i18n";


const ANodeInfo: FC<{ selectList?: EdgeNodeMode.NodeType }> = ({ selectList }) => {
  const last15days = getLast15Days()

  const [chooseDate, setChooseDate] = useState<{ start: CalendarDate, end: CalendarDate }>({ start: parseDate(last15days[last15days.length - 1]), end: parseDate(last15days[0]) })
  const { data, isFetching } = useQuery({
    queryKey: ["NodeDetailList", selectList?.nodeUUID],
    enabled: true,
    queryFn: async () => {
      const [detail, countRewards] = await Promise.all([backendApi.getNodeInfoByNodeId(selectList?.nodeUUID), backendApi.countRewards(selectList?.nodeUUID)])
      return { detail, countRewards }
    },
    refetchOnWindowFocus: false,
  });


  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();

  const result = useQuery({
    queryKey: ["TrendingChart", chooseDate],
    enabled: true,
    queryFn: async () => {
      const startZoned = chooseDate.start.toDate(getLocalTimeZone());
      const endZoned = chooseDate.end.toDate(getLocalTimeZone());
      const startTime = Math.floor(startZoned.getTime() / 1000);
      const endTime = Math.floor(endZoned.getTime() / 1000);

      const res = backendApi.rewardHistory(selectList?.nodeUUID, { startTime: startTime, endTime: endTime })
      return res
    }
  });

  const onDealTime = () => {
    const data = result.data
    if (data && data.length) {
      const firstItem = data[0];
      const lastItem = data[data.length - 1];

      console.log('datadasdasd', data, firstItem, lastItem);

    }
  }

  console.log('daasdasdasda', result.data, onDealTime());


  const chartOpt = useMemo(() => {
    if (!width) return {};
    const datas = result.data || [];
    console.log('datas', datas, Math.floor(dayjs('2025-04-14').valueOf() / 1000));

    const xData = datas.map((item: { date: string; }) => item.date);
    const yData = datas.map((item: { total: number; }) => _.toNumber(item.total));
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
          return `<div>${params[0].marker.replace('background-color:rgba(0,0,0,0)', 'background-color:#4281FF')}${fmtBerry(params[0].data)}</div>`
        }
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
        splitLine: { lineStyle: { type: "dashed", color: "#fff", opacity: 0.05 } },
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
            formatter: (d: any) => fmtBerry(d.value),
            position: "top",
            color: "rgba(255,255,255,0.5)",
          },
          emphasis: {
            itemStyle: {
              color: "#4281FF",
              decal: "none"
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


  const memAvailableGB = ((data?.detail.deviceInfo.memAvailable || 0) / (1024 * 1024 * 1024)).toFixed(2);
  const memTotalGB = ((data?.detail.deviceInfo.memTotal || 0) / (1024 * 1024 * 1024)).toFixed(2);
  const memUseGB = ((data?.detail.deviceInfo.memUse || 0) / (1024 * 1024 * 1024)).toFixed(2);

  const network = data?.detail.deviceInfo.networkInterfaces || []
  const newResult = network.find(item => item.name === 'eth0') || network[0];




  return <>
    {!isFetching ? <div className=" mx-auto w-full mt-5 text-white mb-5 ">
      <div className="flex w-full gap-5 smd:flex-wrap">
        <div className="flex rounded-[1.25rem] flex-col w-full p-5 gap-[.625rem] h-[9.375rem] smd:h-full  bg-[#6D6D6D66]">
          <div className="font-semibold text-base ">
            <span>
              Node Info
            </span>
          </div>
          <div className="flex w-full gap-7 h-full smd:flex-wrap">
            <div className="">
              <img src={`../${data?.detail?.nodeType}.png`} className="w-[4.4375rem] h-full" alt={`${data?.detail?.nodeType}`} />
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-sm  flex  gap-[.625rem]">
                <span>
                  Node Name:
                </span>
                <div className="text-[#FFFFFF80] flex items-baseline gap-[.625rem]">
                  <HelpTip content={data?.detail?.nodeName}>
                    {formatStr(data?.detail.nodeName,)}
                  </HelpTip>
                  <button >
                    <FiEdit className="text-white text-xs" />
                  </button>
                </div>
              </div>
              <div className="text-sm mt-1 w-full flex   gap-[.625rem]">
                <span className="w-auto">
                  Node ID:
                </span>
                <div className="text-[#FFFFFF80] ">
                  <HelpTip content={data?.detail?.nodeID} >
                    {formatStr(data?.detail?.nodeID || '-')}
                  </HelpTip>

                </div>
              </div>
              <div className="text-sm mt-1 flex  gap-[.625rem]">
                <span>
                  Node Type:
                </span>
                <div className="text-[#FFFFFF80]">
                  {covertText(data?.detail?.nodeType as "x86" | "box")}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex rounded-[1.25rem] w-full p-5  h-[9.375rem] flex-col   gap-[.625rem] bg-[#6D6D6D66]">
          <div className="flex w-full justify-between">
            <span className="font-semibold text-base  ">Rewards</span>
            <Btn disabled className="h-5 font-normal">Go to Claim Page</Btn>
          </div>
          <div className="flex justify-between smd:flex-wrap h-full">
            <div className="text-sm  flex flex-col justify-between gap-[.625rem] ">
              <span className="font-normal text-sm text-[#FFFFFF80]">
                Total
              </span>
              <div className="flex  gap-[10px] items-baseline">
                <span className="text-3xl ">
                  {formatNumber(Number(data?.countRewards.total || 0))}
                </span>
                <span>
                  BERRY
                </span>
              </div>
            </div>
            <div className="text-sm  flex flex-col justify-between gap-[.625rem] ">
              <span className="font-normal text-sm text-[#FFFFFF80]">
                Today
              </span>
              <div className="flex  gap-[10px] items-baseline">
                <span className=" text-3xl ">
                  +  {formatNumber(Number(data?.countRewards.today || 0))}
                </span>
                <span>
                  BERRY
                </span>
              </div>
            </div>
            <div className="text-sm  flex flex-col justify-between gap-[.625rem] ">
              <span className="font-normal text-sm text-[#FFFFFF80]">
                Yesterday
              </span>
              <div className="flex  gap-[10px] items-baseline">
                <span className=" text-3xl ">
                  +  {formatNumber(Number(data?.countRewards.yesterday || 0))}
                </span>
                <span>
                  BERRY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TitCard
        tit="Rewards History"
        className={cn("col-span-1 h-full  bg-[#6D6D6D66] w-full mt-5  lg:col-span-2  gap-4",)}
        right={
          <div className=" !text-sm ">
            <I18nProvider locale="en-US">
              <DateRangePicker className="w-full !text-2xl custom-date-picker"
                showMonthAndYearPickers={true}
                value={chooseDate}
                onChange={(e) => {
                  if (e?.start && e?.end) {
                    setChooseDate({ start: e.start, end: e.end })
                  }
                }
                }
                maxValue={today(getLocalTimeZone())}
              />
            </I18nProvider>
          </div>
        }
      >
        <div className="w-full" style={{ height: '14.125rem' }} ref={ref}>

          <EChartsReact style={{ height: '14.125rem' }} className="w-full" option={chartOpt} />
        </div>
      </TitCard>

      <div className="flex justify-between w-full gap-5 smd:flex-wrap">

        <div className=" my-5 p-5 bg-[#6D6D6D66] rounded-[1.25rem] w-full   ">
          <span className=" text-base font-semibold">
            Basics
          </span>
          <div className="flex flex-col gap-[10px] mt-5 text-sm">
            <div className="flex justify-between">
              <span >Create Date</span>
              <span className="text-[#FFFFFF80]">{(dayjs(Number(data?.detail?.deviceInfo.date || 0) * 1000).format('YYYY-MM-DD'))}</span>
            </div>
            <div className="flex justify-between">
              <span >Serial Number</span>
              <span className="text-[#FFFFFF80]">{data?.detail.nodeUUID}</span>
            </div>
            <div className="flex justify-between">
              <span >Device</span>
              <span className="text-[#FFFFFF80] capitalize">{data?.detail.nodeChainInfo.Node.deviceType || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span >Registered Region</span>
              <span className="text-[#FFFFFF80]">{data?.detail.nodeChainInfo.Node.regionCode || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex gap-[.375rem] items-center" >Reputation Point</span>
              <span className="text-[#FFFFFF80]">{data?.detail.nodeChainInfo.Node.reputationPoint || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex gap-[.375rem] items-center" >  Cheat Status </span>
              <span className="text-[#FFFFFF80]">{data?.detail.nodeChainInfo.Node.cheatStatus || '-'}</span>
            </div>

          </div>
        </div>

        <div className="my-5 p-5 bg-[#6D6D6D66] rounded-[1.25rem] w-full">
          <span className=" text-base font-semibold">
            Network Info
          </span>
          <div className="flex flex-col gap-[10px] mt-5 text-sm">

            <div className="flex justify-between">
              <span >Public IP</span>
              <span className="text-[#FFFFFF80]">{data?.detail.ip}</span>
            </div>
            <div className="flex justify-between">
              <span >IP Location</span>
              <span className="text-[#FFFFFF80]">{'-'}</span>
            </div>
            <div className="flex justify-between">
              <span >Local IP</span>
              <span className="text-[#FFFFFF80]">{newResult?.ip}</span>
            </div>
            <div className="flex justify-between">
              <span >MAC Address</span>
              <span className="text-[#FFFFFF80]">{newResult?.mac}</span>
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


        <div className="my-5 p-5 bg-[#6D6D6D66] rounded-[1.25rem] w-full">
          <span className=" text-base font-semibold">
            Device States
          </span>
          <div className="flex flex-col gap-[10px] mt-5 text-sm">
            <div className="flex justify-between">
              <span >CPU Cores</span>
              <span className="text-[#FFFFFF80]">{data?.detail.deviceInfo.cpuCores || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span >CPU Use</span>
              <span className="text-[#FFFFFF80]">{((data?.detail.deviceInfo.cpuUse || 0) * 100).toFixed(2) + '%' || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span >RAM</span>
              <span className="text-[#FFFFFF80]">{memUseGB + 'GB /' + memTotalGB + 'GB'}</span>
            </div>
            <div className="flex justify-between">
              <span >ROM</span>
              <span className="text-[#FFFFFF80]">-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      :
      <div className="flex justify-center pt-[4.5625rem]  w-full items-center h-full">
        <CircularProgress label="Loading..." />
      </div>
    }
  </>

}
export default ANodeInfo