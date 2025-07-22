import React, { useMemo } from "react";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import dayjs from "dayjs";

const AChart = ({ groupedData = [], color, name, width, filed = 'total' }: { groupedData: any[], filed?: string, color: string, name: string, width: number }) => {

  const data = groupedData

  const xData = data.map((item: { hour: string }) => {
    const parsed = dayjs(item.hour, "YYYY-MM-DD HH:mm", true);
    return parsed.format("MMM D HH:mm")
  });



  const yData = data.map((item) => item[filed]
  );
  const showCount = Math.floor(width / 60);
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

        formatter: (params: any,) => {
          return `<div>${params[0].marker.replace(
            "background-color:rgba(0,0,0,0)",
            "background-color:#00E42A",
            "display: flex",
            "flex-direction: column-reverse "

          )}
          
          
          ${params[0].data}
          <div>
           ${dayjs(params[0].axisValue).format("MMM") + dayjs(params[0].axisValue).format("D")} ( UTC0 Time )
          </div>

          </div>`;
        },
        confine: true,
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
          formatter: (value: number) => value
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



  return !data.length ? <div className="w-full h-full flex justify-center items-center"> No data yet. Please check back later.</div> : <EChartsReact style={{ height: '12.5rem' }} className="!w-full  !h-[12.5rem]" option={chartOpt} />
};


export default AChart

