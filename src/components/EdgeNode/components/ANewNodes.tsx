import { Btn } from "@/components/btns"
import backendApi from "@/lib/api"
import { cn, Image, Input, Select, SelectItem } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { FC, ReactNode, Ref, useImperativeHandle, useState } from "react"
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io"
import { covertText } from "@/lib/utils"
import { ConfirmDialog } from "@/components/dialogimpls"
import { toast } from "sonner"

type StepType = { content: ReactNode }[]
const deviceList: Nodes.DeviceType[] = [
  { iconName: 'Hardware', name: 'Home Box', value: 'box' },
  { iconName: 'Software', name: 'X86 Server', value: 'x86' },
]

const AllStep = ({ stepIndex, step, }: { stepIndex: number, step: { content: ReactNode }[] }) => <div>{step[stepIndex].content}</div>

const ANewNodes: FC<{ onBack: () => void, onSelectedType: (e: string) => void, addRef: Ref<Nodes.AddType> }> = ({ onBack, onSelectedType, addRef }) => {
  const [chooseedType, setChooseedType] = useState<Omit<Nodes.DeviceType, 'name'>>()
  const [serialNum, setSerialNum] = useState<{ type?: 'x86' | 'box', num?: string }>()
  const [deviceInfo, setDeviceInfo] = useState<Nodes.DevicesInfo>()
  const [bindInfo, setBindInfo] = useState<{ deviceName: string, regions: Set<string> }>({ deviceName: '', regions: new Set() })
  const [isConfirmInfo, setIsConfirmInfo] = useState<{ open: boolean, type?: string }>({ open: false, type: undefined })

  const allStatus = useQuery({
    queryKey: ["allDeviceStatusInfo", serialNum?.num, chooseedType?.value],
    enabled: false,
    queryFn: () => backendApi.getDeviceStatusInfo(serialNum?.num, chooseedType?.value)
  });


  const foundDeviceList = () => {
    const { nodeType = '-', nodeUUID = '-', online = '-', ip = '-', bindState = '-' } = deviceInfo || {}
    const list = [
      { name: 'Device Type', value: covertText(nodeType as 'box' | 'x86') },
      { name: 'Serial Number', value: nodeUUID },
      {
        name: 'Network Status', value: <div className="flex items-center">
          {online ? <IoIosCheckmarkCircle className="text-[#34D399] text-sm" /> : <IoIosCloseCircle className="text-[#FF6A6C] text-sm" />}
          <label className={`ml-1 text-sm ${online ? 'text-green-400' : 'text-[#FF6A6C]'} `}>{online ? 'Online' : 'Offline'}</label>
        </div>
      },
      { name: 'Device IP', value: ip },
      { name: 'Current Binding', value: bindState },

    ]
    return <div className="w-full device">
      <div className="text-lg font-Alexandria">Device found:</div>
      <div className="text-sm w-full pr-6  flex  flex-col gap-2 pt-4  ">
        {list.map((item) => {
          return <div key={item.name} className="flex justify-between ">
            <span>{item.name}</span>
            <span className={cn('text-[#FFFFFF80] text-sm  text-center', {
              "text-[#FFC639]": item.name === 'Current Binding' && deviceInfo?.bindState === 'N/A',
              "text-[#FF6A6C]": item.name === 'Current Binding' && deviceInfo?.bindState === 'Detected',
            }
            )}> {item.value}</span>
          </div>
        })}

      </div>
    </div>
  }


  const { data } = useQuery({
    queryKey: ["Regions"],
    queryFn: () => backendApi.getRegions(),
  });


  const bind = useQuery({
    queryKey: ["DeviceBind", bindInfo.deviceName],
    enabled: false,
    queryFn: () => backendApi.bindingConfig(serialNum?.num, bindInfo.deviceName, Array.from(bindInfo.regions)[0], chooseedType?.value)

  });

  const onStepNext = (over?: boolean) => {
    if (!over && deviceInfo?.online === false || deviceInfo?.bindState === "Detected") {
      setStepIndex(chooseedType?.value === 'x86' ? 1 : 0)
      setSerialNum({})
      return
    }
    if (stepIndex < allTypeSteps.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      onBack()
      setSerialNum({})

    }
  }



  const onContinue = async () => {
    if (!serialNum?.num) return
    const { data: latestData } = await allStatus.refetch();

    if (latestData?.online) {
      setDeviceInfo(latestData)
      if (stepIndex < allTypeSteps.length - 1) {
        setStepIndex(stepIndex + 1)
      }
    } else if (latestData?.online === false) {
      toast.error('Sorry, we cannot find your Box. Please make sure your Box is powered on and have internet access.')
    }
  }


  const allTypeStep = [
    {
      content:
        <div className="flex w-full flex-col items-center">
          <div className="w-[37.5rem]">
            <div className="flex w-full font-normal text-lg leading-5 justify-center font-Alexandria ">
              Step 1: Connect your device
            </div>
            <div className="mt-5 flex w-full justify-center text-center font-normal text-sm leading-5 text-[#FFFFFF80]">
              Make sure your {chooseedType?.iconName} is powered on and connected to the internet (with internet cable).
              Find the serial number (19-digit numbers) on your box and fill in:
            </div>
            <Input
              maxLength={30}
              className=" mt-5 rounded-lg"
              value={serialNum?.num}
              onChange={(e) => {
                const onlyLetters = e.target.value.replace(/[^a-zA-Z]/g, '').trim();
                setSerialNum({ num: onlyLetters });
              }}

            />
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn isDisabled={!serialNum} isLoading={allStatus.isFetching} onClick={onContinue} className="w-full rounded-lg" >
                Continue
              </Btn>
              <button className="underline underline-offset-1 text-[#999999] text-xs">See Guidance</button>
            </div>
          </div>
        </div>,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] ">
            <div className="flex w-full  font-normal text-lg leading-5 justify-center font-Alexandria">
              Step 2: Add Device to your account
            </div>
            <div className=" py-5 my-5 pl-5 bg-[#6D6D6D66]  w-full flex gap-4 rounded-[1.25rem]">
              <div className="w-[45%]">
                <img src={`./${chooseedType?.value}.png`} alt="x86" style={{ height: '100%', width: '100%' }} />
              </div>
              {foundDeviceList()}
            </div>
            <div className={cn(' text-sm  text-center', {
              "text-[#FFFFFF80]": deviceInfo?.bindState === 'N/A',
              "text-[#FF6A6C]": deviceInfo?.bindState === 'Detected',
            }
            )}>
              {deviceInfo?.bindState === 'N/A' ? 'Please make sure your device is still online. Otherwise, the binding process will fail. ' : 'This device has been already binded to an ARO Account. Please delete device to create a new binding.'}
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5 ">
              <Btn onClick={() => onStepNext()} className="w-full rounded-lg" >
                Continue
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] ">
            <div className="flex w-full font-normal text-lg leading-5 justify-center font-Alexandria">
              Step 3: Configure your Edge Node
            </div>
            <div className="text-xs mt-5 font-Alexandria">Set a name for your Edge Node</div>
            <Input maxLength={30} placeholder="Device Name" value={bindInfo.deviceName} onChange={(e) => { setBindInfo({ ...bindInfo, deviceName: e.target.value.replace(/[\u4e00-\u9fa5]/g, '') }) }} className="mt-[.3125rem]" />
            <label className="text-[#FFFFFF80] text-xs mt-[.625rem]">You can change the name anytime later.</label>
            <div className="text-xs mt-[.9375rem] font-Alexandria">Select Service Region</div>
            <Select
              items={data}
              onSelectionChange={(keys) => {
                setBindInfo({ ...bindInfo, regions: new Set(keys as Set<string>) });
              }}
              placeholder="Select an regions"
              className=" mt-[.3125rem]"
              selectedKeys={new Set(bindInfo.regions)}
            >
              {(animal: { code: string, name: string }) => <SelectItem key={animal.code}>{animal.name}</SelectItem>}
            </Select>

            <div className="text-[#FF6A6C] text-xs font-normal mt-[10px]">
              Please select the right region for your Edge Node. You can only delete the node and then rebind to change the service region.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-[.75rem] ">
              <Btn isDisabled={!bindInfo.deviceName || !Array.from(bindInfo.regions)[0]?.length} isLoading={bind.isFetching} onClick={() => onBindingConfig('box')} className="w-full rounded-lg" >
                Add
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] flex flex-col gap-5 ">
            <div className="flex w-full justify-center font-normal text-lg leading-5 font-Alexandria">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              Edge Node (Device Type: Home Box) binding successful.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn onClick={() => onStepNext(true)} type="submit" className="w-full rounded-lg" >
                OK
              </Btn>
            </div>
          </div>
        </div >,
    }
  ]


  const x86FirstStep = {
    content:
      <div className="flex w-full flex-col items-center">
        <div className="w-[37.5rem]">
          <div className="flex w-full font-normal justify-center text-sm leading-5">
            To add a new X86 Server Node, please refer to the guidance below.
          </div>
          <div className="mt-5  text-center text-sm underline underline-offset-1">
            X86 Node Installation Guidance
          </div>
          <div className="mt-5 text-[#FFFFFF80] text-sm text-center">
            Make sure you have followed the guidance and complete initial network configurations on your X86 Node CLI before continue.
          </div>
          <div className="flex justify-center items-center mt-[.75rem]  flex-col  gap-[.625rem]">
            <Btn onClick={() => onStepNext()} className="w-full rounded-lg " >
              Continue
            </Btn>
          </div>
        </div>
      </div>,
  }

  const [allTypeSteps] = useState<StepType>(() => {
    return chooseedType?.value === 'x86' ? [x86FirstStep, ...allTypeStep] : allTypeStep;
  });

  const [stepIndex, setStepIndex] = useState(0)


  useImperativeHandle(
    addRef,
    () => ({
      switchTo: () => {
        setBindInfo({ deviceName: '', regions: new Set() });
        setChooseedType(undefined);
        setSerialNum({})
        setStepIndex(0);
        setDeviceInfo(undefined)
      },
    }),
    []
  );

  const onBindingConfig = async (type?: string) => {
    setIsConfirmInfo({ open: true, type })
  }

  return <div className="w-full mt-[73px] bg-fuchsia-400 ">
    <div className=" flex justify-center flex-col items-center  w-[55.625rem] m-auto h-full ">
      {chooseedType?.value
        ?
        <AllStep stepIndex={stepIndex} step={chooseedType?.value === 'box' ? allTypeStep : [x86FirstStep, ...allTypeStep]} /> :
        <div className="w-full text-center flex flex-col m-auto">
          <label className="font-normal text-lg leading-5 ">Please choose which type of Edge Node you want to add:</label>
          <div className="flex  gap-10 mt-10 w-full justify-center m-auto px-[3.75rem]">

            {deviceList.map((item, index) => {
              return <div onClick={() => {
                onSelectedType(item.name)
                setChooseedType(item)
              }} key={`device_${index}`}
                className=" hover:border-[#00E42A] text-center cursor-pointer w-full   border-[#404040] border rounded-[1.25rem] bg-[#404040] pt-5 px-5 flex items-center flex-col">
                <Image src={`../${item.iconName}.png`} classNames={{ 'wrapper': 'w-[18.75rem] h-[9.375rem] object-contain ' }} width={'100%'} height={'100%'} alt={item.iconName} />

                <div className="text-lg py-5 w-full justify-center flex bf">{item.iconName}</div>
              </div>
            })}
          </div>
        </div>
      }
      <ConfirmDialog
        tit="Add this device"
        msg={
          <>
            Please make sure you have selected the right region. You'll need to delete and re-bind your Edge Node if you want to change region.
          </>
        }
        isOpen={isConfirmInfo.open}
        confirmColor='primary'
        cancelColor="default"
        onCancel={() => setIsConfirmInfo({ open: false, type: undefined })}
        onConfirm={async () => {
          setIsConfirmInfo({ open: false, type: undefined })
          const { data } = await bind.refetch()
          if (!data) return
          onStepNext()
        }}
      />
    </div>
  </div>
}

export default ANewNodes