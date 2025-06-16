import { Btn } from "@/components/btns"
import backendApi from "@/lib/api"
import { cn, Image, Input, Select, SelectItem } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { FC, ReactNode, Ref, useEffect, useImperativeHandle, useState } from "react"
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io"
import { covertText, isIPv6, shortenMiddle } from "@/lib/utils"
import { ConfirmDialog } from "@/components/dialogimpls"
import { toast } from "sonner"
import { HelpTip } from "@/components/tips"
import useMobileDetect from "@/hooks/useMobileDetect"
import { useRouter, useSearchParams } from "next/navigation";
import { ENV } from "@/lib/env"
import { AllText } from "@/lib/allText"
import { env } from "node:process"


const deviceList: Nodes.DeviceType[] = [
  { iconName: 'Hardware', name: 'Home Box', value: 'box' },
  { iconName: 'Software', name: 'X86 Server', value: 'x86' },
]

const deviceTypeList: { [key: 'box' | 'x86' | string]: Nodes.DeviceType } = {
  box: { iconName: 'Hardware', name: 'Home Box', value: 'box' },
  x86: { iconName: 'Software', name: 'X86 Server', value: 'x86' },
}
const HomeBox = ({ stepIndex, homeBoxStep }: { stepIndex: number, homeBoxStep: { content: ReactNode }[] }) => (
  <div>{homeBoxStep[stepIndex].content}</div>
);

const X86 = ({ stepIndex, x86Step }: { stepIndex: number, x86Step: { content: ReactNode }[] }) => (
  <div>{x86Step[stepIndex].content}</div>
);

export const foundDeviceList = (deviceInfo: Nodes.DevicesInfo | undefined, isMobile: boolean) => {
  const { nodeType = '-', nodeUUID = '-', online = '-', ip = '-', bindState = '-' } = deviceInfo || {}


  const list = [
    { name: AllText.deviceInfo["Device Type"], value: covertText(nodeType as 'box' | 'x86') },
    { name: AllText.deviceInfo["Serial Number"], value: nodeUUID },
    {
      name: AllText.deviceInfo["Network Status"], value: <div className="flex items-center">
        {online ? <IoIosCheckmarkCircle className="text-[#34D399] text-sm" /> : <IoIosCloseCircle className="text-[#FF6A6C] text-sm" />}
        <label className={`ml-1 text-sm ${online ? 'text-[#34D399]' : 'text-[#FF6A6C]'} `}>{online ? 'Online' : 'Offline'}</label>
      </div>
    },
    { name: 'Device IP', value: ip },
    // { name: 'Current Binding', value: bindState },

  ]

  return <div className="w-full device flex justify-between flex-col py-[.625rem]">
    <div className="text-lg smd:text-base font-Alexandria">{AllText.deviceInfo["Device found"]}</div>
    <div className="text-sm w-full pr-6 smd:pr-0  flex  flex-col gap-2 pt-4 ">
      {list.map((item) => {
        const isOpen = item.name === 'Device IP' && isMobile && isIPv6(item.value as string)
        return <div key={item.name} className="flex justify-between  ">
          <span>{item.name}</span>
          {isOpen ? <HelpTip content={item.value} >
            <span className={cn('text-[#FFFFFF80] text-sm   text-center ')}>
              {isOpen ? shortenMiddle(item.value as string) : item.value}
            </span>
          </HelpTip>
            :
            <span className={cn('text-[#FFFFFF80] text-sm   text-center ')}>
              {item.value}
            </span>
          }
        </div>
      })}

    </div>
  </div>
}


