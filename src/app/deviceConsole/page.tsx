"use client";

import { AConfirmInfo, AGenerateModal } from "@/components/ADeviceConsole";
import { Btn } from "@/components/btns";
import { SVGS } from "@/svg"
import { useState } from "react"
import { FiLink, FiSettings } from "react-icons/fi";
import { IoIosArrowBack, IoIosCheckmarkCircle } from "react-icons/io"
import { useToggle } from "react-use";



const deviceConsole = () => {
  const [stepIndex, setStepIndex] = useState(0)
  const [isOpen, toggleOpen] = useToggle(false);
  const [isSeOpen, seToggleOpen] = useToggle(false);


  const onStepNext = () => {
    if (stepIndex < deviceConsoleStep.length - 1) {
      setStepIndex(stepIndex + 1)
    }
  }

  const onStepBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1)
    }
  }

  const deviceConsoleStep = [
    {
      content: <div className="flex  w-[23.625rem] justify-center flex-col items-center">
        <div className="text-lg mt-11">Device Console</div>
        <div className="mx-[4.375rem] py-5 my-5 pl-5 bg-[#404040] w-full  flex gap-4 rounded-[1.25rem]">
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
        <div className="text-sm text-[#FFFFFF80] mt-8 mb-5">
          Choose what you want to do with your device:
        </div>
        <div className="flex w-full gap-[.625rem] justify-between ">
          <Btn onClick={onStepNext} className="  font-medium text-xs flex-col flex h-[7.375rem] rounded-[20px] px-5">
            <FiLink className="text-[1.875rem]" />
            <div className="">
              <div>
                Bind Device to EnReach
              </div>
              <div>Account</div>
            </div>

          </Btn>
          <Btn className=" font-medium text-xs  flex-col flex h-[7.375rem] rounded-[20px]">
            <FiSettings className="text-[1.875rem]" />
            Device Status & Settings
          </Btn>
        </div>
      </div>
    },
    {
      content: <div className="flex w-[30rem] justify-center flex-col items-center">
        <button onClick={onStepBack} className="text-lg mt-11 flex gap-[.625rem] items-center"><IoIosArrowBack />Bind Device</button>
        <div className="flex flex-col gap-5 mt-[6.25rem]">
          <div className="text-sm text-[#FFFFFF80] flex   ">
            <div>
              This operation is required when you want to bind this device to a new EnReach account. An Auth Token will be generated for binding.
              For more information, please refer to this <label className=" underline underline-offset-1 text-[#4281FF]"> guidance.</label>
            </div>

          </div>
          <div className="text-[#FF6A6C] text-xs">
            Warning: If you generate a new Auth Token, the previous binding (if there is any) will expire.
          </div>
          <div className="flex w-full gap-[.625rem] justify-between ">
            <Btn onClick={() => toggleOpen()} className=" font-medium text-xs w-full ">
              Generate New Auth Token
            </Btn>
            <Btn className=" font-medium text-xs  w-full">
              Generate New Auth Token
            </Btn>
          </div>
        </div>
      </div>
    },
  ]


  return <div className=" bg-[#404040] h-screen px-[3.125rem] pt-[.9375rem] overflow-hidden">
    <img src="/logo.svg" className={`shrink-0 rotate-90 lg:ml-0 max-w-[9.375rem] h-[2.375rem] lg:rotate-0 `} alt="Logo" />
    <div className="bg-[#222222]  w-full flex justify-center mt-4  rounded-[1.25rem] h-full items-start">
      {deviceConsoleStep[stepIndex].content}
      <AGenerateModal isOpen={isOpen} onClose={() => toggleOpen(false)} onConfirm={() => { toggleOpen(false); seToggleOpen() }} />
      <AConfirmInfo isOpen={isSeOpen} onClose={() => seToggleOpen(false)} />
    </div>
  </div>
}

export default deviceConsole