import { cn } from "@nextui-org/react";
import { TitCard } from "../cards";
import { useDebounceMeasureWidth } from "./AOverview";
import { FC, useState } from "react";
import AChart from "./components/AChart";
import { covertCurrentUpTime } from "@/lib/utils";
import dayjs from "dayjs";

const AStats: FC<{ detailInfo: any }> = ({ detailInfo }) => {
  const [ref, width] = useDebounceMeasureWidth<HTMLDivElement>();





  const upTime = covertCurrentUpTime(detailInfo?.upTime?.list,
    'timestamp',
    'uptimeCount',
  )
  const upLoadVol = covertCurrentUpTime(detailInfo?.upVolume?.list, 'timestamp',
    'volume'
  )

  const packageLoss = covertCurrentUpTime(detailInfo?.upPackageLoss?.list, 'timestamp',
    'packageLostPercent')

  const averageDelay = covertCurrentUpTime(detailInfo?.upAverageDelay?.list, 'timestamp', 'averageDelay')

  console.log('asdasdasdas', upTime, upLoadVol, packageLoss, averageDelay);



  return (
    <>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-5 ">
        <TitCard
          contentClassName="flex flex-col  !items-start"
          tit={'24H Uptime'}
          titClassName="text-sm"
          className={cn("h-[15rem]  w-full text-xs !rounded-xl commonTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab")}
          right={<label className={` font-normal text-xs mt-1 flex justify-center flex-wrap w-full text-[#FFFFFF80]`}>
            {dayjs(Number(detailInfo.upTime.lastUpdateTimestamp || 0) * 1000).format("YYYY-MM-DD HH:mm:ss")} Updated
          </label>}

        >
          <div className="!w-full " style={{ height: '9rem' }} ref={ref}>
            <AChart groupedData={upTime} color={'#FDB600'} name={'Uptime(%)'} width={width} />
          </div>
        </TitCard>

        <TitCard
          contentClassName="flex flex-col !items-start"
          tit={'24H Upload Volume'}
          titClassName="text-sm"
          className={cn("h-[15rem]  w-full text-xs !rounded-xl commonTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab")}
          right={<label className={` font-normal text-xs mt-1 flex justify-center flex-wrap w-full text-[#FFFFFF80]`}>
            {dayjs(Number(detailInfo.upVolume.lastUpdateTimestamp || 0) * 1000).format("YYYY-MM-DD HH:mm:ss")} Updated
          </label>}
        >
          <div className="w-full" style={{ height: '10rem' }} ref={ref}>
            {/* <EChartsReact style={{ height: '10rem' }} className="w-full  !h-[12.5rem]" option={option4} /> */}
            <AChart groupedData={upLoadVol} color={'#AC8EDC'} name="Volume(MB)" width={width} />
          </div>
        </TitCard>

        <TitCard
          contentClassName="flex flex-col !items-start"
          tit={'24H Package Loss'}
          titClassName="text-sm"
          className={cn("h-[15rem]  w-full text-xs  !rounded-xl commonTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab")}
          right={<label className={` font-normal text-xs mt-1 flex justify-center flex-wrap w-full text-[#FFFFFF80]`}>
            {dayjs(Number(detailInfo.upPackageLoss.lastUpdateTimestamp || 0) * 1000).format("YYYY-MM-DD HH:mm:ss")} Updated

          </label>}
        >
          <div className="w-full" style={{ height: '10rem' }} ref={ref}>

            {/* <EChartsReact style={{ height: '10rem' }} className="w-full  !h-[12.5rem]" option={option2} /> */}
            <AChart groupedData={packageLoss} color={'#4281FF'} name="Delay(ms)" width={width} />

          </div>
        </TitCard>

        <TitCard
          contentClassName="flex flex-col !items-start"
          tit={'24H Average Delay'}
          titClassName="text-sm"
          className={cn("h-[15rem]  w-full text-xs !rounded-xl commonTab  !gap-[.625rem] !bg-[#6D6D6D66] newTab ")}
          right={<label className={` font-normal text-xs mt-1 flex justify-center flex-wrap w-full text-[#FFFFFF80]`}>
            {dayjs(Number(detailInfo.upAverageDelay.lastUpdateTimestamp || 0) * 1000).format("YYYY-MM-DD HH:mm:ss")} Updated

          </label>}
        >
          <div className="w-full" style={{ height: '10rem' }} ref={ref}>
            {/* <EChartsReact style={{ height: '10rem' }} className="w-full  !h-[12.5rem]" option={option3} /> */}
            <AChart groupedData={averageDelay} color={'#34A853'} name="Loss(%)" width={width} />

          </div>
        </TitCard>


      </div>
    </>
  );
};

export default AStats;
