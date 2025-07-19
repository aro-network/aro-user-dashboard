import { Btn } from "@/components/btns"
import backendApi, { RES } from "@/lib/api"
import { cn, Image, Input, Select, SelectItem } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { FC, Fragment, ReactNode, Ref, useEffect, useImperativeHandle, useState } from "react"
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io"
import { addNewNodeList, covertName, covertText, installStep, isIPv6, shortenMiddle } from "@/lib/utils"
import { ConfirmDialog } from "@/components/dialogimpls"
import { HelpTip } from "@/components/tips"
import useMobileDetect from "@/hooks/useMobileDetect"
import { useRouter, useSearchParams } from "next/navigation";
import { AllText } from "@/lib/allText"
import { toast } from 'react-toastify';
import axios from "axios"

const deviceList: Nodes.DeviceType[] = [
  { name: 'ARO Pod', iconName: 'aro-pod', value: 'box' },
  { name: 'ARO Link', iconName: 'aro-link', value: 'link' },
  { name: 'ARO Client', iconName: 'aro-client', value: 'client' },
  { name: 'ARO Lite', iconName: 'aro-lite', value: 'lite' },

];

const deviceTypeList: { [key: 'box' | 'client' | 'link' | 'lite' | string]: Nodes.DeviceType } = {
  box: deviceList[0],
  link: deviceList[1],
  client: deviceList[2],
  lite: deviceList[3],
}

const CurrentNode = ({ step, typeStep }: { step: number, typeStep: { content: ReactNode }[] }) => (
  <div>{typeStep[step].content}</div>
);


