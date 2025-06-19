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


  const showCount = Math.floor(width / 60);
  const endValue = xData.length - 1;
  const startValue = Math.max(0, endValue - showCount);

  const currentUnit: any = {
    '#FDB600': '%',
    '#4281FF': 'ms',
    '#34A853': '%',
  }
  const chartOpt = useMemo(() => {
    return {

      animation: true,
      animationDuration: 200,
      legend: {
        textStyle: { color: '#FFFFFF' }
      },

      tooltip: {
        trigger: "axis",

        formatter: (params: any,) => {
          return `<div>${params[0].marker.replace(
            "background-color:rgba(0,0,0,0)",
            "background-color:#00E42A",
            "display: flex",
            "flex-direction: column-reverse "

          )}
          ${parseFloat(formatNumber(params[0].data))}${currentUnit[params[0].color] || ''}  
          <div>
           ${params[0].axisValue} ( UTC0 Time )
          </div>

          </div>`;
        },
      },
      // dataset: {
      //   source: datasetSource
      // },
      xAxis: {
        type: 'category',
        data: xData,
        boundaryGap: [0, "10%"],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: '#FFFFFF80', fontSize: 10, interval: 0,
          formatter: (value: string) => dayjs(value).format('HH:00')
        },
        axisLine: { lineStyle: { color: '#FFFFFF0D' } }
      },
      yAxis: {
        type: "value",
        name,
        boundaryGap: [0, "20%"],
        splitLine: {
          lineStyle: { type: "solid", color: "#FFFFFF80", opacity: 0.05 }
        },
        axisLabel: {
          color: "rgba(255,255,255,0.5)",
          formatter: (value: number) => {

            return name === 'Volume(MB)' ? parseFloat(formatNumber(value)) : value
          }
          ,
        },
      },
      grid: {
        left: 40,
        right: 0,
        top: 30,
        bottom: 70,
        show: false,

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

  return <EChartsReact style={{ height: '12.5rem' }} className="!w-full  !h-[12.5rem]" option={chartOpt} />
};


export default AChart

