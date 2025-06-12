import { Btn } from "@/components/btns"
import { ConfirmDialog } from "@/components/dialogimpls"
import backendApi from "@/lib/api"
import { covertText } from "@/lib/utils"
import { CircularProgress, cn, Image, Skeleton, } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { FC, ReactNode, useEffect, useState } from "react"
import { foundDeviceList } from "./AAddNewNodes"
import useMobileDetect from "@/hooks/useMobileDetect"
import { useSearchParams } from "next/navigation"
import { AllText } from "@/lib/allText"


const DeviceStep = ({ stepIndex, deviceStep }: { stepIndex: number, deviceStep: { content: ReactNode }[] }) => {
  return <div>{deviceStep[stepIndex].content}</div>
}
const AUnbind: FC<{ nodeId: string, onBack: () => void }> = ({ nodeId, onBack }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [isConfirm, setIsConfirm] = useState(false)
  const isMobile = useMobileDetect()
  const searchParams = useSearchParams();
  const [isFetching, setIsFetching] = useState(true)
  const [delDetail, setDelDetail] = useState<Nodes.DevicesInfo>()

  const params = new URLSearchParams(searchParams.toString());
  const nId = params.get("nId") || ''


  const currentStatus = async () => {
    const res = await backendApi.getDeviceStatusInfo(nId)
    setDelDetail(res)
    setIsFetching(false)

  }

  const getStatus = useQuery({
    queryKey: ["NodeStatuList"],
    enabled: false,
    queryFn: () => backendApi.unbingDevice(nId)
  });


  const isUserOwner = async () => {
    const isOwner = await backendApi.currentOwner(nId)

    if (isOwner?.owner === false) {
      onBack();
    } else {
      currentStatus()
    }
  }


  useEffect(() => {
    isUserOwner()
  }, [])

  const onUnbindingConfig = async () => {
    setIsConfirm(!isConfirm)
    await getStatus.refetch()
    params.delete('')

    onDeviceStep()
  }

  const onDeviceStep = () => {
    if (stepIndex < unbind.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      onBack()
    }

  }



  const unbind = [
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] smd:w-full">
            <div className=" py-5 my-5 pl-5 smd:pr-5 bg-[#6D6D6D66] smd:flex-col  w-full flex gap-4 smd:gap-5 rounded-[1.25rem]">
              <div className="w-[45%] smd:w-full smd:h-[12.5rem] ">
                <img src={`./${delDetail?.nodeType}.png`} className=" object-contain rounded-lg bg-white  w-full h-full" alt={`${delDetail?.nodeType}`} />
              </div>
              {foundDeviceList(delDetail, isMobile)}
            </div>
            <div className="text-[#FFFFFF80] text-sm mt-[.625rem] smd:mt-5  text-center">
              {AllText.deviceInfo["Please confirm you want to delete this device. This action cannot be undone."]}
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn isLoading={getStatus.isFetching} onPress={() => setIsConfirm(true)} className="w-full rounded-lg smd:h-12 " >
                Confirm Delete
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] smd:w-full mt-[4.5625rem]  flex flex-col gap-5 ">
            <div className="flex w-full justify-center font-normal text-lg leading-5">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              Your Edge Node (Device Type:  <span className=" capitalize">{covertText(delDetail?.nodeType as "box" | "x86" | "Box")})</span> was deleted successfully.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-full rounded-lg smd:h-12" onPress={onDeviceStep} >
                OK
              </Btn>
            </div>
          </div>
        </div >,
    }
  ]

  return <div className=" pt-[73px]">
    {isFetching ? <div className="flex justify-center w-full pt-[4.5625rem] items-center h-full">
      <CircularProgress label="Loading..." />
    </div> :
      <DeviceStep stepIndex={stepIndex} deviceStep={unbind} />
    }
    <ConfirmDialog
      tit="Delete this device"
      msg={
        <>
          {AllText.deviceInfo["Are you sure you want to delete this Edge Node?"]}
        </>
      }
      className="smd:mx-5"
      confirmText={'Yes'}
      confirmColor='primary'
      cancelColor="default"
      isOpen={isConfirm}
      cancelClassName="!bg-[#F5F5F51A] text-white border border-white"
      onCancel={() => setIsConfirm(!isConfirm)}
      onConfirm={onUnbindingConfig}
    />
  </div>


}

export default AUnbind
