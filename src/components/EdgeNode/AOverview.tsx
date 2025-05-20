import { SVGS } from "@/svg"
import { IconCard, TitCard } from "../cards"
import { useAuthContext } from "@/app/context/AuthContext";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { cn } from "@nextui-org/react";
import { ReactNode, useMemo, useState } from "react";
import EChartsReact from "echarts-for-react";
import { useDebounce, useMeasure } from "react-use";
import { UseMeasureRef } from "react-use/lib/useMeasure";
import backendApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import _ from 'lodash'
import { fmtBerry } from "../fmtData";
import numbro from "numbro";
import { HelpTip } from "../tips";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import { FaGift } from "react-icons/fa6";
import { formatEchartsNumber, formatNumber } from "@/lib/utils";
const options = ["Total Rewards", "Network Rewards", "Referral Bonus"] as const;
type OptionType = (typeof options)[number];
export function DupleSplit({ className }: { className?: string }) {
  return <div className={cn("bg-white opacity-30 w-[1px] h-6 shrink-0", className)} />;
}

export function useDebounceMeasureWidth<T extends Element>() {
  const [dWidth, setWidth] = useState(0);
  const [ref, { width }] = useMeasure<T>();
  useDebounce(
    () => {
      setWidth(width);
    },
    300,
    [width]
  );
  return useMemo(() => [ref, dWidth] as [UseMeasureRef<T>, number], [ref, dWidth]);
}
export function DupleInfo({
  tit,
  sub,
  subTip,
  className,
  titClassName,
  subClassName,
}: {
  tit: ReactNode;
  sub: ReactNode;
  subTip?: string;
  titClassName?: string;
  subClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col justify-start items-start relative shrink-0", className)}>
      <p className={cn("self-stretchflex-shrink-0 text-2xl font-medium text-left text-white", titClassName)}>{tit}</p>
      <div className={cn("font-AlbertSans flex justify-start items-center flex-shrink-0 relative gap-1 text-sm   text-[#FFFFFF80]", subClassName)}>
        {sub}
        {subTip && <HelpTip content={subTip} />}
      </div>
    </div>
  );
}

const AOverview = () => {
  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();
  const r = useRouter()

  const ac = useAuthContext();
  const user = ac.queryUserInfo?.data;
  const connectedNodes = user?.node.connected || 0;
  const { data, isLoading } = useQuery({
    queryKey: ["TrendingChart"],
    enabled: true,
    queryFn: async () => {
      const [node, rewards, trending] = await Promise.all([backendApi.getCurrentEdgeNode(), backendApi.getCurrentEdgeNodeRewards(), backendApi.getCurrentEdgeNodeRewardsTrending()])
      return { node, rewards, trending }
    }
  });


  const chartOpt = useMemo(() => {
    if (!width) return {};
    const datas = data?.trending || []
    const xData = datas.map((item) => item.date);

    const yData = datas.map((item) => _.toNumber(item.total));
    console.log('xData', xData, yData);

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
          return `<div>${params[0].marker.replace('background-color:rgba(0,0,0,0)', 'background-color:#4281FF')}${formatEchartsNumber(params[0].data)}</div>`
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
            formatter: (d: any) => formatEchartsNumber(d.value),
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
  }, [width, data?.trending]);



  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full  mt-5">
        <IconCard
          className="flip_item bg-[#6D6D6D66]"
          icon={SVGS.SvgNodes}
          iconSize={24}
          tit={
            <div className="flex justify-between items-center w-full">
              <span className="text-xl smd:text-base font-Alexandria">My Nodes</span>
              <HelpTip content='Go to Nodes Detail'>
                <button className=" bg-[#4281FF]  hover:bg-default rounded-full flex items-center justify-center w-8 h-8 text-base" onClick={() => r.push('?mode=devnet&tab=nodes')}>
                  <GoArrowUpRight />
                </button>
              </HelpTip>

            </div>
          }
          content={
            <div className="flex flex-1 items-center gap-[15%]">
              <DupleInfo subClassName="smd:text-xs" tit={`${data?.node?.total ?? 0}`} sub="Total Nodes" />
              <DupleSplit />
              <DupleInfo
                tit={`${data?.node?.online ?? '0'}`}
                subClassName="smd:text-xs"
                sub={
                  <>
                    <div className="text-green-400  flex items-center gap-1"><IoIosCheckmarkCircle /> Online</div>
                  </>
                }
              />
            </div>
          }
        />
        <IconCard
          className="flip_item bg-[#6D6D6D66]"
          icon={() => <FaGift />}
          iconSize={24}
          tit={
            <div className="flex justify-between items-center w-full">
              <span className="text-xl smd:text-base font-Alexandria">Rewards - All Nodes</span>
            </div>
          }
          content={
            <div className="flex flex-1 items-center gap-[15%] min-w-[12.5rem]">
              <DupleInfo
                subClassName="smd:text-xs"
                tit={formatNumber(Number(data?.rewards.total || 0))}
                sub={
                  <>
                    Total
                  </>
                }
              />
              <DupleSplit />
              <DupleInfo subClassName="smd:text-xs" tit={`${formatNumber(data?.rewards?.today || 0)}`} sub="Today" />
            </div>
          }
        />
        <TitCard
          tit="Trending"
          className={cn("col-span-1 h-full bg-[#6D6D6D66]   lg:col-span-2  gap-4",)}
        >
          <div className="w-full" style={{ height: '14.125rem' }} ref={ref}>

            <EChartsReact style={{ height: '14.125rem' }} className="w-full" option={chartOpt} />
          </div>
        </TitCard>
      </div>
    </div>

  )

}

export default AOverview