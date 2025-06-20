import { cn } from "@nextui-org/react";
import { TitCard } from "../cards";
import { useDebounceMeasureWidth } from "./AOverview";
import { FC, useState } from "react";
import AChart from "./components/AChart";
import { groupByHour } from "@/lib/utils";
import dayjs from "dayjs";

const AStats: FC<{ detailInfo: any }> = ({ detailInfo }) => {
  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();

  const upTime = groupByHour(detailInfo?.upTime?.list,
    'timestamp',
    'uptimeCount',
  )
  const upLoadVol = groupByHour(detailInfo?.upVolume?.list, 'timestamp',
    'volume'
  )

  const packageLoss = groupByHour(detailInfo?.upPackageLoss?.list, 'timestamp',
    'packageLostPercent')

  const mock = () => {
    return packageLoss.map((item) => {
      return { ...item, total: 0 }
    })
  }

  const averageDelay = !detailInfo?.upAverageDelay?.list.length ? mock() : groupByHour(detailInfo?.upAverageDelay?.list, 'timestamp', 'averageDelay') || []


  const chartCardList = [
    {
      tit: '24H Uptime',
      rightTit: <>{dayjs(Number(detailInfo.upTime.lastUpdateTimestamp || 0) * 1000).format("YYYY-MM-DD HH:mm:ss")} Updated</>,
      chart: <div className="!w-full " style={{ height: '9rem' }} ref={ref}>
        <AChart groupedData={upTime} color={'#FDB600'} name={'Uptime(%)'} width={width} />
      </div>
    },
    {
      tit: '24H Upload Volume',
      rightTit: <>{dayjs(Number(detailInfo.upVolume.lastUpdateTimestamp || 0) * 1000).format("YYYY-MM-DD HH:mm:ss")} Updated</>,
      chart: <div className="!w-full " style={{ height: '9rem' }} ref={ref}>
        <AChart groupedData={upLoadVol} color={'#AC8EDC'} name="Volume(MB)" width={width} />
      </div>
    },
    {
      tit: '24H Package Loss',
      rightTit: <>{dayjs(Number(detailInfo.upPackageLoss.lastUpdateTimestamp || 0) * 1000).format("YYYY-MM-DD HH:mm:ss")} Updated</>,
      chart: <div className="!w-full " style={{ height: '9rem' }} ref={ref}>
        <AChart groupedData={packageLoss} color={'#4281FF'} name="Loss(%)" width={width} />
      </div>
    },
    {
      tit: '24H Average Delay',
      rightTit: <>{dayjs(Number(detailInfo.upAverageDelay.lastUpdateTimestamp || 0) * 1000).format("YYYY-MM-DD HH:mm:ss")} Updated</>,
      chart: <div className="!w-full " style={{ height: '9rem' }} ref={ref}>
        <AChart groupedData={averageDelay} color={'#34A853'} name="Delay(ms)" width={width} />
      </div>
    },
  ]



  return (
    <>

      <div className="grid grid-cols-1  lg:grid-cols-2  gap-5 py-5 ">
        {chartCardList.map((item) => {
          return <TitCard
            contentClassName="flex flex-wrap !items-start"
            tit={item.tit}
            titClassName="text-sm"
            className={cn("h-[15rem]  w-full text-xs !rounded-xl commonTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab")}
            right={<label className={` font-normal text-xs mt-1 text-[#FFFFFF80]`}>
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
