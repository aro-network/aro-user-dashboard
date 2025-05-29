import { Btn } from "@/components/btns"
import { ConfirmDialog } from "@/components/dialogimpls"
import backendApi from "@/lib/api"
import { covertText } from "@/lib/utils"
import { CircularProgress, cn, } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { FC, ReactNode, useState } from "react"
import { foundDeviceList } from "./AAddNewNodes"
import useMobileDetect from "@/hooks/useMobileDetect"


const DeviceStep = ({ stepIndex, deviceStep }: { stepIndex: number, deviceStep: { content: ReactNode }[] }) => (
  <div>{deviceStep[stepIndex].content}</div>
);
const AUnbind: FC<{ nodeId: string, onBack: () => void }> = ({ nodeId, onBack }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [isConfirm, setIsConfirm] = useState(false)
  const isMobile = useMobileDetect()


  const { data, isFetching } = useQuery({
    queryKey: ["DeviceUnbindStatus"],
    enabled: true,
    queryFn: () => backendApi.getDeviceStatusInfo(nodeId),
    refetchOnWindowFocus: false,


  });




  const getStatus = useQuery({
    queryKey: ["NodeStatuList"],
    enabled: false,
    queryFn: () => backendApi.unbingDevice(nodeId)
  });


  const onUnbindingConfig = async () => {
    setIsConfirm(!isConfirm)
    await getStatus.refetch()
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
              <div className="w-[45%] smd:w-full smd:h-[12.5rem]">
                <img src={`./${data?.nodeType}.png`} className=" object-contain rounded-lg bg-[#F6F8F9]  w-full h-full" alt={`${data?.nodeType}`} />
              </div>
              {foundDeviceList(data, isMobile)}
            </div>
            <div className="text-[#FFFFFF80] text-sm mt-[.625rem] smd:mt-5  text-center">Please make sure you want to delete this device before continue. You cannot undo this action. </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn isLoading={getStatus.isFetching} onClick={() => setIsConfirm(true)} className="w-full rounded-lg smd:h-12 " >
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
              Edge Node (Device Type: <span className=" capitalize">{covertText(data?.nodeType as "box" | "x86" | "Box")})</span> deleted.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-full rounded-lg smd:h-12" onClick={onDeviceStep} >
                OK
              </Btn>
            </div>
          </div>
        </div >,
    }
  ]

  return <div className="">
    {isFetching ? <div className="flex justify-center w-full pt-[4.5625rem] items-center h-full">
      <CircularProgress label="Loading..." />
    </div> :
      <DeviceStep stepIndex={stepIndex} deviceStep={unbind} />
    }
    <ConfirmDialog
      tit="Delete this device"
      msg={
        <>
          Are you sure you really want to delete Edge Node?
        </>
      }
      className="smd:mx-5"
      confirmText={'Yes'}
      confirmColor='primary'
      cancelColor="default"
      isOpen={isConfirm}
      onCancel={() => setIsConfirm(!isConfirm)}
      onConfirm={onUnbindingConfig}
    />
  </div>


}

export default AUnbind