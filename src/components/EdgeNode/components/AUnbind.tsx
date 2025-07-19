import { Btn } from "@/components/btns"
import { ConfirmDialog } from "@/components/dialogimpls"
import backendApi from "@/lib/api"
import { covertName, covertText } from "@/lib/utils"
import { CircularProgress, cn, Image, Skeleton, } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { FC, Fragment, ReactNode, useEffect, useState } from "react"
import { foundDeviceList } from "./AAddNewNodes"
import useMobileDetect from "@/hooks/useMobileDetect"
import { useSearchParams } from "next/navigation"
import { AllText } from "@/lib/allText"
import { debounce } from "lodash"
import { nodeType } from "./ANodeInfo"


const DeviceStep = ({ stepIndex, deviceStep }: { stepIndex: number, deviceStep: { content: ReactNode }[] }) => {
  return <Fragment>{deviceStep[stepIndex].content}</Fragment>
}
const AUnbind: FC<{ nodeId: string, onBack: () => void }> = ({ nodeId, onBack }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [isConfirm, setIsConfirm] = useState(false)
  const isMobile = useMobileDetect()
  const searchParams = useSearchParams();
  const [isFetching, setIsFetching] = useState(true)
  const [delDetail, setDelDetail] = useState<Nodes.DevicesInfo | Nodes.NodeInfoList>()

  const params = new URLSearchParams(searchParams.toString());
  const nId = params.get("nId") || ''
  const chooseType = params.get("nodeType") || '';


  const currentStatus = async () => {

    let res
    if (chooseType !== 'lite_node') {
      res = await backendApi.getDeviceStatusInfo(nId)
    } else {
      const result = await backendApi.getNodeInfoByNodeId(nId, chooseType)
      res = { nodeType: chooseType, nodeUUID: result.nodeId, online: result.online, ip: result?.ipList?.length ? result?.ipList![0].ipAddress : '-', }
    }
    setDelDetail(res as Nodes.DevicesInfo | Nodes.NodeInfoList)
    setIsFetching(false)

  }

  const getStatus = useQuery({
    queryKey: ["NodeStatuList"],
    enabled: false,
    queryFn: () => chooseType === 'lite_node' ? backendApi.unbingExtension(nId) : backendApi.unbingDevice(nId,)
  });


  const refetchRes = debounce(() => {
    isUserOwner()
  }, 1300);


  const isUserOwner = async () => {
    const isOwner = chooseType !== 'lite_node' ? await backendApi.currentOwner(nId) : await backendApi.ownerExtensionSN(nId)
    if (isOwner?.owner === false) {
      onBack();
    } else {
      currentStatus()
    }
  }


  useEffect(() => {
    refetchRes()
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
        <div className="w-[37.5rem] smd:w-full commonTab rounded-xl pt-5 px-5 pb-10 smd:p-5">
          <div className=" py-5 my-5 pl-5 smd:pr-5 bg-[#6D6D6D66] smd:flex-col  w-full flex gap-4 smd:gap-5 rounded-xl">
            <div className="w-[45%] smd:w-full smd:h-[12.5rem] ">
              <img src={`./${covertName[chooseType as nodeType]}.png`} className=" object-cover smd:object-contain rounded-lg bg-white  w-full h-full" alt={`${chooseType || 'box'}`} />
            </div>
            {foundDeviceList(delDetail as any, isMobile)}
          </div>
          <div className="text-[#FFFFFF80] text-sm mt-[.625rem] smd:mt-5 smd:text-left   text-center">
            {AllText.deviceInfo["Please confirm you want to delete this device. This action cannot be undone."]}
          </div>
          <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
            <Btn isLoading={getStatus.isFetching} onPress={() => setIsConfirm(true)} className="w-full rounded-lg h-12 " >
              Confirm Delete
            </Btn>
          </div>
        </div >,
    },
    {
      content:
        <div className="w-[37.5rem] smd:w-full mt-10  flex flex-col gap-5 commonTab rounded-xl  pt-5 px-5 pb-10 smd:p-5">
          <div className="flex w-full justify-center font-normal text-lg leading-5">
            Congratulations!
          </div>
          <div className="text-center text-sm ">
            Your Edge Node (Device Type:  <span className=" capitalize">{covertText(delDetail?.nodeType as "box" | "x86" | "Box")})</span> was deleted successfully.
          </div>

          <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
            <Btn type="submit" className="w-full rounded-lg h-12" onPress={onDeviceStep} >
              OK
            </Btn>
          </div>
        </div >,
    }
  ]

  return <div className=" pt-[73px] smd:pt-5">
    {isFetching ? <div className="flex justify-center w-full pt-[4.5625rem] items-center h-full">
      <CircularProgress label="Loading..." />
    </div> :
      <div className="flex w-full justify-center flex-col items-center ">
        <DeviceStep stepIndex={stepIndex} deviceStep={unbind} />
      </div>

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
