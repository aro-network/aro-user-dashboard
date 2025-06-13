import { cn } from "@nextui-org/react";
import EChartsReact from "echarts-for-react";
import { TitCard } from "../cards";
import { useDebounceMeasureWidth } from "./AOverview";
import { SVGS } from "@/svg";
import { useState } from "react";
import ACommonNodes from "./components/ACommonNodes";
import { useQuery } from "@tanstack/react-query";
import backendApi from "@/lib/api";
import useMobileDetect from "@/hooks/useMobileDetect";

const AStats = () => {
  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();
  const [currentProcess, setProcess] = useState(10);
  const [isShowNodeInfo, setShowNodeInfo] = useState(false);
  const [status, setStatus] = useState(true)
  const isMobile = useMobileDetect(1100)

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
      name: 'Uptime(0%)',
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10, top: 100 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } },
      splitLine: { lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.05 } },

    },

    grid: {
      left: 30,
      right: 0,
      top: 30,
      bottom: 50
    },
    color: ['#FDB600'],
    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        type: 'line',
        lineStyle: {
          borderRadius: 10,
          color: '#FDB600',
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#34A853'
        }
      }
    ]
    // series: [
    //   {
    //     type: 'bar',
    //     itemStyle: {
    //       borderRadius: 10,
    //       // color: '#FDB600',
    //     },
    //     encode: { x: 0, y: 1 }
    //   },
    //   {
    //     type: 'bar',
    //     itemStyle: {
    //       borderRadius: 10,
    //       color: '#FDB600',
    //     },
    //     encode: { x: 0, y: 0 }
    //   },
    //   {
    //     type: 'bar',
    //     itemStyle: {
    //       borderRadius: 10,
    //       color: '#FDB600',
    //     },
    //     encode: { x: 0, y: 0 }
    //   },
    //   {
    //     type: 'bar',
    //     itemStyle: {
    //       borderRadius: 10,
    //       color: '#FDB600',
    //     },
    //     encode: { x: 0, y: 0 }
    //   },
    // ],

  };

  const option2 = {
    grid: {
      left: 30,
      right: 0,
      top: 30,
      bottom: 50
    },
    // title: {
    //   text: '建议低于2%',
    //   left: 'right',
    //   top: 10,
    //   textStyle: { color: '#FFFFFF80', fontSize: 12 }
    // },

    xAxis: {
      type: 'category',
      data: ['0.5', '2:20', '4:35', '6:50', '9:5', '11:20', '13:35', '16:20'],
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } }
    },
    yAxis: {
      type: 'value',
      name: 'Delay(0ms)',
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } },
      splitLine: { lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.05 } },

    },

    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0],
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
      name: 'Loss(0%)',
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } },
      axisTick: { show: true },

      splitLine: { show: true, lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.05 } },

    },
    grid: {
      left: 30,
      right: 0,
      top: 30,
      bottom: 50
    },
    // title: {
    //   text: '建议低于20ms',
    //   left: 'right',
    //   top: 10,
    //   textStyle: { color: '#FFFFFF80', fontSize: 10 }
    // },

    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0],
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
      type: 'value',
      name: ' Volume(0MB) ',
      nameTextStyle: { color: '#FFFFFF80', fontSize: 10, top: 100 },
      axisLabel: { color: '#FFFFFF80', fontSize: 10 },
      axisLine: { lineStyle: { color: '#FFFFFF0D' } },
      splitLine: { lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.05 } },

    },

    grid: {
      left: 30,
      right: 0,
      top: 30,
      bottom: 50
    },
    // title: {
    //   text: '建议全锥型及以上',
    //   left: 'right',
    //   top: 10,
    //   textStyle: { color: '#FFFFFF80', fontSize: 12 }
    // },

    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0],

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


  const { data, isFetching, refetch } = useQuery({
    queryKey: ["NodeList"],
    enabled: true,
    queryFn: async ({ pageParam: pageNum }) => {
      const pageSize = 10
      const pageParams = { pageSize, pageNum }
      const data = await backendApi.getNodeList()
      const list = data.map((item) => {
        return {
          deviceName: item.nodeName,
          icon: <img src={`./${item.nodeType}.png`} alt={`${item.nodeType}`} style={{ height: '100%', width: '100%' }} />,
          nodeUUID: item.nodeUUID,
          when: 'Today',
          experience: <><label className="text-[#4281FF] text-2xl font-semibold leading-6">{item.rewards}</label><label>$Jades</label></>,
          status: item.online,
          nodeId: item.nodeId
        }
      })
      return list
    }
  });

  return (
    <>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-5 ">
        <TitCard
          contentClassName="flex flex-col  !items-start"
          tit={'24H Uptime'}
          className={cn("h-[15rem]  w-full text-xs !rounded-xl rewardsTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab")}
        // right={<label className={` font-normal text-xs mt-1 flex justify-center flex-wrap w-full text-[#FFFFFF80]`}>
        //   2025-01-20 16:20:00 Updated
        // </label>}

        >
          <div className="!w-full " style={{ height: '10rem' }} ref={ref}>
            <EChartsReact style={{ height: '10rem' }} className="!w-full  !h-[12.5rem]" option={option} />
          </div>
        </TitCard>

        <TitCard
          contentClassName="flex flex-col !items-start"
          tit={'24H Upload Volume'}
          className={cn("h-[15rem]  w-full text-xs !rounded-xl rewardsTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab")}
        // right={<label className={` font-normal text-xs mt-1 flex justify-center flex-wrap w-full text-[#FFFFFF80]`}>
        //   2025-01-20 16:20:00 Updated
        // </label>}
        >
          <div className="w-full" style={{ height: '10rem' }} ref={ref}>
            <EChartsReact style={{ height: '10rem' }} className="w-full  !h-[12.5rem]" option={option4} />
          </div>
        </TitCard>

        <TitCard
          contentClassName="flex flex-col !items-start"
          tit={'24H Package Loss'}
          className={cn("h-[15rem]  w-full text-xs  !rounded-xl rewardsTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab")}
        // right={<label className={` font-normal text-xs mt-1 flex justify-center flex-wrap w-full text-[#FFFFFF80]`}>
        //   2025-01-20 16:20:00 Updated
        // </label>}
        >
          <div className="w-full" style={{ height: '10rem' }} ref={ref}>

            <EChartsReact style={{ height: '10rem' }} className="w-full  !h-[12.5rem]" option={option2} />
          </div>
        </TitCard>

        <TitCard
          contentClassName="flex flex-col !items-start"
          tit={'24H Average Delay'}
          className={cn("h-[15rem]  w-full text-xs !rounded-xl rewardsTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab ")}
        // right={<label className={` font-normal text-xs mt-1 flex justify-center flex-wrap w-full text-[#FFFFFF80]`}>
        //   2025-01-20 16:20:00 Updated
        // </label>}
        >
          <div className="w-full" style={{ height: '10rem' }} ref={ref}>
            <EChartsReact style={{ height: '10rem' }} className="w-full  !h-[12.5rem]" option={option3} />
          </div>
        </TitCard>


      </div>
    </>
  );
};

export default AStats;