export const foundDeviceList = (deviceInfo: Nodes.DevicesInfo | undefined, isMobile: boolean) => {
  const { nodeType = '-', nodeUUID = '-', online = '-', ip = '-', } = deviceInfo || {}


  const list = [
    { name: AllText.deviceInfo["Device Type"], value: covertText(nodeType as 'box' | 'x86') },
    { name: AllText.deviceInfo["Serial Number"], value: nodeUUID },
    {
      name: AllText.deviceInfo["Network Status"], value: <div className="flex items-center">
        {online ? <IoIosCheckmarkCircle className="text-status-0 text-sm" /> : <IoIosCloseCircle className="text-status-1 text-sm" />}
        <label className={`ml-1 text-sm ${online ? 'text-status-0' : 'text-status-1'} `}>{online ? 'Online' : 'Offline'}</label>
      </div>
    },
    { name: 'Device IP', value: ip },

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


const AAddNewNodes: FC<{ onBack: () => void, onClose: () => void, onSelectedType: (e: string) => void, addRef: Ref<Nodes.AddType> }> = ({ onBack, onSelectedType, addRef, onClose }) => {
  const [chooseedType, setChooseedType] = useState<Nodes.DeviceType | undefined>(undefined)
  const [stepIndex, setStepIndex] = useState(0)
  const [stepX86Index, setX86StepIndex] = useState(0)
  const [stepLiteIndex, setLiteStepIndex] = useState(0)
  const [serialNum, setSerialNum] = useState<{ type?: 'x86' | 'box', num?: string }>()
  const [deviceInfo, setDeviceInfo] = useState<Nodes.DevicesInfo>()
  const [bindInfo, setBindInfo] = useState<{ deviceName: string, regions: Set<string> }>({ deviceName: '', regions: new Set() })
  const [isConfirmInfo, setIsConfirmInfo] = useState<{ open: boolean, type?: string }>({ open: false, type: undefined })
  const isMobile = useMobileDetect()
  const r = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const searchType = params.get('chooseType') || ''



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
    if (searchType) {
      setChooseedType(deviceTypeList[searchType])
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
        setLiteStepIndex(0)

      },
    }),
    []
  );


  const { data } = useQuery({
    queryKey: ["Regions"],
    queryFn: async () => {
      const res = await backendApi.getRegions()
      const result = res.map((item: { code: string }) => {
        return { ...item, name: 'GLOBAL' }
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
      toast.error(AllText.AAddNewNodes.type.step1.error[0].replaceAll('xx', chooseedType?.name ?? '-'))
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
      toast.error(AllText.AAddNewNodes.type.step1.error[0].replaceAll('xx', chooseedType?.name ?? '-'))
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
            <div className="flex w-full font-normal smd:text-base text-lg  leading-5 justify-center font-Alexandria smd:justify-start ">
              {AllText.AAddNewNodes.type.step1.title}

            </div>
            <button className="mt-5 flex w-full justify-center smd:text-left text-center font-normal text-sm leading-5 text-[#FFFFFF80]">
              {AllText.AAddNewNodes.type.step1.subtitle.replaceAll('xxx', chooseedType?.name ?? '')}
            </button>
            <Input
              maxLength={30}
              className=" mt-5 "
              classNames={{ 'inputWrapper': '!rounded-lg h-12' }}
              value={serialNum?.num}
              onChange={(e) => {
                const onlyLetters = e.target.value.replace(/[^a-zA-Z0-9]/g, '').trim();
                setSerialNum({ num: onlyLetters, type: 'box' });
              }}

            />
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn isDisabled={!serialNum?.num} isLoading={allStatus.isFetching} onPress={onContinue} className="w-full rounded-lg  min-h-12" >
                Continue
              </Btn>
              <button hidden={searchType === 'link'} onClick={() => window.open('https://www.youtube.com/watch?v=ok8RW8hhYAw', '_blank')} className="underline underline-offset-1 text-[#999999] hover:text-[#00E42A] text-xs smd:pt-4">See Guidance</button>
            </div>
          </div>
        </div>,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[37.5rem] smd:w-full ">
            <div className="flex w-full  font-normal text-lg smd:text-base leading-5 justify-center font-Alexandria">
              {AllText.AAddNewNodes.type.step2.title}
            </div>
            <div className=" py-5 my-5 md:p-5 md:bg-[#6D6D6D66] smd:flex-col  w-full flex gap-4 smd:gap-5 rounded-xl">

              <div className="w-[45%] smd:w-full smd:h-[12.5rem]">
                <img src={`./${covertName[deviceInfo?.nodeType || 'box']}.png`} className=" object-cover rounded-lg  bg-white  w-full h-full" alt={`${covertName[deviceInfo?.nodeType || 'box']}`} />
              </div>
              {foundDeviceList(deviceInfo, isMobile)}
            </div>
            <div className={cn(' text-sm smd:text-left  text-center', {
              "text-[#FFFFFF80]": deviceInfo?.bindState === 'N/A',
              "text-[#FF6A6C]": deviceInfo?.bindState === 'Detected',
            }
            )}>
              {deviceInfo?.bindState === 'N/A' ? AllText.AAddNewNodes.type.step2.error[1] : AllText.AAddNewNodes.type.step2.error[0]}
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5 ">
              <Btn onPress={() => onStepNext()} className="w-full rounded-lg h-12  min-h-12" >
                Continue
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="md:flex md:w-full justify-center flex-col md:items-center">
          <div className="w-[37.5rem] smd:w-full  ">
            <div className="flex w-full font-normal  smd:justify-start text-lg smd:text-base leading-5 justify-center font-Alexandria">
              {AllText.AAddNewNodes.type.step3["Step 3: Configure your Edge Node"]}
            </div>
            <div className="text-xs w-full mt-5 font-Alexandria smd:text-sm">{AllText.AAddNewNodes.type.step3["Set a name for your Edge Node"]}</div>
            <Input maxLength={30} placeholder="Device Name" value={bindInfo.deviceName} onChange={(e) => { setBindInfo({ ...bindInfo, deviceName: e.target.value.replace(/[\u4e00-\u9fa5]/g, '') }) }} classNames={{ 'inputWrapper': '!rounded-lg h-12' }} className="mt-[.3125rem]" />
            <label className="text-[#FFFFFF80] text-xs smd:text-sm mt-[.625rem]">{AllText.AAddNewNodes.type.step3["You can change the name anytime later."]}</label>
            <div className="text-xs smd:text-sm mt-[.9375rem] font-Alexandria ">Select Service Region</div>
            <Select
              items={data}
              onSelectionChange={(keys) => {
                setBindInfo({ ...bindInfo, regions: new Set(keys as Set<string>) });
              }}
              placeholder="Select an regions"
              classNames={{ 'base': '!rounded-lg !w-full !h-12 ', 'popoverContent': '!w-full', 'innerWrapper': '!h-12 ', 'trigger': '!h-12', 'value': 'smd:text-base' }}
              className=" mt-[.3125rem] "
              selectedKeys={new Set(bindInfo.regions)}
            >
              {(animal: { code: string, name: string }) => <SelectItem classNames={{ 'wrapper': '!w-full', 'base': '!w-full' }} key={animal.code}>{animal.name}</SelectItem>}
            </Select>

            {/* <div className="text-[#FF6A6C] text-xs font-normal mt-[10px]">
              Please select the right region for your Edge Node. You can only delete the node and then rebind to change the service region.
            </div> */}

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-[1.375rem] ">
              <Btn isDisabled={!bindInfo.deviceName || !Array.from(bindInfo.regions)[0]?.length} isLoading={bind.isFetching} onPress={() => onBindingConfig('box')} className="w-full rounded-lg  min-h-12 " >
                Add
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center smd:mt-0">
          <div className="w-[37.5rem] smd:w-full flex flex-col gap-5 ">
            <div className="flex w-full justify-center font-normal text-lg leading-5 font-Alexandria">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              {AllText.AAddNewNodes.type.step4.content.replace('xxx', chooseedType?.name ?? '-')}
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn onPress={() => onStepNext(true)} type="submit" className="w-full rounded-lg  min-h-12" >
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
              {AllText.AAddNewNodes.type2.first.title.replace('xx', chooseedType?.name ?? '-')}
            </div>
            <button onClick={() => window.open('https://docs.aro.network/user-guides/software-setup', '_blank')} className="mt-5  text-center smd:flex justify-center w-full text-sm underline underline-offset-1">
              {chooseedType?.name + AllText.AAddNewNodes.type2.first["Node Installation Guidance"]}
            </button>
            <div className="mt-5 text-[#FFFFFF80] text-sm text-center">

              {AllText.AAddNewNodes.type2.first["Make sure you have followed the guidance and complete initial network configurations on your Software Node CLI before continue."].replaceAll('xx', chooseedType?.name ?? '')}
            </div>
            <div className="flex justify-center items-center mt-[.75rem]  flex-col  gap-[.625rem]">
              <Btn onClick={() => onX86StepNext()} className="w-full rounded-lg  min-h-12" >
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
              {AllText.AAddNewNodes.type2.step1.subTitle.replaceAll('xx', chooseedType?.name ?? '-')}
            </div>
            <Input
              maxLength={30}
              errorMessage="Please enter"
              className=" mt-5  w-full"
              classNames={{ 'inputWrapper': '!rounded-lg !h-12' }}
              value={serialNum?.num}
              onChange={(e) => {
                const onlyLetters = e.target.value.replace(/[^a-zA-Z0-9]/g, '').trim();
                setSerialNum({ num: onlyLetters, type: 'x86' });
              }} />
            <div className="flex justify-center items-center mt-[.75rem] flex-col  gap-[.625rem]">
              <Btn isDisabled={!serialNum} isLoading={allStatus.isFetching} onClick={onX86Continue} className="w-full rounded-lg  min-h-12" >
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
            <div className="flex w-full  font-normal text-lg  smd:text-base leading-5 justify-center smd:justify-start">
              {AllText.AAddNewNodes.type.step2.title}
            </div>

            <div className=" py-5 my-5 pl-5 smd:pr-5 md:bg-[#6D6D6D66]  smd:flex-col  w-full flex gap-4 smd:gap-5 rounded-xl">

              <div className="w-[45%] smd:w-full smd:h-[12.5rem]">
                <img src={`./${deviceInfo?.nodeType}.png`} className=" object-contain rounded-lg  bg-white   w-full h-full" alt={`${data?.nodeType}`} />
              </div>


              {foundDeviceList(deviceInfo, isMobile)}
            </div>
            <div className={cn(' text-sm smd:text-left   text-center', {
              "text-[#FFFFFF80]": deviceInfo?.bindState === 'N/A',
              "text-[#FF6A6C]": deviceInfo?.bindState === 'Detected',
            }
            )}>
              {deviceInfo?.bindState === 'N/A' ? AllText.AAddNewNodes.type.step2.error[1] : AllText.AAddNewNodes.type.step2.error[0]}
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onPress={() => onX86StepNext()} className="w-full rounded-lg  min-h-12" >
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
            <Input maxLength={30} placeholder="Device Name" value={bindInfo.deviceName} onChange={(e) => { setBindInfo({ ...bindInfo, deviceName: e.target.value.replace(/[\u4e00-\u9fa5]/g, '') }) }} className="mt-[.3125rem]" classNames={{ 'inputWrapper': '!rounded-lg h-12' }} />
            <label className="text-[#FFFFFF80] text-xs mt-[.625rem]">{AllText.AAddNewNodes.type.step3["You can change the name anytime later."]}</label>
            <div className="text-xs mt-[.9375rem]">Select Service Region</div>
            <Select
              items={data}
              onSelectionChange={(keys) => {
                setBindInfo({ ...bindInfo, regions: new Set(keys as Set<string>) });
              }}
              placeholder="Select an regions"
              className=" mt-[.3125rem]"
              classNames={{ 'base': '!rounded-lg !w-full !h-12 ', 'popoverContent': '!w-full !rounded-lg', 'innerWrapper': '!h-12 ', 'trigger': '!h-12', 'value': 'smd:text-base' }}
              selectedKeys={new Set(bindInfo.regions)}
            >
              {(animal: { code: string, name: string }) => <SelectItem key={animal.code}>{animal.name}</SelectItem>}
            </Select>

            {/* <div className="text-[#FF6A6C] text-xs font-normal mt-[10px]">
              Please select the right region for your Edge Node. You can only delete the node and then rebind to change the service region.
            </div> */}

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-[.75rem] ">
              <Btn isLoading={bind.isFetching} isDisabled={!bindInfo.deviceName || !Array.from(bindInfo.regions)[0]?.length} onClick={() => onBindingConfig()} className="w-full rounded-lg  min-h-12" >
                Add
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center smd:mt-0">
          <div className="w-[37.5rem] flex flex-col gap-5 smd:w-full ">
            <div className="flex w-full justify-center font-normal text-lg smd:text-base leading-5 font-Alexandria">
              Congratulations!
            </div>
            <div className="text-center text-sm ">
              {AllText.AAddNewNodes.type.step4.content.replace('xxx', chooseedType?.name ?? '-')}

            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-full rounded-lg  min-h-12" onPress={() => onX86StepNext(true)} >
                OK
              </Btn>
            </div>
          </div>
        </div >,
    }
  ]





  const bindExt = useQuery({
    queryKey: ["bingExtension", serialNum],
    enabled: false,
    refetchOnReconnect: false,
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: 'always',
    queryFn: () => backendApi.bindExtensionSN(serialNum?.num)
  });

  const onBindSn = async () => {
    const res = await bindExt.refetch()
    if (res.status === 'success') {
      if (stepLiteIndex < liteStep.length - 1) {
        setLiteStepIndex(stepLiteIndex + 1)
      }
    }

  }


  const onAddAnother = () => {
    setLiteStepIndex(0)
    setSerialNum({})
  }

  const onGoToDetail = () => {
    onClose()
    r.push(`?mode=testnet&tab=nodes&type=detail&nodeType=lite_node&nId=${bindExt.data?.nodeId}`)
    onAddAnother()
  }

  const isExtension = chooseedType?.value === 'lite'
  const extension = useQuery({
    queryKey: ["getExtensionInfo", isExtension],
    enabled: isExtension,
    refetchOnWindowFocus: 'always',
    queryFn: async () => await axios.get<RES<{
      "version"?: string,
      "downloadUrl"?: string
    }>>('https://preview-api.aro.network/api/common/liteNode/lastest')
  });

  const extensionInfo = extension?.data?.data.data


  console.log('extensionextensionextension', extension?.data?.data.data);




  const liteStep = [
    {
      content:
        <div className="flex w-full flex-col items-center justify-center py-5 px-3">
          <div className="w-[37.5rem] smd:w-full">
            <div className="flex w-full font-normal text-xl smd:text-base leading-5 mb-[30px] justify-center font-Alexandria smd:justify-start">
              {AllText.AAddNewNodes.lite.step1.title}
            </div>

            {installStep.map((item, index) => (
              <Fragment key={`step_${item.title}`}>
                <div className=" bg-[#FFFFFF14] text-sm text-center rounded-lg py-[15px] px-5 ">
                  <div className="flex justify-between items-center smd:flex-col">
                    <div className="flex gap-5 items-center">
                      <img src={item.icon} className="w-[50px] h-[50px]" />
                      <div className='text-sm flex gap-[5px] flex-col smd:w-full '>
                        <div className="font-semibold text-left">
                          {item.title}
                        </div>
                        <div className="text-primary text-left">
                          {item.Recommended}
                        </div>
                        <div className="text-left text-xs text-[#FFFFFF99]">
                          ARO Lite ver. {extensionInfo?.version || '0.0.1'}
                        </div>
                      </div>
                    </div>

                    <div className="smd:w-full smd:mt-5">
                      <Btn isDisabled={!index} onPress={() => window.open(index ? extensionInfo?.downloadUrl : item.downloadUrl)} className={`h-[30px] smd:w-full ${!index && 'cursor-not-allowed'}`}>DownLoad</Btn>
                    </div>
                  </div>
                </div>
                {index === 0 && (
                  <div className=" py-[10px] text-center font-semibold text-sm text-[#FFFFFFCC]">or</div>
                )}
              </Fragment>
            ))}


            <div className="flex justify-center mt-[10px]">
              <button onClick={() => window.open('https://docs.aro.network/user-guides/aro-lite/')} className="underline underline-offset-1 text-[#999999] hover:text-[#00E42A] text-xs smd:pt-4">See Guidance</button>
            </div>

            <div className="flex justify-center flex-col items-center mt-10 ">
              <div className="flex w-full font-normal text-xl smd:text-base leading-5 justify-center font-Alexandria smd:justify-start">
                {AllText.AAddNewNodes.lite.step2.title}
              </div>
              <div className=" mt-5 flex w-full justify-center text-center font-normal text-sm leading-5 text-[#FFFFFF80]">
                {AllText.AAddNewNodes.lite.step2.subTitle}
              </div>

              <Input
                maxLength={30}
                className=" mt-5 "
                classNames={{ 'inputWrapper': '!rounded-lg h-12' }}
                value={serialNum?.num}
                onChange={(e) => {
                  const onlyLetters = e.target.value.replace(/[^a-zA-Z0-9]/g, '').trim();
                  setSerialNum({ num: onlyLetters, type: 'box' });
                }}
              />

              <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem] w-full">
                <Btn isDisabled={!serialNum?.num} isLoading={allStatus.isFetching} onPress={onBindSn} className="w-full rounded-lg  min-h-12" >
                  Continue
                </Btn>
              </div>

            </div>
          </div>
        </div>,
    },
    {
      content:
        <div className="flex w-full flex-col items-center smd:mt-0">
          <div className="w-[37.5rem] smd:w-full">
            <div className="flex w-full justify-center font-normal text-lg leading-5 font-Alexandria">
              {AllText.AAddNewNodes.lite.step3["Congratulations!"]}
            </div>
            <div className="mt-5 flex w-full justify-center text-center font-normal text-sm leading-5 text-[#FFFFFF80]">
              {AllText.AAddNewNodes.lite.step3["Your ARO Lite has been added to your Dashboard successfully."]}
            </div>

            <div className="flex  items-center mt-[.75rem] smd:flex-col  gap-[.625rem] justify-between w-full">
              <Btn onPress={onAddAnother} className="w-full rounded-lg  min-h-12" >
                {AllText.AAddNewNodes.lite.step3["Add Another Node"]}
              </Btn>
              <Btn onPress={onGoToDetail} className="w-full rounded-lg  min-h-12" >
                {AllText.AAddNewNodes.lite.step3["Go to Node Details Page"]}

              </Btn>
            </div>
          </div>
        </div>,
    },

  ]


  const type = chooseedType?.value;


  const typeMap: Record<string, JSX.Element> = {
    client: <CurrentNode step={stepX86Index} typeStep={x86Step} />,
    box: <CurrentNode step={stepIndex} typeStep={homeBoxStep} />,
    link: <CurrentNode step={stepIndex} typeStep={homeBoxStep} />,
    lite: <CurrentNode step={stepLiteIndex} typeStep={liteStep} />,
  };

  const firstShow = (type === 'client' && stepX86Index === 1) || ((type === 'box' || type === 'link') && stepIndex === 0)


  const onOpen = (url?: string) => {
    if (!url) return
    window.open(url)
  }

  const rightTabList = addNewNodeList.find((item) => item.value === searchType || '')

  return <div className="w-full smd:mt-12 smd:mb-5 ">
    <div className=" flex justify-center flex-col md:items-center smd:w-full m-auto h-full">
      {type && typeMap[type] ?
        <div className="flex gap-5 smd:flex-col">
          <div className={`  commonTab rounded-xl p-10 smd:p-5 md:flex items-center`}>
            {typeMap[type]}
          </div>

          {firstShow && <div className="commonTab  rounded-xl p-5 w-[270px] smd:w-full">
            <img src={rightTabList?.icon} />
            <div
              className="rounded-xl  flex  gap-10 smd:gap-[30px]  smd:flex-wrap">
              <div className="text-left flex flex-col justify-between smd:justify-start ">
                <div className="text-xl text-white mt-5">{rightTabList?.name}</div>
                <div className="mt-[10px] h-[80px] flex flex-col justify-center">
                  {rightTabList?.description.map((item) => {
                    return <div key={`des_${item}`} className="text-sm text-left">{item}</div>
                  })}
                </div>
                <div className="text-sm">Cost: {rightTabList?.cost}</div>
                <div className="text-sm">Rewards: {rightTabList?.Rewards}</div>
                <div className="text-sm">User-friendly: {rightTabList && rightTabList!["User-friendly"]}</div>
                <div className=" mt-3 flex gap-5 text-xs ">
                  <button onClick={() => window.open(rightTabList?.url)} className="text-[#568AFF] underline underline-offset-1 text-nowrap">{rightTabList?.goToText}</button>
                  <button onClick={() => onOpen(rightTabList?.docs)} className="text-[#568AFF] underline underline-offset-1 text-nowrap">Learn more in docs</button>
                </div>
              </div>

            </div>

          </div>}
        </div>

        :
        // <div className="w-full text-center flex flex-col m-auto">
        //   <label className="font-normal text-lg leading-5 smd:text-base smd:text-left ">
        //     {AllText.AAddNewNodes.title}
        //   </label>
        //   <div className=" gap-5  smd:gap-4 mt-10 smd:mt-4 w-full  grid grid-cols-[repeat(auto-fill,minmax(19.375rem,1fr))] smd:grid-cols-[repeat(auto-fill,minmax(100%,1fr))]   m-auto smd:px-0">
        //     {deviceList.map((item, index) => {
        //       return <div onClick={() => {
        //         // if (item.name === 'ARO Lite') return
        //         onSelectedType(item.name)
        //         setChooseedType(item)
        //         params.set("chooseType", item?.value as 'box' | 'box');
        //         r.push(`?${params.toString()}`);
        //       }} key={`device_${index}`}
        //         className={cn(`  text-center cursor-pointer w-full hover:border-[#00E42A]  border-[#404040] border smd:rounded-2xl rounded-xl bg-[#404040] pt-5 px-5 flex items-center flex-col`,
        //           { 'hidden': item.name === 'ARO Lite' && isMobileDevice() }
        //         )}>
        //         <Image src={`../${item.iconName}.png`} classNames={{ 'wrapper': 'w-full smd:w-full smd:h-full h-[9.375rem] object-cover ' }} width={'100%'} height={'100%'} alt={item.iconName} />
        //         <div className="flex items-baseline gap-1">
        //           <div className="text-lg smd:text-base py-5 smd:py-4 w-full justify-center flex">{item.name}</div>
        //         </div>
        //       </div>

        //     })}
        //   </div>
        // </div>
        <div className="w-full m-auto text-center gap-[10px] flex flex-col">
          <div className=" text-lg ">{AllText.edgeNodes["Pick Your ARO Node to Start"]}</div>
          <div className="text-sm text-[#FFFFFF80]">
            {AllText.edgeNodes["Welcome aboard, new Aronauts! "]} <br />
            {AllText.edgeNodes["Explore ARO Network’s diverse nodes—hardware, software, and browser extensions—then choose the perfect ARO Node for you."]}
          </div>
          <div className={cn(`grid grid-cols-[repeat(auto-fill,minmax(540px,1fr))] h-full   smd:grid-cols-[repeat(auto-fill,minmax(100%,1fr))]  w-full gap-5 mt-5 `)}>
            {addNewNodeList.map((item, index) => {
              return <div
                key={`nodes_${index}`}
                className="bg-[#6D6D6D66]  commonTab  hover:bg-[#6D6D6DCC] rounded-xl  flex  gap-10 smd:gap-[30px] p-5 smd:flex-wrap">
                <div className="flex flex-col  justify-between smd:justify-start smd:w-full ">
                  <div className="md:w-[218px] smd:!w-full  h-[130px] smd:h-[170px]">
                    <img src={`../${item.icon}`} alt={item.name} className=" w-full h-full object-contain bg-white rounded-lg" />
                  </div>
                  <div className="smd:mt-4">
                    <Btn
                      className="h-[1.875rem] w-full flex justify-center text-center rounded-lg text-xs font-medium m-auto"
                      onPress={() => {
                        // onSelectedType(item.name)
                        // setChooseedType(item)
                        params.set("chooseType", item?.value as 'box' | 'box');
                        r.push(`?${params.toString()}`);
                      }}
                    >
                      Add an {item.name}

                    </Btn>
                  </div>
                </div>

                <div className="text-left flex flex-col justify-between smd:justify-start ">
                  <div className="text-xl ">{item.name}</div>
                  <div className="mt-[10px] h-[80px] smd:h-auto smd:mb-[10px] flex flex-col justify-center">
                    {item.description.map((item) => {
                      return <div key={`des_${item}`} className="text-sm text-left">{item}</div>
                    })}
                  </div>
                  <div className="text-sm">Cost: {item.cost}</div>
                  <div className="text-sm">Rewards: {item.Rewards}</div>
                  <div className="text-sm">User-friendly: {item["User-friendly"]}</div>
                  <div className=" mt-3 flex gap-5 smd:gap-[10px] text-xs">
                    <button onClick={() => window.open(item.url)} className="text-[#568AFF] underline underline-offset-1">{item.goToText}</button>
                    <button onClick={() => onOpen(item.docs)} className="text-[#568AFF] underline underline-offset-1">Learn more in docs</button>
                  </div>
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
