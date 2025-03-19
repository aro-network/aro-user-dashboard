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

  const onX86StepNext = () => {
    if (stepIndex < x86Step.length - 1) {
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
        <div className="flex w-full flex-col items-center">
          <div className="w-[23.75rem]">
            <div className="flex w-full font-normal text-lg leading-5">
              Step 1: Connect your device
            </div>
            <div className="mt-5 text-[#FFFFFF80]">
              Make sure your box is powered on and connected to the internet (with internet cable).
              Find the serial number (8-digit numbers) on your box and fill in:
            </div>
            <Input className=" mt-5"    {...register('serialNum',)} />
            <div className="flex justify-center items-center mt-5 flex-col  gap-[.625rem]">
              <Btn onClick={onStepNext} className="w-full" >
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
            <Input className="mt-5" />

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
        <div className="flex w-full justify-center flex-col items-center">
          <div className="w-[23.75rem] ">

            <div className=" py-5 my-5 pl-5 bg-[#404040]  w-full flex gap-4 rounded-[1.25rem]">
              <div>
                <SVGS.SvgXHomeBox />
              </div>
              <div className="w-full">
                <div className="text-lg">Device found:</div>
                <div className="text-sm text-[#FFFFFF80]">
                  <div>Device Type: X86 Server</div>
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
            <Input placeholder="Device Name" className="mt-[.3125rem]"   {...register('edgeNode',)} />
            <label className="text-[#FFFFFF80] text-xs mt-[.625rem]">You can change the name anytime later.</label>
            <div className="text-xs mt-[.9375rem]">Select Service Region</div>
            <Select className=" mt-[.3125rem]"  {...register('region',)} >
              <SelectItem key={'region'}>Region</SelectItem>
            </Select>

            <div className="text-[#FF6A6C] text-xs font-normal mt-[10px]">
              Please select the right region for your Edge Node. You cannot change this setting after registration.
            </div>

            <div className="flex justify-center items-center flex-col  gap-[.625rem] mt-5">
              <Btn onClick={onX86StepNext} className="w-full" >
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

  const HomeBox = () => {
    return <div>{homeBoxStep[stepIndex].content}</div>
  }

  const X86 = () => {
    return <div>{x86Step[stepIndex].content}</div>
  }

  return <div className="w-full ">
    <div className=" flex justify-center flex-col items-center ">
      {chooseedType.startsWith('X86')
        ? <div> <form onSubmit={handleSubmit(onSubmit)}> <X86 /> </form></div>
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