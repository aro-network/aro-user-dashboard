import { cn, Select } from "@nextui-org/react";
import { TitCard } from "../cards";
import EChartsReact from "echarts-for-react";
import { useDebounceMeasureWidth } from "./AOverview";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import backendApi from "@/lib/api";
import { fmtDate } from "@/lib/utils";
import { OptionType } from "dayjs";
import { fmtBerry } from "../fmtData";
import numbro from "numbro";
import { Btn } from "../btns";
import ACommonNodes, { nodeType } from "./components/ACommonNodes";
import { allNodes } from "./ANodes";
import { SVGS } from "@/svg";
import _ from 'lodash'
import { useRouter } from "next/navigation";

const options = ["Total Rewards", "Network Rewards", "Referral Bonus"] as const;

const allRewards = [
  { date: '2024-12-01', reward: '4.5' },
  { date: '2024-11-30', reward: '3.5' },
  { date: '2024-11-29', reward: '5.5' },
  { date: '2024-11-28', reward: '7.5' },

]

const AReawars = () => {
  const r = useRouter()
  const [rewardType, setRewardType] = useState<OptionType>(options[0]);
  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();
  const { data: trendingRewards, isLoading } = useQuery({
    queryKey: ["TrendingChart"],
    queryFn: () => backendApi.trendingRewards(),
  });
  const [isShowNodeInfo, setNodeInfo] = useState<nodeType[] | null>(
    null
  );


  const chartOpt = useMemo(() => {
    if (!width) return {};
    const datas = trendingRewards || [];
    const xData = datas.map((item) => fmtDate(item.date * 1000, "MMMD"));
    const yData = datas.map((item) => _.toNumber(rewardType === "Total Rewards" ? item.totalPoint : rewardType === "Network Rewards" ? item.networkPoint : item.referralPoint));
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
  }, [width, trendingRewards, rewardType]);

  const NodeDetails = () => {
    return <div className=" flex justify-center m-auto flex-col items-center gap-5">
      <div className={'w-[24.875rem]'}
      >
        <div className="bg-[#6D6D6D66] rounded-[1.25rem] flex items-center gap-[1.0625rem] px-4 py-5 w-full">
          <div className="  w-full flex justify-between gap-5">
            <div className="w-[40%]">
              <SVGS.SvgDevice />
            </div>
            <div className="flex flex-col gap-14 py-[10px] w-[60%]  text-sm  ">
              <div className="flex items-center justify-between  ">
                <label className="text-[#FFFFFF] font-semibold">Total </label>
                <div className="flex items-center gap-1">
                  <label className="text-[#4281FF] ">+290</label>
                  <label >$REACH</label>
                </div>
              </div>
              <div className="w-full flex gap-1 text-sm items-center flex-col ">
                <div className="flex justify-between w-full">
                  <div className="text-[#FFFFFF80]">
                    Today
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="text-[#4281FF] ">+290</label>
                    <label >$REACH</label>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-[#FFFFFF80]">
                    Yesterday
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="text-[#4281FF] ">+290</label>
                    <label >$REACH</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TitCard
        tit="Rewards History"
        className={cn("w-[24.875rem]")}
        right={
          <label className="text-sm text-[#FFFFFF80]">
            Node ID: KMDGGHTOS
          </label>
        }
      >
        <div className="flex justify-between text-sm ">
          <label>Date</label>
          <label>Rewards ($REACH)</label>
        </div>
        <div className="flex flex-col gap-[.625rem]">
          {allRewards.map((item, id) => {
            return <div className="bg-[#FFFFFF14] rounded-lg  py-[1.125rem] px-5 flex justify-between text-xs">
              <label>
                {item.date}
              </label>
              <label>
                {item.reward}
              </label>
            </div>
          })}
        </div>
      </TitCard>
    </div>
  }

  return (
    <div>
      <div className=" flex justify-between mb-5 h-[2.125rem] items-center">
        <div className="text-[#FFFFFF] text-xs font-medium w-full">
          <div className="flex justify-between w-full items-center">
            <div>
              {Array.isArray(isShowNodeInfo) ?
                <><button onClick={() => setNodeInfo(null)}>Rewards</button> {'>'} <label className="text-[#FFFFFF80]">Node Details</label></>
                : <label>Trending - Rewards(All Nodes)</label>
              }

            </div>
            {!Array.isArray(isShowNodeInfo) && <Btn onClick={() => r.push('?mode=enreachId&tab=funds')} className="h-[2.125rem]"  >Go to Claim Page</Btn>}
          </div>
        </div>

      </div>
      {!Array.isArray(isShowNodeInfo) ?
        <>
          <TitCard
            tit="Trending"
            className={cn("col-span-1 h-full   lg:col-span-2  gap-4")}
          >
            <div className="w-full" style={{ height: '14.125rem' }} ref={ref}>
              <EChartsReact style={{ height: '14.125rem' }} className="w-full" option={chartOpt} />
            </div>
          </TitCard>
          <div className=" mb-5">
            <div className="my-5 text-xs font-medium">All Nodes</div>
            <div>
              <ACommonNodes data={allNodes} onOpenModal={(data) => { setNodeInfo([data]); }} />
            </div>
          </div>
        </>
        : <NodeDetails />
      }
    </div>
  )

}

export default AReawars