import { Btn } from "@/components/btns"
import { useCopy } from "@/hooks/useCopy"
import backendApi from "@/lib/api"
import { SVGS } from "@/svg"
import { Input, Select, SelectItem } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { IoIosCheckmarkCircle } from "react-icons/io"

const devicrsType = [
  { icon: SVGS.SvgXHomeBox, name: 'Home Box' },
  { icon: () => <img src='/x86Servers.png' alt="X86 Servers" />, name: 'X86 Servers', },
]

const HomeBox = ({ stepIndex, homeBoxStep }: { stepIndex: number, homeBoxStep: { content: ReactNode }[] }) => (
  <div>{homeBoxStep[stepIndex].content}</div>
);

const X86 = ({ stepIndex, x86Step }: { stepIndex: number, x86Step: { content: ReactNode }[] }) => (
  <div>{x86Step[stepIndex].content}</div>
);



const AAddNewNodes = () => {
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [chooseedType, setChooseedType] = useState('')
  const [stepIndex, setStepIndex] = useState(0)
  const [serialNum, setSerialNum] = useState('')
  const [deviceInfo, setDeviceInfo] = useState<Nodes.DevicesInfo>()
  const [bindInfo, setBindInfo] = useState<{ deviceName: string, regions: Set<string> }>({ deviceName: '', regions: new Set() })
  const r = useRouter()

  const onStepNext = () => {
    if (stepIndex < homeBoxStep.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {

      // setChooseedType('')
      // setStepIndex(0)
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["Regions"],
    queryFn: () => backendApi.getRegions(),
  });


  console.log('datadata', data);



  const onContinue = async () => {
    if (!serialNum) return
    console.log('serialNumserialNum', serialNum);
    try {
      const info = await backendApi.getDeviceStatusInfo(serialNum)
      console.log('info', info);
      setDeviceInfo(info)
      if (stepIndex < homeBoxStep.length - 1) {
        setStepIndex(stepIndex + 1)

      }

    } catch (err) {
      console.log('errr', err);
    }

  }

  const onBindingConfig = async () => {
    if (!bindInfo.deviceName && !Array.from(bindInfo.regions)[0]) return
    const result = await backendApi.bindingConfig(serialNum, bindInfo.deviceName, Array.from(bindInfo.regions)[0])

    console.log('result', result, bindInfo, Array.from(bindInfo.regions)[0]);

  }

  const onX86StepNext = () => {
    if (stepIndex < x86Step.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {

      // setChooseedType('')
      // setStepIndex(0)
    }
  }

  const onSubmit = (v: any) => {
    console.log('vvvvv',);
  }


  const homeBoxStep = [
    {
      content:
        <div className="flex w-full flex-col items-center">
          <div className="w-[23.75rem]">
            <div className="flex w-full font-normal text-lg leading-5">
              Step 1: Connect your device
            </div>
            <div className="mt-5 text-[#FFFFFF80]">
              Make sure your box is powered on and connected to the internet (with internet cable).
              Find the serial number (8-digit numbers) on your box and fill in:
            </div>
            <Input className=" mt-5" value={serialNum} onChange={(e) => setSerialNum(e.target.value)} />
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn onClick={onContinue} className="w-full" >
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
          <div className="w-[23.75rem] ">
            <div className="flex w-full  font-normal text-lg leading-5">
              Step 2: Bind Device to your account
            </div>
            <div className=" py-5 my-5 pl-5 bg-[#404040]  w-full flex gap-4 rounded-[1.25rem]">
              <div>
                <SVGS.SvgXHomeBox />
              </div>
              <div className="w-full">
                <div className="text-lg">Device found:</div>
                <div className="text-sm text-[#FFFFFF80]">
                  <div>Device Type: {deviceInfo?.nodeType || '-'}</div>
                  <div>Serial Number: {deviceInfo?.nodeUUID || '-'}</div>
                  <label className="flex items-center gap-[.625rem] ">
                    Network Status: <div className="flex items-center">
                      {deviceInfo?.online ? <IoIosCheckmarkCircle className="text-green-400" /> : <SVGS.Svgoffline />}
                      <label className={`ml-1 ${deviceInfo?.online && 'text-green-400'} `}>{deviceInfo?.online ? 'Online' : 'Detected'}</label>
                    </div>
                  </label>
                  <div>
                    Device IP: {deviceInfo?.ip || '-'}
                  </div>
                  <div>
                    Current Binding: <label className="text-yellow-300">{deviceInfo?.bindState || 'unbing'}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[#FFFFFF80] text-sm ">Please make sure your device is still online. Otherwise, the binding process will fail.             </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onClick={onStepNext} className="w-full" >
                Continue
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[23.75rem] ">
            <div className="flex w-full font-normal text-lg leading-5">
              Step 3: Configure your Edge Node
            </div>
            <div className="text-xs mt-5 ">Set a name for your Edge Node</div>
            <Input placeholder="Device Name" className="mt-[.3125rem]"   {...register('edgeNode',)} />
            <label className="text-[#FFFFFF80] text-xs">You can change the name anytime later.</label>
            <div className="text-xs mt-[.9375rem]">Select Service Region</div>
            <Select className=" mt-[.3125rem]"  {...register('region',)} >
              <SelectItem key={'region'}>Region</SelectItem>
            </Select>

            <div className="text-[#FF6A6C] text-xs font-normal mt-[10px]">
              Please select the right region for your Edge Node. You cannot change this setting after registration.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onClick={onStepNext} className="w-[15.625rem]" >
                Bind
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
              Edge Node (Device Type: Box) binding successful.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-full" >
                ok
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
          <div className="w-[23.75rem]">
            <div className="flex w-full font-normal text-sm leading-5">
              To add a new X86 Server Node, please refer to the guidance below.
            </div>
            <div className="mt-5 text-[#FFFFFF80] text-sm underline underline-offset-1">
              X86 Node Installation Guidance
            </div>
            <div className="mt-5 text-[#FFFFFF80] text-sm">
              Make sure you have followed the guidance and complete initial network configurations on your X86 Node CLI before continue.
            </div>
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn onClick={onX86StepNext} className="w-full" >
                Continue
              </Btn>
            </div>
          </div>
        </div>,
    },
    {
      content:
        <div className="flex w-full flex-col items-center">
          <div className="w-[23.75rem]">
            <div className="flex w-full font-normal text-sm leading-5 text-[#FFFFFF80]">
              Fill in the Virtual Serial Number in this box.
              (You will find the Virtual Serial Number on your X86 Node CLI after you have completed network configurations. )
              Please make sure your X86 Node is connected to the internet during the binding process. Otherwise the binding process will fail.
            </div>
            <Input
              errorMessage="Please enter"
              isInvalid={!serialNum}
              className=" mt-5" value={serialNum} onChange={(e) => setSerialNum(e.target.value.trim())} />
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn onClick={onContinue} className="w-full" >
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
          <div className="w-[23.75rem] ">

            <div className=" py-5 my-5 pl-5 bg-[#404040]  w-full flex gap-4 rounded-[1.25rem]">
              <div>
                <SVGS.SvgXHomeBox />
              </div>
              <div className="w-full">
                <div className="text-lg">Device found:</div>
                <div className="text-sm text-[#FFFFFF80]">
                  <div>Device Type: {deviceInfo?.nodeType || '-'}</div>
                  <div>Serial Number: {deviceInfo?.nodeUUID || '-'}</div>
                  <label className="flex items-center gap-[.625rem] ">
                    Network Status: <div className="flex items-center">
                      {deviceInfo?.online ? <IoIosCheckmarkCircle className="text-green-400" /> : <SVGS.Svgoffline />}
                      <label className={`ml-1 ${deviceInfo?.online && 'text-green-400'} `}>{deviceInfo?.online ? 'Online' : 'Detected'}</label>
                    </div>
                  </label>
                  <div>
                    Device IP: {deviceInfo?.ip || '-'}
                  </div>
                  <div>
                    Current Binding: <label className="text-yellow-300">{deviceInfo?.bindState || 'unbing'}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[#FFFFFF80] text-sm ">Please make sure your X86 Node is connected to the internet during the binding process. Otherwise the binding process will fail.</div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onClick={onX86StepNext} className="w-full" >
                Continue
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[23.75rem] ">
            <div className="flex w-full font-normal text-lg leading-5">
              Configure your Edge Node
            </div>
            <div className="text-xs mt-5 ">Set a name for your Edge Node</div>
            <Input placeholder="Device Name" value={bindInfo.deviceName} onChange={(e) => { setBindInfo({ ...bindInfo, deviceName: e.target.value.trim() }) }} className="mt-[.3125rem]" />
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
              <Btn onClick={onBindingConfig} className="w-full" >
                Bind
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
              Edge Node (Device Type: Box) binding successful.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-full" >
                ok
              </Btn>
            </div>
          </div>
        </div >,
    }
  ]




  return <div className="w-full ">
    <div className=" flex justify-center flex-col items-center ">
      {chooseedType.startsWith('X86')
        ? <div>  <X86 stepIndex={stepIndex} x86Step={x86Step} /></div>
        : chooseedType.startsWith('Home') ?
          <HomeBox stepIndex={stepIndex} homeBoxStep={homeBoxStep} /> :

          <><label className="font-normal text-lg leading-5">Please choose which type of Edge Node you want to add:</label><div className="flex justify-between gap-10 mt-10">
            {devicrsType.map((item, index) => {
              const IconComponent = item.icon;
              return <div onClick={() => setChooseedType(item.name)} key={`device_${index}`} className=" hover:border-[#4281FF] cursor-pointer border-[#404040] border rounded-[1.25rem] bg-[#404040] pt-5 px-4">
                <IconComponent />
                <div className="text-lg py-5 w-full justify-center flex">{item.name}</div>
              </div>
            })}
          </div>
          </>
      }

    </div>
  </div>


}

export default AAddNewNodes