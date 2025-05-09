import { Btn } from "@/components/btns"
import { ConfirmDialog } from "@/components/dialogimpls"
import backendApi from "@/lib/api"
import { covertText } from "@/lib/utils"
import { CircularProgress, cn, } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { FC, ReactNode, useState } from "react"
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io"


const DeviceStep = ({ stepIndex, deviceStep }: { stepIndex: number, deviceStep: { content: ReactNode }[] }) => (
  <div>{deviceStep[stepIndex].content}</div>
);
const AUnbind: FC<{ nodeId: string, onBack: () => void }> = ({ nodeId, onBack }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [isConfirm, setIsConfirm] = useState(false)


  const { data, isFetching } = useQuery({
    queryKey: ["DeviceUnbindStatus"],
    enabled: true,
    queryFn: () => backendApi.getDeviceStatusInfo(nodeId),
    refetchOnWindowFocus: false,


  });


  const foundDeviceList = () => {
    const { nodeType = '-', nodeUUID = '-', online = '-', ip = '-', bindState = '-' } = data || {}
    const list = [
      { name: 'Device Type', value: covertText(nodeType as "box" | "x86") },
      { name: 'Serial Number', value: nodeUUID },
      {
        name: 'Network Status', value: <div className="flex items-center">
          {online ? <IoIosCheckmarkCircle className="text-[#34D399] " /> : <IoIosCloseCircle className="text-[#FF6A6C]" />}
          <label className={`ml-1  ${online ? 'text-green-400' : 'text-[#FF6A6C]'} `}>{online ? 'Online' : 'Offline'}</label>
        </div>
      },
      { name: 'Device IP', value: ip },
      // { name: 'Current Binding', value: bindState },

    ]
    return <div className="w-full device flex flex-col justify-between">
      <div className="text-lg">Device Info:</div>
      <div className="text-sm w-full pr-6  flex  flex-col gap-2 pt-4 pb-2 ">
        {list.map((item) => {
          return <div key={item.name} className="flex justify-between ">
            <span>{item.name}</span>
            <span className={cn('text-[#FFFFFF80] text-sm  text-center',
              //  {
              //   "text-[#FF6A6C]": item.name === 'Current Binding'
              // }
            )}> {item.value}</span>
          </div>
        })}

      </div>
    </div>
  }

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


  console.log('我为的', data?.nodeType);


  const unbind = [
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem]">
            <div className=" py-5 mt-[4.5625rem] pl-5 bg-[#404040]  w-full flex gap-4 rounded-[1.25rem]">
              <div className="w-[45%]">
                <img src={`./${data?.nodeType}.png`} alt={`${data?.nodeType}`} style={{ height: '100%', width: '100%' }} />
              </div>
              {foundDeviceList()}
            </div>
            <div className="text-[#FFFFFF80] text-sm mt-[.625rem]  text-center">Please make sure you want to delete this device before continue. You cannot undo this action. </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn isLoading={getStatus.isFetching} onClick={() => setIsConfirm(true)} className="w-full rounded-lg " >
                Confirm Delete
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] mt-[4.5625rem]  flex flex-col gap-5 ">
            <div className="flex w-full justify-center font-normal text-lg leading-5">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              Edge Node (Device Type: <span className=" capitalize">{data?.nodeType})</span> delete successful.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-full rounded-lg" onClick={onDeviceStep} >
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