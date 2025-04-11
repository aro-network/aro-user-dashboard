import { Btn } from "@/components/btns";
import { TitCard } from "@/components/cards";
import backendApi from "@/lib/api";
import { SVGS } from "@/svg";
import { CircularProgress, cn, DateRangePicker, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import EChartsReact from "echarts-for-react";
import { FC, useMemo } from "react";
import { FiEdit } from "react-icons/fi";
import { useDebounceMeasureWidth } from "../AOverview";
import { fmtBerry } from "@/components/fmtData";
import { fmtDate } from "@/lib/utils";
import numbro from "numbro";
import { I18NProvider } from "next/dist/server/future/helpers/i18n-provider";
import _ from "lodash";

const nodeData = {
  image: <SVGS.SvgDevice />,
  totalReach: 290,
  todayReach: 2.1,
  yesterdayReach: 4.6,
  nodeName: "Home Node 001",
  nodeId: "H8SMNNOP5",
  nodeType: "Box",
  createDate: "2025-01-01",
  activationCode: "F8V01g6d6g",
  device: "Box ABC",
  region: "China 2",
  externalIp: "116.****.241",
  ipRegion: "华东上海电信",
  internalIp: "192.168.50.220",
  macAddress: "2c:c4:4f:a1:90:f5",
  natType: "对称型",
  upnp: "不适用",
  delay: "---",
  cpuCores: 4,
  cpuUsage: 4,
  ramUsage: 300,
  totalRam: 1024,
  romUsage: 1,
  totalRom: 997,
};

const ANodeInfo: FC<{ selectList?: EdgeNodeMode.NodeType, onSwitchToUnbind: (e?: string) => void }> = ({ selectList, onSwitchToUnbind }) => {


  const { data, isFetching } = useQuery({
    queryKey: ["NodeList"],
    enabled: true,
    queryFn: async () => {
      const data = await backendApi.getNodeInfoByNodeId(selectList?.nodeId)
      return data
    }

  });


  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();

  const result = useQuery({
    queryKey: ["TrendingChart"],
    enabled: true,
    queryFn: async () => {
      const [node, rewards, trending] = await Promise.all([backendApi.getCurrentEdgeNode(), backendApi.getCurrentEdgeNodeRewards(), backendApi.getCurrentEdgeNodeRewardsTrending()])
      return { node, rewards, trending }
    }
  });

  const chartOpt = useMemo(() => {
    if (!width) return {};
    const datas = result.data?.trending || [];
    console.log('datas', datas);

    const xData = datas.map((item: { date: number; }) => fmtDate(item.date * 1000, "MMMD"));
    const yData = datas.map((item: { rewards: any; }) => _.toNumber(item.rewards));
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
  }, [width, result.data?.trending]);

  console.log('setUnbingInfosetUnbingInfosetUnbingInfo', data);


  return <>
    {!isFetching ? <div className=" mx-auto w-full text-white mb-5">
      <div className="flex w-full gap-5">
        <div className="flex rounded-[1.25rem] flex-col w-full p-5 gap-5   mb-6 bg-[#404040]">
          <div className="font-semibold text-base leading-10 flex justify-between items-center">
            <span>
              Node Info
            </span>
          </div>
          <div className="flex w-full gap-7">
            <div className="">
              <img src={`./${data?.nodeType}.png`} className="w-full h-full" alt={`${data?.nodeType}`} />
            </div>
            <div className="flex flex-col justify-between ">
              <div className="text-sm mt-1 flex font-semibold  gap-[.625rem]">
                <span>
                  Node Name:
                </span>
                <div className="text-[#FFFFFF80] flex items-center gap-[.625rem]">
                  <span>
                    {data?.nodeName || '-'}
                  </span>
                  <button >
                    <FiEdit className="text-white text-xs" />
                  </button>
                </div>
              </div>
              <div className="text-sm mt-1 flex font-semibold  gap-[.625rem]">
                <span>
                  Node ID:
                </span>
                <div className="text-[#FFFFFF80]">
                  {data?.nodeUUID || '-'}
                </div>
              </div>
              <div className="text-sm mt-1 flex font-semibold  gap-[.625rem]">
                <span>
                  Node Type:
                </span>
                <div className="text-[#FFFFFF80]">
                  {data?.nodeType || '-'}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex rounded-[1.25rem] w-full p-5   mb-6 bg-[#404040]">
          <div className="ml-4 flex flex-col gap-[1.5625rem]  justify-between w-full py-[.625rem] ">
            <div className="flex w-full justify-between">
              <span>Rewards</span>
              <Btn className="h-5">Go to Claim Page</Btn>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-semibold flex flex-col justify-between gap-[.625rem] ">
                <span className="font-normal text-sm text-[#FFFFFF80]">
                  Total
                </span>
                <div className="flex  gap-[10px] items-baseline">
                  <span className="font-semibold text-3xl ">
                    290
                  </span>
                  <span>
                    $BERRY
                  </span>
                </div>
              </div>
              <div className="text-sm font-semibold flex flex-col justify-between gap-[.625rem] ">
                <span className="font-normal text-sm text-[#FFFFFF80]">
                  Today
                </span>
                <div className="flex  gap-[10px] items-baseline">
                  <span className="font-semibold text-3xl ">
                    + 290
                  </span>
                  <span>
                    $BERRY
                  </span>
                </div>
              </div>
              <div className="text-sm font-semibold flex flex-col justify-between gap-[.625rem] ">
                <span className="font-normal text-sm text-[#FFFFFF80]">
                  Yesterday

                </span>
                <div className="flex  gap-[10px] items-baseline">
                  <span className="font-semibold text-3xl ">
                    +290
                  </span>
                  <span>
                    $BERRY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TitCard
        tit="Rewards History"
        className={cn("col-span-1 h-full   lg:col-span-2  gap-4",)}
        right={
          <div>
            <DateRangePicker pageBehavior="single" visibleMonths={2} />
          </div>
        }
      >
        <div className="w-full" style={{ height: '14.125rem' }} ref={ref}>

          <EChartsReact style={{ height: '14.125rem' }} className="w-full" option={chartOpt} />
        </div>
      </TitCard>

      <div className="flex justify-between w-full gap-5">

        <div className=" my-5 p-5 bg-[#404040] rounded-[1.25rem] w-full   ">
          <span className=" text-base font-semibold">
            Basics
          </span>
          <div className="flex flex-col gap-[10px] mt-5 text-sm">
            <div className="flex justify-between">
              <span >Create Date</span>
              <span className="text-[#FFFFFF80]">{nodeData.createDate}</span>
            </div>
            <div className="flex justify-between">
              <span >Device</span>
              <span className="text-[#FFFFFF80]">{nodeData.device}</span>
            </div>
            <div className="flex justify-between">
              <span >Region</span>
              <span className="text-[#FFFFFF80]">{nodeData.region}</span>
            </div>
          </div>
        </div>

        <div className="my-5 p-5 bg-[#404040] rounded-[1.25rem] w-full">
          <span className=" text-base font-semibold">
            Network Info
          </span>
          <div className="flex flex-col gap-[10px] mt-5 text-sm">

            <div className="flex justify-between">
              <span >外网 IP</span>
              <span className="text-[#FFFFFF80]">{nodeData.externalIp}</span>
            </div>
            <div className="flex justify-between">
              <span >IP归属</span>
              <span className="text-[#FFFFFF80]">{nodeData.ipRegion}</span>
            </div>
            <div className="flex justify-between">
              <span >内外 IP</span>
              <span className="text-[#FFFFFF80]">{nodeData.internalIp}</span>
            </div>
            <div className="flex justify-between">
              <span >MAC Address</span>
              <span className="text-[#FFFFFF80]">{nodeData.macAddress}</span>
            </div>
            <div className="flex justify-between">
              <span >NAT Type</span>
              <span className="text-[#FFFFFF80]">{nodeData.natType}</span>
            </div>
            <div className="flex justify-between">
              <span >UPNP</span>
              <span className="text-[#FFFFFF80]">{nodeData.upnp}</span>
            </div>
            <div className="flex justify-between">
              <span >Delay</span>
              <span className="text-[#FFFFFF80]">{nodeData.delay}</span>
            </div>
          </div>
        </div>


        <div className="my-5 p-5 bg-[#404040] rounded-[1.25rem] w-full">
          <span className=" text-base font-semibold">
            Device States
          </span>
          <div className="flex flex-col gap-[10px] mt-5 text-sm">
            <div className="flex justify-between">
              <span >CPU Cores</span>
              <span className="text-[#FFFFFF80]">{nodeData.cpuCores}</span>
            </div>
            <div className="flex justify-between">
              <span >CPU Usage</span>
              <span className="text-[#FFFFFF80]">{nodeData.cpuUsage}%</span>
            </div>
            <div className="flex justify-between">
              <span >RAM</span>
              <span className="text-[#FFFFFF80]">{nodeData.ramUsage}MB/{nodeData.totalRam}MB</span>
            </div>
            <div className="flex justify-between">
              <span >ROM</span>
              <span className="text-[#FFFFFF80]">{nodeData.romUsage}GB/{nodeData.totalRom}GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      :
      <div className="flex justify-center w-full items-center h-full">
        <CircularProgress label="Loading..." />
      </div>
    }
  </>

}
export default ANodeInfo