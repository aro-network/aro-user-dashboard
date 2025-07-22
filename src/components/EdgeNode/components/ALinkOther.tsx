'use client'
import { useAuthContext } from "@/app/context/AuthContext";
import { Btn } from "@/components/btns"
import { AllText } from "@/lib/allText"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ALinkOther = () => {
  const ac = useAuthContext();
  const r = useRouter()

  const onCancel = () => {
    // ac.setLink('')
    r.back()
  }

  const onConfirm = () => {
    window.open(`http://${ac.link}:40001`)

  }

  return <div className=" justify-center mt-[8.8125rem]  w-[32.5rem] smd:px-5 smd:w-full flex flex-col m-auto items-center">
    <div className="text-lg">
      {AllText["Access Your Device’s Web Console"]}
    </div>
    <div className="text-[#FFFFFF80] text-center mt-5">
      {AllText["To access the Web Console for your ARO Node device, your computer or phone must be connected to the same Wi-Fi network as the device. If you’re not on the same network, you may not be able to connect."]}
    </div>
    <div className="w-full flex justify-between gap-[10px] mt-5">
      <Btn className="w-full   bg-default border !border-white text-white hover:bg-l1 " onPress={onCancel}>
        Cancel
      </Btn>
      <Btn className="w-full" onPress={onConfirm}>
        Continue
      </Btn>
    </div>
  </div>
}

export default ALinkOther