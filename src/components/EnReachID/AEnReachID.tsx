import { useAuthContext } from "@/app/context/AuthContext";
import { MAvatar } from "../avatar"
import { useAppKitAccount } from "@reown/appkit/react";
import { Btn } from "../btns";
import { formatStr } from "@/lib/utils";
import { FiEdit } from "react-icons/fi";
import { useToggle } from "react-use";
import { TitModal } from "../dialogs";
import { BsExclamationCircle } from 'react-icons/bs'
import { AConfirmInfo, AGenerateModal } from "../ADeviceConsole";


const AEnReachID = () => {
  const [isOpen, setOpenAddNode] = useToggle(false);
  const [isSeOpen, setSeOpenAddNode] = useToggle(false);
  const [isTipOpen, setOpenTip] = useToggle(false);

  const ac = useAuthContext();
  const user = ac.queryUserInfo?.data;
  const username = user?.email?.split('@')[0] || ''
  const { address } = useAppKitAccount()



  return <div className="w-full justify-center flex ">

    <div className="flex items-center gap-[.625rem] bg-[#6D6D6D66] p-5 rounded-3xl flex-col w-[37.875rem]">

      <div className="flex items-center justify-start w-full gap-5 mb-5 ">
        <div className="w-[3.75rem] ">
          <MAvatar name={user?.email} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <label className="text-2xl font-medium">{username}</label>
            <label className={'text-base'}><FiEdit /></label>
          </div>
          <p className="font-normal text-sm text-[#FFFFFF99]">{user?.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[.625rem] mx-5  w-full ">
        <div className="bg-[#FFFFFF14] rounded-lg py-[.9375rem] px-5 ">
          <div className=" font-semibold text-sm ">EnReach UID</div>
          <div className="font-normal text-xs text-[#FFFFFF99]">AWJDIVVBOFNZ</div>
        </div>
        <div className="bg-[#FFFFFF14] rounded-lg py-[.9375rem] px-5 flex items-center justify-between ">
          <div>
            <div className=" font-semibold text-sm ">
              Address
            </div>
            <label className="font-normal text-xs text-[#FFFFFF99]">
              -
            </label>
          </div>
          <div className="flex justify-between gap-[.625rem] items-center">
            <Btn className="h-[2.125rem]">Bind</Btn>
            <Btn disabled={true} className="h-[2.125rem]">Unbind</Btn>
          </div>
        </div>

      </div>
      <div className="flex justify-end w-full gap-6 ">
        <label className="text-[#999999] text-xs underline underline-offset-1 ">Term of Use</label>
        <label className="text-[#999999] text-xs underline underline-offset-1 ">Privacy Policy</label>
      </div>
    </div>
  </div>

}

export default AEnReachID