const AAddNewNodes: FC<{ onBack: () => void, onSelectedType: (e: string) => void, addRef: Ref<Nodes.AddType> }> = ({ onBack, onSelectedType, addRef }) => {
  const [chooseedType, setChooseedType] = useState<Omit<Nodes.DeviceType, 'name'> | undefined>(undefined)
  const [stepIndex, setStepIndex] = useState(0)
  const [stepX86Index, setX86StepIndex] = useState(0)
  const [serialNum, setSerialNum] = useState<{ type?: 'x86' | 'box', num?: string }>()
  const [deviceInfo, setDeviceInfo] = useState<Nodes.DevicesInfo>()
  const [bindInfo, setBindInfo] = useState<{ deviceName: string, regions: Set<string> }>({ deviceName: '', regions: new Set() })
  const [isConfirmInfo, setIsConfirmInfo] = useState<{ open: boolean, type?: string }>({ open: false, type: undefined })
  const isMobile = useMobileDetect()
  const r = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const onStepNext = (over?: boolean) => {
    if (!over && deviceInfo?.online === false || deviceInfo?.bindState === "Detected") {
      setStepIndex(0)
      setSerialNum({})
      return
    }
    if (stepIndex < homeBoxStep.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      onBack()
      setSerialNum({})

    }

  }


  useEffect(() => {
    const type = params.get('chooseType')
    if (type) {
      setChooseedType(deviceTypeList[type])
    } else {
      setChooseedType(undefined)
    }

  }, [params])

  useImperativeHandle(
    addRef,
    () => ({
      switchTo: () => {
        setBindInfo({ deviceName: '', regions: new Set() });
        setChooseedType(undefined);
        setSerialNum({})
        setStepIndex(0);
        setX86StepIndex(0)
      },
    }),
    []
  );


  const { data } = useQuery({
    queryKey: ["Regions"],
    queryFn: async () => {
      const res = await backendApi.getRegions()

      const result = ENV === 'staging' ? res : res.filter((item: { code: string }) => {
        return item.code === 'AS'
      })

      return result
    }
  });


  const onContinue = async () => {
    if (!serialNum?.num) return
    const { data } = await allStatus.refetch()
    if (data?.online) {
      setDeviceInfo(data)
      if (stepIndex < homeBoxStep.length - 1) {
        setStepIndex(stepIndex + 1)
      }
    } else if (data?.online === false) {
      toast.error(AllText.AAddNewNodes.type.step1.error[0].replaceAll('xx', chooseedType?.iconName ?? '-'))
    }
  }

  const allStatus = useQuery({
    queryKey: ["allDeviceStatusInfo", serialNum],
    enabled: false,
    queryFn: () => backendApi.getDeviceStatusInfo(serialNum?.num, serialNum?.type)
  });

  const onX86Continue = async () => {
    if (!serialNum) return
    const { data } = await allStatus.refetch()

    if (data?.online) {
      setDeviceInfo(data)
      if (stepX86Index < x86Step.length - 1) {
        setX86StepIndex(stepX86Index + 1)
      }
    } else if (data?.online === false) {
      toast.error(AllText.AAddNewNodes.type.step1.error[0].replaceAll('xx', chooseedType?.iconName ?? '-'))
    }
  }

  const bind = useQuery({
    queryKey: ["DeviceBind", bindInfo.deviceName],
    enabled: false,
    queryFn: () => backendApi.bindingConfig(serialNum?.num, bindInfo.deviceName, Array.from(bindInfo.regions)[0], chooseedType?.value)

  });


  const onBindingConfig = async (type?: string) => {
    const { data } = await bind.refetch()

    if (!data) return
    if (type) {
      onStepNext()
    } else {
      onX86StepNext()
    }
    // setIsConfirmInfo({ open: true, type })
  }


  const onX86StepNext = (over?: boolean) => {
    if (!over && deviceInfo?.online === false || deviceInfo?.bindState === "Detected") {
      setX86StepIndex(1)
      setSerialNum({})
      return
    }
    if (stepX86Index < x86Step.length - 1) {
      setX86StepIndex(stepX86Index + 1)
    } else {
      onBack()
    }
  }


  const homeBoxStep = [
    {
      content:
        <div className="flex w-full flex-col items-center">
          <div className="w-[37.5rem] smd:w-full">
            <div className="flex w-full font-normal smd:text-base text-lg leading-5 justify-center font-Alexandria smd:justify-start ">
              {AllText.AAddNewNodes.type.step1.title}

            </div>
            <button className="mt-5 flex w-full justify-center smd:text-left text-center font-normal text-sm leading-5 text-[#FFFFFF80]">
              {AllText.AAddNewNodes.type.step1.subtitle.replaceAll('xx', chooseedType?.iconName ?? '')}
            </button>
            <Input
              maxLength={30}
              className=" mt-5 "
              classNames={{ 'inputWrapper': '!rounded-lg smd:!h-12' }}
              value={serialNum?.num}
              onChange={(e) => {
                const onlyLetters = e.target.value.replace(/[^a-zA-Z0-9]/g, '').trim();
                setSerialNum({ num: onlyLetters, type: 'box' });
              }}

            />
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn isDisabled={!serialNum?.num} isLoading={allStatus.isFetching} onPress={onContinue} className="w-full rounded-lg smd:!h-12" >
                Continue
              </Btn>
              <button onClick={() => window.open('https://youtu.be/YtjHVk2KA9w', '_blank')} className="underline underline-offset-1 text-[#999999] hover:text-[#00E42A] text-xs smd:pt-4">See Guidance</button>
            </div>
          </div>
        </div>,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] smd:w-full ">
            <div className="flex w-full  font-normal text-lg leading-5 justify-center font-Alexandria">
              {AllText.AAddNewNodes.type.step2.title}
            </div>
            <div className=" py-5 my-5 pl-5 smd:pr-5 bg-[#6D6D6D66] smd:flex-col  w-full flex gap-4 smd:gap-5 rounded-xl">

              <div className="w-[45%] smd:w-full smd:h-[12.5rem]">
                <img src={`./${deviceInfo?.nodeType}.png`} className=" object-contain rounded-lg  bg-white  w-full h-full" alt={`${data?.nodeType}`} />
              </div>
              {foundDeviceList(deviceInfo, isMobile)}
            </div>
            <div className={cn(' text-sm  text-center', {
              "text-[#FFFFFF80]": deviceInfo?.bindState === 'N/A',
              "text-[#FF6A6C]": deviceInfo?.bindState === 'Detected',
            }
            )}>
              {deviceInfo?.bindState === 'N/A' ? AllText.AAddNewNodes.type.step2.error[1] : AllText.AAddNewNodes.type.step2.error[0]}
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5 ">
              <Btn onPress={() => onStepNext()} className="w-full rounded-lg smd:h-12" >
                Continue
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col md:items-center">
          <div className="w-[37.5rem] smd:w-full  ">
            <div className="flex w-full font-normal  smd:justify-start text-lg leading-5 justify-center font-Alexandria">
              {AllText.AAddNewNodes.type.step3["Step 3: Configure your Edge Node"]}
            </div>
            <div className="text-xs w-full mt-5 font-Alexandria smd:text-sm">{AllText.AAddNewNodes.type.step3["Set a name for your Edge Node"]}</div>
            <Input maxLength={30} placeholder="Device Name" value={bindInfo.deviceName} onChange={(e) => { setBindInfo({ ...bindInfo, deviceName: e.target.value.replace(/[\u4e00-\u9fa5]/g, '') }) }} classNames={{ 'inputWrapper': '!rounded-lg smd:h-12' }} className="mt-[.3125rem]" />
            <label className="text-[#FFFFFF80] text-xs smd:text-sm mt-[.625rem]">{AllText.AAddNewNodes.type.step3["You can change the name anytime later."]}</label>
            <div className="text-xs smd:text-sm mt-[.9375rem] font-Alexandria ">Select Service Region</div>
            <Select
              items={data}
              onSelectionChange={(keys) => {
                setBindInfo({ ...bindInfo, regions: new Set(keys as Set<string>) });
              }}
              placeholder="Select an regions"
              classNames={{ 'base': '!rounded-lg !w-full smd:!h-12 ', 'popoverContent': '!w-full', 'innerWrapper': 'smd:!h-12 ', 'trigger': 'smd:!h-12', 'value': 'smd:text-base' }}
              className=" mt-[.3125rem] "
              selectedKeys={new Set(bindInfo.regions)}
            >
              {(animal: { code: string, name: string }) => <SelectItem classNames={{ 'wrapper': '!w-full', 'base': '!w-full' }} key={animal.code}>{animal.name}</SelectItem>}
            </Select>

            {/* <div className="text-[#FF6A6C] text-xs font-normal mt-[10px]">
              Please select the right region for your Edge Node. You can only delete the node and then rebind to change the service region.
            </div> */}

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-[1.375rem] ">
              <Btn isDisabled={!bindInfo.deviceName || !Array.from(bindInfo.regions)[0]?.length} isLoading={bind.isFetching} onPress={() => onBindingConfig('box')} className="w-full rounded-lg smd:!h-12 " >
                Add
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] smd:w-full flex flex-col gap-5 ">
            <div className="flex w-full justify-center font-normal text-lg leading-5 font-Alexandria">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              {AllText.AAddNewNodes.type.step4.content.replace('xxx', chooseedType?.iconName ?? '-')}
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn onPress={() => onStepNext(true)} type="submit" className="w-full rounded-lg smd:h-12" >
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
          <div className="w-[37.5rem] smd:w-full">
            <div className="flex w-full font-normal justify-center text-center text-sm leading-5 ">
              {AllText.AAddNewNodes.type2.first.title.replace('xx', chooseedType?.iconName ?? '-')}
            </div>
            <button onClick={() => window.open('https://docs.aro.network/user-guides/software-setup', '_blank')} className="mt-5  text-center smd:flex justify-center w-full text-sm underline underline-offset-1">
              {chooseedType?.iconName + AllText.AAddNewNodes.type2.first["Node Installation Guidance"]}
            </button>
            <div className="mt-5 text-[#FFFFFF80] text-sm text-center">

              {AllText.AAddNewNodes.type2.first["Make sure you have followed the guidance and complete initial network configurations on your Software Node CLI before continue."].replaceAll('xx', chooseedType?.iconName ?? '')}
            </div>
            <div className="flex justify-center items-center mt-[.75rem]  flex-col  gap-[.625rem]">
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
          <div className="w-[37.5rem] smd:w-full">
            <div className="flex w-full font-normal text-lg smd:text-base leading-5 justify-center font-Alexandria smd:justify-start">
              {AllText.AAddNewNodes.type.step1.title}
            </div>
            <div className="mt-5 flex w-full justify-center text-center font-normal text-sm leading-5 text-[#FFFFFF80]">
              {AllText.AAddNewNodes.type2.step1.subTitle.replaceAll('xx', chooseedType?.iconName ?? '-')}
            </div>
            <Input
              maxLength={30}
              errorMessage="Please enter"
              className=" mt-5  w-full"
              classNames={{ 'inputWrapper': '!rounded-lg smd:!h-12' }}
              value={serialNum?.num}
              onChange={(e) => {
                const onlyLetters = e.target.value.replace(/[^a-zA-Z0-9]/g, '').trim();
                setSerialNum({ num: onlyLetters, type: 'x86' });
              }} />
            <div className="flex justify-center items-center mt-[.75rem] flex-col  gap-[.625rem]">
              <Btn isDisabled={!serialNum} isLoading={allStatus.isFetching} onClick={onX86Continue} className="w-full rounded-lg" >
                Continue
              </Btn>
            </div>
          </div>
        </div>,
    },

    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] smd:w-full">
            <div className="flex w-full  font-normal text-lg  smd:text-baseleading-5 justify-center smd:justify-start">
              {AllText.AAddNewNodes.type.step2.title}
            </div>

            <div className=" py-5 my-5 pl-5 smd:pr-5 bg-[#6D6D6D66] smd:flex-col  w-full flex gap-4 smd:gap-5 rounded-xl">

              <div className="w-[45%] smd:w-full smd:h-[12.5rem]">
                <img src={`./${deviceInfo?.nodeType}.png`} className=" object-contain rounded-lg  bg-white   w-full h-full" alt={`${data?.nodeType}`} />
              </div>


              {foundDeviceList(deviceInfo, isMobile)}
            </div>
            <div className={cn(' text-sm  text-center', {
              "text-[#FFFFFF80]": deviceInfo?.bindState === 'N/A',
              "text-[#FF6A6C]": deviceInfo?.bindState === 'Detected',
            }
            )}>
              {deviceInfo?.bindState === 'N/A' ? AllText.AAddNewNodes.type.step2.error[1] : AllText.AAddNewNodes.type.step2.error[0]}
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onPress={() => onX86StepNext()} className="w-full rounded-lg " >
                Continue
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] smd:w-full">
            <div className="flex w-full font-normal text-lg smd:text-base leading-5 justify-center font-Alexandria smd:justify-start">
              {AllText.AAddNewNodes.type.step3["Step 3: Configure your Edge Node"]}
            </div>

            <div className="text-xs mt-5 ">{AllText.AAddNewNodes.type.step3["Set a name for your Edge Node"]}</div>
            <Input maxLength={30} placeholder="Device Name" value={bindInfo.deviceName} onChange={(e) => { setBindInfo({ ...bindInfo, deviceName: e.target.value.replace(/[\u4e00-\u9fa5]/g, '') }) }} className="mt-[.3125rem]" classNames={{ 'inputWrapper': '!rounded-lg smd:h-12' }} />
            <label className="text-[#FFFFFF80] text-xs mt-[.625rem]">{AllText.AAddNewNodes.type.step3["You can change the name anytime later."]}</label>
            <div className="text-xs mt-[.9375rem]">Select Service Region</div>
            <Select
              items={data}
              onSelectionChange={(keys) => {
                setBindInfo({ ...bindInfo, regions: new Set(keys as Set<string>) });
              }}
              placeholder="Select an regions"
              className=" mt-[.3125rem]"
              classNames={{ 'base': '!rounded-lg !w-full smd:!h-12 ', 'popoverContent': '!w-full', 'innerWrapper': 'smd:!h-12 ', 'trigger': 'smd:!h-12', 'value': 'smd:text-base' }}
              selectedKeys={new Set(bindInfo.regions)}
            >
              {(animal: { code: string, name: string }) => <SelectItem key={animal.code}>{animal.name}</SelectItem>}
            </Select>

            {/* <div className="text-[#FF6A6C] text-xs font-normal mt-[10px]">
              Please select the right region for your Edge Node. You can only delete the node and then rebind to change the service region.
            </div> */}

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-[.75rem] ">
              <Btn isLoading={bind.isFetching} isDisabled={!bindInfo.deviceName || !Array.from(bindInfo.regions)[0]?.length} onClick={() => onBindingConfig()} className="w-full rounded-lg" >
                Add
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] flex flex-col gap-5 smd:w-full ">
            <div className="flex w-full justify-center font-normal text-lg smd:text-base leading-5 font-Alexandria">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              {AllText.AAddNewNodes.type.step4.content.replace('xxx', chooseedType?.iconName ?? '-')}

            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-full rounded-lg" onPress={() => onX86StepNext(true)} >
                OK
              </Btn>
            </div>
          </div>
        </div >,
    }
  ]



  return <div className="w-full mt-[4.5625rem] smd:mt-12 smd:mb-5 ">
    <div className=" flex justify-center flex-col md:items-center smd:w-full  w-[55.625rem] m-auto h-full ">
      {chooseedType?.value === 'x86'
        ? <div>  <X86 stepIndex={stepX86Index} x86Step={x86Step} /></div>
        : chooseedType?.value === 'box' ?
          <HomeBox stepIndex={stepIndex} homeBoxStep={homeBoxStep} /> :
          <div className="w-full text-center flex flex-col m-auto">
            <label className="font-normal text-lg leading-5 smd:text-base smd:text-left ">
              {AllText.AAddNewNodes.title}
            </label>
            <div className="flex  gap-10 smd:gap-4 mt-10 smd:mt-4 w-full justify-center smd:flex-col  m-auto smd:px-0 px-[3.75rem]">
              {deviceList.map((item, index) => {
                return <div onClick={() => {
                  // if (index && ENV !== 'staging') return
                  onSelectedType(item.iconName)
                  setChooseedType(item)
                  params.set("chooseType", item?.value as 'box' | 'box');
                  r.push(`?${params.toString()}`);
                }} key={`device_${index}`}
                  className={cn(`  text-center cursor-pointer w-full  hover:border-[#00E42A]  border-[#404040] border smd:rounded-2xl rounded-xl bg-[#404040] pt-5 px-5 flex items-center flex-col`,
                  )}>
                  <Image src={`../${item.iconName}.png`} classNames={{ 'wrapper': 'w-[18.75rem] smd:w-full smd:h-full h-[9.375rem] object-contain ' }} width={'100%'} height={'100%'} alt={item.iconName} />
                  <div className="flex items-baseline gap-1">
                    <div className="text-lg smd:text-base py-5 smd:py-4 w-full justify-center flex">{item.iconName}</div>
                    {/* <img src="../commingSoon.svg" hidden={!index} className="h-[10px]" /> */}
                  </div>
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
          if (isConfirmInfo.type) {
            onStepNext()
          } else {
            onX86StepNext()
          }
        }}
      />

    </div>
  </div>


}

export default AAddNewNodes
