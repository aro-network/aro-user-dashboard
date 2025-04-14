import { Btn } from "@/components/btns"
import backendApi from "@/lib/api"
import { SVGS } from "@/svg"
import { cn, Input, Select, SelectItem } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { throttle } from "lodash"
import { FC, ReactNode, Ref, useImperativeHandle, useState } from "react"
import { IoIosCheckmarkCircle } from "react-icons/io"
import { addType } from "../ANodes"

const devicrsType = [
  { icon: () => <img src='/box.png' alt="box" className="w-[90%] h-[90%]" />, name: 'Home Box' },
  { icon: () => <img src='/x86.png' alt="X86 Servers" className="w-[90%] h-[90%]" />, name: 'X86 Servers', },
]

const HomeBox = ({ stepIndex, homeBoxStep }: { stepIndex: number, homeBoxStep: { content: ReactNode }[] }) => (
  <div>{homeBoxStep[stepIndex].content}</div>
);

const X86 = ({ stepIndex, x86Step }: { stepIndex: number, x86Step: { content: ReactNode }[] }) => (
  <div>{x86Step[stepIndex].content}</div>
);



const AAddNewNodes: FC<{ onBack: () => void, onSelectedType: (e: string) => void, addRef: Ref<addType> }> = ({ onBack, onSelectedType, addRef }) => {
  const [chooseedType, setChooseedType] = useState('')
  const [stepIndex, setStepIndex] = useState(0)
  const [stepX86Index, setX86StepIndex] = useState(0)
  const [serialNum, setSerialNum] = useState('')
  const [deviceInfo, setDeviceInfo] = useState<Nodes.DevicesInfo>()
  const [bindInfo, setBindInfo] = useState<{ deviceName: string, regions: Set<string> }>({ deviceName: '', regions: new Set() })


  const onStepNext = (over?: boolean) => {
    console.log('deviceInfodeviceInfo', deviceInfo);

    if (!over && deviceInfo?.online === false || deviceInfo?.bindState === "Detected") {
      setStepIndex(0)
      setSerialNum('')
      return
    }
    if (stepIndex < homeBoxStep.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      onBack()
      setSerialNum('')

    }
  }


  useImperativeHandle(
    addRef,
    () => ({
      switchTo: () => { setBindInfo({ deviceName: '', regions: new Set() }); setChooseedType(''); setSerialNum(''); setStepIndex(0); setX86StepIndex(0) },
    }),
    []
  );

  const { data, isLoading } = useQuery({
    queryKey: ["Regions"],
    queryFn: () => backendApi.getRegions(),
  });


  console.log('datadata', data);



  const { data: info, isFetching, refetch } = useQuery({
    queryKey: ["DeviceStatusInfo", serialNum],
    enabled: false,
    queryFn: () => backendApi.getDeviceStatusInfo(serialNum, 'box')

  });


  const onContinue = async () => {
    if (!serialNum) return
    const { data } = await refetch()
    console.log('datadataadasonContinue', data);

    if (data) {
      setDeviceInfo(data)
      if (stepIndex < homeBoxStep.length - 1) {
        setStepIndex(stepIndex + 1)
      }
    }
  }


  const onX86Continue = throttle(async () => {
    if (!serialNum) return
    try {
      const info = await backendApi.getDeviceStatusInfo(serialNum, 'x86')
      console.log('info', info);
      setDeviceInfo(info)

      if (stepX86Index < x86Step.length - 1) {
        setX86StepIndex(stepX86Index + 1)
      }
    } catch (err) {
      console.log('errr', err);
    }
  }, 3000, { trailing: false })



  const bind = useQuery({
    queryKey: ["DeviceBind", bindInfo.deviceName],
    enabled: false,
    queryFn: () => backendApi.bindingConfig(serialNum, bindInfo.deviceName, Array.from(bindInfo.regions)[0])

  });


  const onBindingConfig = async (type?: string) => {
    console.log('bindInfobindInfo', bindInfo, !bindInfo.deviceName && !Array.from(bindInfo.regions)[0].length);


    if (!bindInfo.deviceName && !Array.from(bindInfo.regions)[0].length) return
    const { data } = await bind.refetch()
    console.log('onBindingConfigadsa', data);
    if (!data) return

    if (type) {
      onStepNext()
      return
    }
    onX86StepNext()
    console.log('result3333', stepX86Index, x86Step.length - 1, Array.from(bindInfo.regions)[0]);
  }


  const onX86StepNext = (over?: boolean) => {
    if (!over && deviceInfo?.online === false || deviceInfo?.bindState === "Detected") {
      setX86StepIndex(1)
      setSerialNum('')
      return
    }
    if (stepX86Index < x86Step.length - 1) {
      setX86StepIndex(stepX86Index + 1)
    } else {
      onBack()
    }
  }

  const foundDeviceList = () => {
    const { nodeType = '-', nodeUUID = '-', online = '-', ip = '-', bindState = '-' } = deviceInfo || {}
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
      { name: 'Current Binding:', value: bindState },

    ]
    return <div className="w-full device">
      <div className="text-lg">Device found:</div>
      <div className="text-sm w-full pr-6  flex  flex-col gap-2 pt-4  ">
        {list.map((item, index) => {
          return <div key={item.name} className="flex justify-between ">
            <span>{item.name}</span>
            <span className={cn('text-[#FFFFFF80] text-sm  text-center', {
              "text-[#FFC639]": item.name === 'Current Binding:' && deviceInfo?.bindState === 'N/A',
              "text-[#FF6A6C]": item.name === 'Current Binding:' && deviceInfo?.bindState === 'Detected',
            }
            )}> {item.value}</span>
          </div>
        })}

      </div>
    </div>
  }


  const homeBoxStep = [
    {
      content:
        <div className="flex w-full flex-col items-center">
          <div className="w-[37.5rem]">
            <div className="flex w-full font-normal text-lg leading-5 justify-center">
              Step 1: Connect your device
            </div>
            <div className="mt-5 flex w-full justify-center text-center font-normal text-sm leading-5 text-[#FFFFFF80]">
              Make sure your box is powered on and connected to the internet (with internet cable).
              Find the serial number (8-digit numbers) on your box and fill in:
            </div>
            <Input maxLength={30} className=" mt-5 rounded-lg" value={serialNum}
              onChange={(e) => {
                setSerialNum(e.target.value.replace(/[\u4e00-\u9fa5]/g, ''))
              }}

            />
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn isLoading={isFetching} onClick={onContinue} className="w-full rounded-lg" >
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
            <div className="flex w-full  font-normal text-lg leading-5 justify-center">
              Step 2: Bind Device to your account
            </div>
            <div className=" py-5 my-5 pl-5 bg-[#404040]  w-full flex gap-4 rounded-[1.25rem]">
              <div className="w-[45%]">
                {/* <SVGS.SvgXHomeBox /> */}
                {chooseedType.startsWith('X86') ? <img src='./x86.png' alt="x86" style={{ height: '100%', width: '100%' }} /> : <img src='./box.png' alt="box" style={{ height: '100%', width: '100%' }} />}
              </div>
              {foundDeviceList()}
            </div>
            <div className={cn(' text-sm  text-center', {
              "text-[#FFFFFF80]": deviceInfo?.bindState === 'N/A',
              "text-[#FF6A6C]": deviceInfo?.bindState === 'Detected',
            }
            )}>
              {deviceInfo?.bindState === 'N/A' ? 'Please make sure your device is still online. Otherwise, the binding process will fail. ' : 'This device has been already binded to an EnReach Account. Please unbind device to create a new binding.'}
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
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
            <div className="flex w-full font-normal text-lg leading-5 justify-center">
              Step 3: Configure your Edge Node
            </div>
            <div className="text-xs mt-5 ">Set a name for your Edge Node</div>
            <Input maxLength={30} placeholder="Device Name" value={bindInfo.deviceName} onChange={(e) => { setBindInfo({ ...bindInfo, deviceName: e.target.value.replace(/[\u4e00-\u9fa5]/g, '') }) }} className="mt-[.3125rem]" />
            <label className="text-[#FFFFFF80] text-xs mt-[.625rem]">You can change the name anytime later.</label>
            <div className="text-xs mt-[.9375rem]">Select Service Region</div>
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
              Please select the right region for your Edge Node. You cannot change this setting after registration.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn isLoading={bind.isFetching} onClick={() => onBindingConfig('box')} className="w-full rounded-lg" >
                Bind
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] flex flex-col gap-5 ">
            <div className="flex w-full justify-center font-normal text-lg leading-5">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              Edge Node (Device Type: Box) binding successful.
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


  const x86Step = [
    {
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
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn onClick={() => onX86StepNext()} className="w-full rounded-lg" >
                Continue
              </Btn>
            </div>
          </div>
        </div>,
    },
    {
      content:
        <div className="flex w-full flex-col items-center">
          <div className="w-[37.5rem]">
            <div className="flex w-full font-normal text-lg leading-5 justify-center">
              Step 1: Connect your device
            </div>
            <div className="mt-5 flex w-full justify-center text-center font-normal text-sm leading-5 text-[#FFFFFF80]">
              Fill in the Virtual Serial Number in this box.
              (You will find the Virtual Serial Number on your X86 Node CLI after you have completed network configurations. )
              Please make sure your X86 Node is connected to the internet during the binding process. Otherwise the binding process will fail.
            </div>
            <Input

              maxLength={30}
              errorMessage="Please enter"
              // isInvalid={!serialNum}
              className=" mt-5 rounded-lg" value={serialNum} onChange={(e) => {
                setSerialNum(e.target.value.replace(/[\u4e00-\u9fa5]/g, ''))
              }} />
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn isLoading={isFetching} onClick={onX86Continue} className="w-full rounded-lg" >
                Continue
              </Btn>
              {/* <button className="underline underline-offset-1 text-[#999999] text-xs">See Guidance</button> */}
            </div>
          </div>
        </div>,
    },

    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem]">
            <div className="flex w-full  font-normal text-lg leading-5 justify-center">
              Step 2: Bind Device to your account
            </div>
            <div className=" py-5 my-5 pl-5 bg-[#404040]  w-full flex gap-4 rounded-[1.25rem]">
              <div className="w-[50%]">
                {/* <SVGS.SvgXHomeBox /> */}
                {chooseedType.startsWith('X86') ? <img src='./x86.png' alt="x86" style={{ height: '100%', width: '100%' }} /> : <img src='./box.png' alt="box" style={{ height: '100%', width: '100%' }} />}
              </div>
              {foundDeviceList()}
            </div>
            <div className={cn(' text-sm  text-center', {
              "text-[#FFFFFF80]": deviceInfo?.bindState === 'N/A',
              "text-[#FF6A6C]": deviceInfo?.bindState === 'Detected',
            }
            )}>
              {deviceInfo?.bindState === 'N/A' ? 'Please make sure your X86 Node is connected to the internet during the binding process. Otherwise the binding process will fail.' : 'This device has been already binded to an EnReach Account. Please unbind device to create a new binding.'}
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onClick={() => onX86StepNext()} className="w-full rounded-lg " >
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
            <div className="flex w-full font-normal text-lg leading-5 justify-center">
              Step 3: Configure your Edge Node
            </div>

            <div className="text-xs mt-5 ">Set a name for your Edge Node</div>
            <Input maxLength={30} placeholder="Device Name" value={bindInfo.deviceName} onChange={(e) => { setBindInfo({ ...bindInfo, deviceName: e.target.value.replace(/[\u4e00-\u9fa5]/g, '') }) }} className="mt-[.3125rem]" />
            <label className="text-[#FFFFFF80] text-xs mt-[.625rem]">You can change the name anytime later.</label>
            <div className="text-xs mt-[.9375rem]">Select Service Region</div>
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
              Please select the right region for your Edge Node. You cannot change this setting after registration.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn isLoading={bind.isFetching} onClick={() => onBindingConfig()} className="w-full rounded-lg" >
                Bind
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] flex flex-col gap-5 ">
            <div className="flex w-full justify-center font-normal text-lg leading-5">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              Edge Node (Device Type: X86 Server) binding successful.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-full rounded-lg" onClick={() => onX86StepNext(true)} >
                OK
              </Btn>
            </div>
          </div>
        </div >,
    }
  ]



  return <div className="w-full ">
    <div className=" flex justify-center flex-col items-center  w-[37.5rem] m-auto ">
      {chooseedType.startsWith('X86')
        ? <div>  <X86 stepIndex={stepX86Index} x86Step={x86Step} /></div>
        : chooseedType.startsWith('Home') ?
          <HomeBox stepIndex={stepIndex} homeBoxStep={homeBoxStep} /> :

          <div className="w-full text-center flex flex-col items-center ">
            <label className="font-normal text-lg leading-5">Please choose which type of Edge Node you want to add:</label>
            <div className="flex  gap-10 mt-10 w-full justify-center m-auto px-[3.75rem]">
              {devicrsType.map((item, index) => {
                const IconComponent = item.icon;
                return <div onClick={() => {
                  onSelectedType(item.name)
                  setChooseedType(item.name)
                }} key={`device_${index}`} className=" hover:border-[#4281FF] text-center cursor-pointer w-full border-[#404040] border rounded-[1.25rem] bg-[#404040] pt-5 px-4 flex items-center justify-center flex-col">
                  <IconComponent />
                  <div className="text-lg py-5 w-full justify-center flex">{item.name}</div>
                </div>
              })}
            </div>
          </div>
      }

    </div>
  </div>


}

export default AAddNewNodes