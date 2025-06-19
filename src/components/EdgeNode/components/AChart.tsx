import React, { useMemo } from "react";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import numbro from "numbro";
import { formatNumber } from "@/lib/utils";
import dayjs from "dayjs";

const AChart = ({ groupedData = [], color, name, width }: { groupedData: any[], color: string, name: string, width: number }) => {

  const data = groupedData


  const xData = data.map((item: { hour: string }) =>
    dayjs(item.hour).format('MM-DD HH:00')
  );
  const yData = data.map((item: { total: number }) =>
    _.toNumber(item.total)
  );




  const showCount = Math.floor(width / 90);
  const endValue = xData.length - 1;
  const startValue = Math.max(0, endValue - showCount);

  const chartOpt = useMemo(() => {
    return {

      animation: true,
      animationDuration: 200,
      legend: {
        textStyle: { color: '#FFFFFF' }
      },

      tooltip: {
        trigger: "axis",

        formatter: (params: any) => {
          // console.info("params:", params)
          // <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(0,0,0,0);"></span>
          return `<div>${params[0].marker.replace(
            "background-color:rgba(0,0,0,0)",
            "background-color:#00E42A"
          )}${formatNumber(params[0].data)}</div>`;
        },
      },
      // dataset: {
      //   source: datasetSource
      // },
      xAxis: {
        type: 'category',
        data: xData,
        axisLabel: { color: '#FFFFFF80', fontSize: 10, interval: 0, },
        axisLine: { lineStyle: { color: '#FFFFFF0D' } }
      },

      yAxis: {
        type: "value",
        name,
        boundaryGap: [0, "10%"],
        splitLine: {
          lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.05 }
        },
        axisLabel: {
          color: "rgba(255,255,255,0.5)", formatter: (value: number) => numbro(value)
            .format({
              mantissa: 2,
              trimMantissa: true,
              average: value >= 1000,
            })
            .toUpperCase(),
        },
      },
      grid: {
        left: 40,
        right: 0,
        top: 30,
        bottom: 70,
        show: false

      },
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
      series: [
        {
          data: yData,
          type: "line",
          lineStyle: {
            borderRadius: 10,
            color
          },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color

          },

          barWidth: 30,
          barMinWidth: 30,
          barCategoryGap: 30,
          // areaStyle: {}


          // label: {
          //   show: true,
          //   formatter: (d: any) => (d.value),
          //   position: "top",
          //   color: "rgba(255,255,255,0.5)",
          // },
        },
      ],
    }
  }, [width, groupedData]);

  return <EChartsReact style={{ height: '10rem' }} className="!w-full  !h-[12.5rem]" option={chartOpt} />
};


export default AChart

