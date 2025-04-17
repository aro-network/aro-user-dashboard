import { cn } from "@nextui-org/react";
import EChartsReact from "echarts-for-react";
import { TitCard } from "../cards";
import { useDebounceMeasureWidth } from "./AOverview";
import { SVGS } from "@/svg";
import { useState } from "react";
import ACommonNodes from "./components/ACommonNodes";
import { allNodes } from "./ANodes";

const AStats = () => {
  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();
  const [currentProcess, setProcess] = useState(10);
  const [isShowNodeInfo, setShowNodeInfo] = useState(false);
  const [status, setStatus] = useState(true)
  const options = [
    { label: "Today", value: true },
    { label: "Yesterday", value: false },
  ];

  const dataset = {
    source: [
      ['product', '2015', '2016', '2017', '2018'],
      ['1:00', 43.3, 85.8, 93.7, 100],
      ['5:00', 83.1, 73.4, 55.1, 60],
      ['9:00', 86.4, 65.2, 82.5, 90],
      ['13:00', 72.4, 53.9, 39.1, 50],
      ['17:00', 23.4, 44.9, 12.1, 60],
      ['21:00', 10.4, 15.9, 20.1, 50],
      ['24:00', 5.4, 33.9, 59.1, 70],
    ]
  };

  const option = {
    legend: {},
    tooltip: {
    },
    dataset,
    xAxis: {
      type: 'category',
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } }
    },
    yAxis: {
      type: 'value',
      name: '时间（h）',
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10, top: 100 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } },
      splitLine: { lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.5 } },

    },
    title: {
      text: '2025-01-20 16:20:00 更新',
      left: 'right',
      top: 10,
      textStyle: { color: '#FFFFFF80', fontSize: 12 }
    },
    grid: {
      left: 50,
      right: 0,
      top: 40,
      bottom: 50
    },
    color: ['#FDB600'],
    series: [
      {
        type: 'bar',
        itemStyle: {
          borderRadius: 10,
          color: '#FDB600',
        },
        encode: { x: 0, y: 1 }
      },
      {
        type: 'bar',
        itemStyle: {
          borderRadius: 10,
          color: '#FDB600',
        },
        encode: { x: 0, y: 2 }
      },
      {
        type: 'bar',
        itemStyle: {
          borderRadius: 10,
          color: '#FDB600',
        },
        encode: { x: 0, y: 3 }
      },
      {
        type: 'bar',
        itemStyle: {
          borderRadius: 10,
          color: '#FDB600',
        },
        encode: { x: 0, y: 4 }
      },
    ],

  };

  const option2 = {
    grid: {
      left: 50,
      right: 0,
      top: 40,
      bottom: 50
    },
    title: {
      text: '建议低于2%',
      left: 'right',
      top: 10,
      textStyle: { color: '#FFFFFF80', fontSize: 12 }
    },

    xAxis: {
      type: 'category',
      data: ['0.5', '2:20', '4:35', '6:50', '9:5', '11:20', '13:35', '16:20'],
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } }
    },
    yAxis: {
      type: 'value',
      name: '丢包率（%）',
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } },
      splitLine: { lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.5 } },

    },

    series: [
      {
        data: [0.4, 0.8, 0.3, 0.1, 0.9, 0.5, 0.7, 1.1],
        type: 'line',
        lineStyle: {
          borderRadius: 10,
          color: '#4281FF'
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#4281FF'
        }
      }
    ]
  }
  const option3 = {
    xAxis: {
      type: 'category',
      data: ['0.5', '2:20', '4:35', '6:50', '9:5', '11:20', '13:35', '16:20'],
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } }
    },
    yAxis: {
      type: 'value',
      name: '时延(ms)',
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } },
      axisTick: { show: true },

      splitLine: { show: true, lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.5 } },

    },
    grid: {
      left: 50,
      right: 0,
      top: 40,
      bottom: 50
    },
    title: {
      text: '建议低于20ms',
      left: 'right',
      top: 10,
      textStyle: { color: '#FFFFFF80', fontSize: 10 }
    },

    series: [
      {
        data: [0.4, 0.8, 0.3, 0.1, 0.9, 0.5, 0.7, 1.1],
        type: 'line',
        lineStyle: {
          borderRadius: 10,
          color: '#34A853',
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#34A853'
        }
      }
    ]
  }
  const option4 = {
    xAxis: {
      type: 'category',
      data: ['0.5', '2:20', '4:35', '6:50', '9:5', '11:20', '13:35', '16:20'],
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } }
    },
    yAxis: {
      type: 'category',
      data: ['未知', '对称性', '端口型', 'IP型', '全锥型', '映射型', 'DNZ型', '公网型'],
      name: 'NAT类型',
      axisTick: { show: false },
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },

      splitLine: {
        show: true,
        lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.5 }
      },
    },



    grid: {
      left: 50,
      right: 0,
      top: 40,
      bottom: 50
    },
    title: {
      text: '建议全锥型及以上',
      left: 'right',
      top: 10,
      textStyle: { color: '#FFFFFF80', fontSize: 12 }
    },

    series: [
      {
        data: [0.4, 0.8, 0.3, 0.1, 0.9, 0.5, 0.7, 1.1],
        type: 'line',
        lineStyle: {
          borderRadius: 10,
          color: '#AC8EDC'
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#AC8EDC',

        }
      }
    ]
  }

  const value = status ? '今日' : '昨日'

  return (
    <>
      <div className=" flex justify-between mb-5 h-[2.125rem] items-center">
        <div className="text-[#FFFFFF] text-base font-medium w-full">
          {!isShowNodeInfo ? 'All Nodes' :
            <div className="flex justify-between w-full">
              <div>
                <button onClick={() => setShowNodeInfo(!isShowNodeInfo)}>Stats</button> {'>'} <label className="text-[#FFFFFF80]">Node Info</label>
              </div>
              <div className="flex justify-between gap-[.625rem]">
                {options.map(({ label, value }) => {
                  const isActive = status === value;
                  return (
                    <button
                      key={label}
                      onClick={() => setStatus(value)}
                      className={cn(
                        "text-white transition-colors",
                        isActive ? "text-[#4281FF]" : "text-[#FFFFFF80]"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          }
        </div>

      </div>
      {!isShowNodeInfo ? <ACommonNodes isLoading={false} data={[]} onOpenModal={() => setShowNodeInfo(!isShowNodeInfo)} /> :
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full pb-10  ">
          <TitCard
            tit={`${value}在线情况`}
            className={cn("w-full")}
            right={<div className="flex justify-between px-[1.875rem] items-center ">
              <label className=" font-normal text-xs text-[#FFFFFF80]">
                2025-01-20 16:20:00 更新
              </label>
            </div>}
          >
            <div className="w-full" style={{ height: '14.125rem' }} ref={ref}>
              <EChartsReact style={{ height: '14.125rem' }} className="w-full" option={option} />
            </div>
          </TitCard>
          <TitCard
            tit={`${value}线路平均丢包率`}
            className={cn("h-full  w-full  ")}
            right={<label className=" font-normal text-xs text-[#FFFFFF80]">
              2025-01-20 16:20:00 更新
            </label>}
          >
            <div className="w-full" style={{ height: '14.125rem' }} ref={ref}>

              <EChartsReact style={{ height: '14.125rem' }} className="w-full" option={option2} />
            </div>
          </TitCard>
          <TitCard
            tit={`${value}线路平均时延`}
            className={cn("h-full  w-full  ")}
            right={<label className=" font-normal text-xs text-[#FFFFFF80]">
              2025-01-20 16:20:00 更新
            </label>}
          >
            <div className="w-full" style={{ height: '14.125rem' }} ref={ref}>
              <EChartsReact style={{ height: '14.125rem' }} className="w-full" option={option3} />
            </div>
          </TitCard>
          <TitCard
            tit={`${value}管理线路NAT`}
            className={cn("h-full  w-full  ")}
            right={<label className=" font-normal text-xs text-[#FFFFFF80]">
              2025-01-20 16:20:00 更新
            </label>}
          >
            <div className="w-full" style={{ height: '14.125rem' }} ref={ref}>
              <EChartsReact style={{ height: '14.125rem' }} className="w-full" option={option4} />
            </div>
          </TitCard>
          <TitCard
            tit={`${value}磁盘状态`}
            className={cn("h-full  w-full  ")}
          >
            <div>
              <div className="flex justify-between items-center ">
                <SVGS.Svgdisk />
              </div>
              <div className="flex mt-5 justify-between items-center ">
                <label>
                  磁盘缓存
                </label>
                <label>
                  32.7G/108.5G
                </label>
              </div>
              <div>
                <div className="w-full h-[19px] mt-[.625rem] relative rounded-full overflow-hidden">
                  <div className="loader" />
                  <div className="left-0 top-0 h-full rounded-full absolute bg-primary" style={{ transition: "all ease 1s", width: `${currentProcess}%` }}></div>
                </div>
              </div>
            </div>
          </TitCard>
        </div>
      }
    </>
  );
};

export default AStats;
