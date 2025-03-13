import { Btn } from "@/components/btns"
import { SVGS } from "@/svg"
import { Input, Select, SelectItem } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoIosCheckmarkCircle } from "react-icons/io"

const devicrsType = [
  { icon: SVGS.SvgXHomeBox, name: 'Home Box' },
  { icon: () => <img src='/x86Servers.png' alt="X86 Servers" />, name: 'X86 Servers', },
]
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
  const r = useRouter()
  const onStepNext = () => {
    if (stepIndex < homeBoxStep.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {

      // setChooseedType('')
      // setStepIndex(0)
    }
  }

  const onSubmit = (v: any) => {
    console.log('vvvvv', v);
  }


  const homeBoxStep = [
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[31.375rem]">
            <div className="flex w-full justify-center font-normal text-lg leading-5">
              Step 1: Connect your device
            </div>
            <div className="mt-5 text-[#FFFFFF80] text-center">
              Make sure your box is powered on and connected to the internet (with internet cable).
              Find the serial number (8-digit numbers) on your box and fill in:
            </div>
            <div className="my-5">
              <Input className="text-[#FFFFFF1A]" {...register('serialNum',)} />
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem]">
              <Btn onClick={onStepNext} className="w-[15.625rem]" >
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
          <div className="w-[31.375rem] ">
            <div className="flex w-full justify-center font-normal text-lg leading-5">
              Step 2: Bind Device to your accountt
            </div>
            <div className="mx-[4.375rem] py-5 my-5 pl-5 bg-[#404040]  flex gap-4 rounded-[1.25rem]">
              <div>
                <SVGS.SvgXHomeBox />
              </div>
              <div>
                <div className="text-lg">Device found:</div>
                <div className="text-sm text-[#FFFFFF80]">
                  <div>Device Type: Home Box</div>
                  <div>Serial Number: 53497402</div>
                  <label className="flex items-center gap-[.625rem] ">
                    Network Status: <div className="flex items-center"><IoIosCheckmarkCircle className="text-green-400" />
                      <label className="ml-1 text-green-400">Online</label>
                    </div>
                  </label>
                  <div>
                    Device IP: 198.121.1.2
                  </div>
                  <div>
                    Current Binding: <label className="text-yellow-300">N/A</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[#FFFFFF80] text-sm text-center">To continue binding process, please go to <button onClick={() => window.open('deviceConsole', '_blank')} className="text-[#4281FF] underline underline-offset-1"> device console</button> and simply follow the instructions inside the console. You will get an auth token from the console and you need to copy/paste the auth token back here.</div>
            <div className="my-5">
              <Input {...register('authToken',)} />
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onClick={onStepNext} className="w-[15.625rem]" >
                Continue Binding
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[31.375rem] ">
            <div className="flex w-full justify-center font-normal text-lg leading-5">
              Step 3: Edge Node Configurations
            </div>

            <div className="text-[#FFFFFF80] text-sm text-center">Your Edge Node will be ready soon. Please set Device Name and choose Region.            </div>
            <Input placeholder="Device Name" className=" mt-5"  {...register('deviceName',)} />
            <Select className=" mt-[.625rem]"  {...register('region',)} >
              <SelectItem key={'region'}>Region</SelectItem>
            </Select>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onClick={onStepNext} className="w-[15.625rem]" >
                Continue
              </Btn>
            </div>
          </div>
        </div >,
    },
    {
      content:
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[31.375rem] flex flex-col gap-5 ">
            <div className="flex w-full justify-center font-normal text-lg leading-5">
              Congratulations!
            </div>
            <div className="text-center text-sm 5">
              Your device binding is successful. This device will start serving EnReach Network as an Edge Node.
            </div>

            <div className="w-full flex justify-center flex-col">
              <button onClick={() => r.push('deviceConsole')} className="text-[#FFFFFF80] text-xs text-center underline underline-offset-1">Go to device console</button>
              <button className="text-[#FFFFFF80] text-xs text-center mt-[.625rem] underline underline-offset-1">Learn about how to bind this device to another account </button>
            </div>
            <div className="flex justify-center items-center flex-col  gap-[.625rem] ">
              <Btn type="submit" className="w-[15.625rem]" >
                Confirm and Back to Edge Node Page
              </Btn>
            </div>
          </div>
        </div >,
    }
  ]

  const HomeBox = () => {
    return <div>{homeBoxStep[stepIndex].content}</div>
  }


  return <div className="w-full ">
    <div className=" flex justify-center flex-col items-center ">
      {chooseedType.startsWith('X86')
        ? <div>servers</div>
        : chooseedType.startsWith('Home') ?
          <form onSubmit={handleSubmit(onSubmit)}> <HomeBox /> </form> :

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