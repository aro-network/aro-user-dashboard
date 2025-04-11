import { Btn } from "@/components/btns"
import backendApi from "@/lib/api"
import { SVGS } from "@/svg"
import { useQuery } from "@tanstack/react-query"
import { throttle } from "lodash"
import { FC, ReactNode, useEffect, useState } from "react"
import { IoIosCheckmarkCircle } from "react-icons/io"
import { toast } from "sonner"


const DeviceStep = ({ stepIndex, deviceStep }: { stepIndex: number, deviceStep: { content: ReactNode }[] }) => (
  <div>{deviceStep[stepIndex].content}</div>
);
const AUnbind: FC<{ nodeId: string, onBack: () => void }> = ({ nodeId, onBack }) => {
  const [stepIndex, setStepIndex] = useState(0)


  const { data, isFetching } = useQuery({
    queryKey: ["NodeList"],
    enabled: true,
    queryFn: () => backendApi.getDeviceStatusInfo(nodeId)

  });


  const foundDeviceList = () => {
    const { nodeType = '-', nodeUUID = '-', online = '-', ip = '-', bindState = '-' } = data || {}
    const list = [
      { name: 'Device Type:', value: nodeType },
      { name: 'Serial Number:', value: nodeUUID },
      {
        name: 'Network Status:', value: <div className="flex items-center">
          {online ? <IoIosCheckmarkCircle className="text-green-400" /> : <SVGS.Svgoffline />}
          <label className={`ml-1 ${online && 'text-green-400'} `}>{online ? 'Online' : 'Offline'}</label>
        </div>
      },
      { name: 'Device IP:', value: ip },
      { name: ' Current Binding:', value: bindState },

    ]
    return <div className="w-full device">
      <div className="text-lg">Device Info:</div>
      <div className="text-sm w-full pr-6  flex  flex-col gap-2 pt-4  ">
        {list.map((item) => {
          return <div key={item.name} className="flex justify-between ">
            <span>{item.name}</span>
            <span className="text-[#FFFFFF80]  "> {item.value}</span>
          </div>
        })}

      </div>
    </div>
  }

  const throttledUnbindingConfig = throttle(async (nodeId: string) => {
    await backendApi.unbingDevice(nodeId)
    onDeviceStep()
  }, 3000, { trailing: false })

  const onUnbindingConfig = () => {
    if (data?.online === false) return toast.warning('Please keep the device online and then unbind！')
    throttledUnbindingConfig(nodeId)
  }

  const onDeviceStep = () => {
    if (stepIndex < unbing.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      onBack()
    }
  }


  console.log('FFFFFF80FFFFFF80', data);




  const unbing = [
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[32.5rem]">
            <div className=" py-5 my-5 pl-5 bg-[#404040]  w-full flex gap-4 rounded-[1.25rem]">
              <div className="w-[45%]">
                {/* <SVGS.SvgXHomeBox /> */}
                {data?.nodeType === 'x86' ? <img src='./x86.png' alt="x86" style={{ height: '100%', width: '100%' }} /> : <img src='./box.png' alt="box" style={{ height: '100%', width: '100%' }} />}
              </div>
              {foundDeviceList()}
            </div>
            <div className="text-[#FFFFFF80] text-sm  text-center">Please make sure you want to unbind this device before continue. You cannot undo this action. </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onClick={onUnbindingConfig} className="w-full " >
                Confirm Unbind
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[23.75rem] flex flex-col gap-5 ">
            <div className="flex w-full justify-center font-normal text-lg leading-5">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              Edge Node (Device Type: {data?.nodeType}) unbind successful.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-full" onClick={onDeviceStep} >
                ok
              </Btn>
            </div>
          </div>
        </div >,
    }
  ]

  return <>
    <DeviceStep stepIndex={stepIndex} deviceStep={unbing} />
  </>


}

export default AUnbind