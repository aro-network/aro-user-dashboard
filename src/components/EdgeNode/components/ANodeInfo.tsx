import { Btn } from "@/components/btns";
import { TitCard } from "@/components/cards";
import backendApi from "@/lib/api";
import { SVGS } from "@/svg";
import { CircularProgress, cn, DateRangePicker } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import EChartsReact from "echarts-for-react";
import { FC, useMemo } from "react";
import { FiEdit, FiHelpCircle } from "react-icons/fi";
import { useDebounceMeasureWidth } from "../AOverview";
import { fmtBerry } from "@/components/fmtData";
import { covertText, fmtDate, formatStr } from "@/lib/utils";
import numbro from "numbro";
import _ from "lodash";
import { HelpTip } from "@/components/tips";

const nodeData = {
  image: <SVGS.SvgDevice />,
  totalReach: 290,
  todayReach: 2.1,
  yesterdayReach: 4.6,
  nodeName: "-",
  nodeId: "-",
  nodeType: "-",
  createDate: "-",
  activationCode: "-",
  device: "-",
  region: "-",
  externalIp: "-",
  ipRegion: "-",
  internalIp: "-",
  macAddress: "-",
  natType: "-",
  upnp: "-",
  delay: "-",
  cpuCores: '-',
  cpuUsage: '-',
  ramUsage: '-',
  totalRam: '-',
  romUsage: '-',
  totalRom: '-',
};

const ANodeInfo: FC<{ selectList?: EdgeNodeMode.NodeType }> = ({ selectList }) => {

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
    queryKey: ["TrendingChart"],
    enabled: true,
    queryFn: () => backendApi.rewardHistory(selectList?.nodeUUID)
  });

  console.log('aaa-----', result);


  const chartOpt = useMemo(() => {
    if (!width) return {};
    const datas = result.data || [];
    console.log('datas', datas);

    const xData = datas.map((item: { date: string; }) => fmtDate(Number(item.date) * 1000, "MMMD"));
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
                  <HelpTip content={data?.detail?.nodeID}>
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
                  {data?.countRewards.total || 0}
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
                  +  {data?.countRewards.today || 0}
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
                  +  {data?.countRewards.yesterday || 0}
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
        className={cn("col-span-1 h-full bg-[#6D6D6D66] w-full mt-5  lg:col-span-2  gap-4",)}
        right={
          <div>
            <DateRangePicker className="w-full" classNames={{ 'popoverContent': 'w-full', 'calendarContent': 'w-full' }} />
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
              <span className="text-[#FFFFFF80]">{nodeData.createDate}</span>
            </div>
            <div className="flex justify-between">
              <span >Serial Number</span>
              <span className="text-[#FFFFFF80]">{nodeData.device}</span>
            </div>
            <div className="flex justify-between">
              <span >Device</span>
              <span className="text-[#FFFFFF80]">{nodeData.region}</span>
            </div>
            <div className="flex justify-between">
              <span >Registered Region</span>
              <span className="text-[#FFFFFF80]">{nodeData.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex gap-[.375rem] items-center" >Reputation Rate <FiHelpCircle className="text-[#FFFFFF80]" /></span>
              <span className="text-[#FFFFFF80]">{nodeData.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex gap-[.375rem] items-center" >  Cheating Rate <FiHelpCircle className="text-[#FFFFFF80]" /></span>
              <span className="text-[#FFFFFF80]">{nodeData.region}</span>
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
              <span className="text-[#FFFFFF80]">{nodeData.externalIp}</span>
            </div>
            <div className="flex justify-between">
              <span >IP Location</span>
              <span className="text-[#FFFFFF80]">{nodeData.ipRegion}</span>
            </div>
            <div className="flex justify-between">
              <span >Local IP</span>
              <span className="text-[#FFFFFF80]">{nodeData.internalIp}</span>
            </div>
            <div className="flex justify-between">
              <span >MAC Address</span>
              <span className="text-[#FFFFFF80]">{nodeData.macAddress}</span>
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
              <span className="text-[#FFFFFF80]">{data?.detail.deviceInfo.cpuCores}</span>
            </div>
            <div className="flex justify-between">
              <span >CPU Use</span>
              <span className="text-[#FFFFFF80]">{nodeData.cpuUsage}</span>
            </div>
            <div className="flex justify-between">
              <span >RAM</span>
              <span className="text-[#FFFFFF80]">{nodeData.ramUsage}</span>
            </div>
            <div className="flex justify-between">
              <span >ROM</span>
              <span className="text-[#FFFFFF80]">{nodeData.romUsage}</span>
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