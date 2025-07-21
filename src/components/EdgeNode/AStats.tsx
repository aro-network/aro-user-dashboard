import { cn } from "@nextui-org/react";
import { TitCard } from "../cards";
import { useDebounceMeasureWidth } from "./AOverview";
import { FC, useMemo } from "react";
import AChart from "./components/AChart";
import { formatNumber, groupByHour, groupPackageByHour, groupPackageOrDelayByHour, groupVolumeByHourInMB } from "@/lib/utils";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import numbro from "numbro";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { HelpTip } from "../tips";

const AStats: FC<{ detailInfo: any }> = ({ detailInfo = [] }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const chooseType = params.get("nodeType") || '';
  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();

  const upTime = groupByHour(detailInfo?.upTime?.list, 'timestamp', 'uptimeCount') || []
  const upLoadVol = groupVolumeByHourInMB(detailInfo?.upVolume?.list) || []
  const packageLoss = groupPackageByHour(detailInfo?.upPackageLoss?.list) || []
  const mock = () => {
    return packageLoss?.map((item) => {
      return { ...item, averageDelay: 0 }
    })
  }
  const averageDelay = !detailInfo?.upAverageDelay?.list?.length ? mock() : groupPackageOrDelayByHour(detailInfo?.upAverageDelay?.list) || []


  const formatTime = (timestamp: number | undefined) =>
    dayjs(Number(timestamp || 0) * 1000).format("YYYY-MM-DD HH:mm:ss");



  const chartList = [
    {
      tit: '24H Uptime',
      rightTit: <>{formatTime(detailInfo.upTime?.lastUpdateTimestamp)} Updated</>,
      chart: (
        <div className="!w-full" style={{ height: '9rem' }} ref={ref}>
          <AChart groupedData={upTime} color="#FDB600" name="Uptime(H)" width={width} />
        </div>
      )
    },
    {
      tit: '24H Upload Volume',
      rightTit: <>{formatTime(detailInfo.upVolume?.lastUpdateTimestamp)} Updated</>,
      chart: (
        <div className="!w-full" style={{ height: '9rem' }} ref={ref}>
          <AChart groupedData={upLoadVol} color="#AC8EDC" name="Volume(MB)" width={width} filed="totalVolumeMB" />
        </div>
      )
    },
    {
      tit: '24H Package Loss',
      rightTit: <>{formatTime(detailInfo.upPackageLoss?.lastUpdateTimestamp)} Updated</>,
      chart: (
        <div className="!w-full" style={{ height: '9rem' }} ref={ref}>
          <AChart groupedData={packageLoss} color="#4281FF" name="Loss(%)" width={width} filed="averagePackageLostPercent" />
        </div>
      )
    },
    {
      tit: '24H Average Delay',
      rightTit: <>{formatTime(detailInfo.upAverageDelay?.lastUpdateTimestamp)} Updated</>,
      chart: (
        <div className="!w-full" style={{ height: '9rem' }} ref={ref}>
          <AChart groupedData={averageDelay} color="#34A853" name="Delay(MS)" width={width} filed="averageDelay" />
        </div>
      )
    },
  ];




  const chartNQOpt = useMemo(() => {
    if (chooseType !== 'lite_node') return {};
    const datas = detailInfo.getExtensionNetworkQuality || [];

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
          return `<div>${params[0].marker.replace(
            "background-color:rgba(0,0,0,0)",
            "background-color:#00E42A"
          )}
            ${formatNumber(params[0].data)}
            <div>
            ${params[0].axisValue} ( UTC0 Time )
            </div>
  
            </div>`;
        },
      },
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
          color: "rgba(255,255,255,0.5)",
          formatter: (value: number) => numbro(value)
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
  }, [width, chooseType, detailInfo]);

  const extensionUpTimeChartOpt = useMemo(() => {
    if (chooseType !== 'lite_node') return {};
    const datas = detailInfo.getExtensionUptime || [];

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
          return `<div>${params[0].marker.replace(
            "background-color:rgba(0,0,0,0)",
            "background-color:#00E42A"
          )}
            ${formatNumber(params[0].data)}
            <div>
            ${params[0].axisValue} ( UTC0 Time )
            </div>
  
            </div>`;
        },
      },
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
          color: "rgba(255,255,255,0.5)",
          formatter: (value: number) => numbro(value)
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
  }, [width, chooseType, detailInfo]);


  //  {
  //     tit: '24H Uptime',
  //     rightTit: <>{formatTime(detailInfo.upTime?.lastUpdateTimestamp)} Updated</>,
  //     chart: (
  //       <div className="!w-full" style={{ height: '9rem' }} ref={ref}>
  //         <AChart groupedData={upTime} color="#FDB600" name="Uptime(H)" width={width} />
  //       </div>
  //     )
  //   },

  const extensionChartList = [
    {
      tit: 'Uptime',
      rightTit: '',
      chart: <div className="!w-full " style={{ height: '9rem' }} ref={ref}>

        {!detailInfo.getExtensionUptime?.length ? <div className="w-full h-full flex justify-center items-center"> No data yet. Please check back later.</div> : <EChartsReact
          className="w-full  !h-[12.5rem] smd:!h-[11.875rem] "
          option={extensionUpTimeChartOpt}
        />}

      </div>
    },
    {
      tit: <div className="flex gap-2.5">Network Quality <HelpTip content={<span>The Network Quality Score represents an overall<br /> measure of the user's network performance, <br />based on uptime, latency, and packet loss rate.</span>} /></div>,
      rightTit: '',
      chart: <div className="!w-full " style={{ height: '9rem' }} ref={ref}>

        {!detailInfo.getExtensionNetworkQuality?.length ? <div className="w-full h-full flex justify-center items-center"> No data yet. Please check back later.</div> :
          <EChartsReact
            className="w-full  !h-[12.5rem] smd:!h-[11.875rem] "

            option={chartNQOpt}
          />
        }
      </div>
    },

  ]


  return (
    <>

      <div className="grid grid-cols-1  lg:grid-cols-2  gap-5 py-5 ">
        {(chooseType === 'lite_node' ? extensionChartList : chartList).map((item, i) => {
          return <TitCard key={`chart_${i}`}
            contentClassName="flex flex-wrap !items-start"
            tit={item.tit}
            titClassName="text-sm"
            className={cn("h-[15rem]  w-full text-xs !rounded-xl commonTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab")}
            right={<label className={` font-normal smd:w-full smd:text-center smd:mt-2 text-xs mt-1 text-[#FFFFFF80]`}>
              {item.rightTit}
            </label>}
          >
            {item.chart}
          </TitCard>
        })
        }
      </div>
    </>
  );
};

export default AStats;
