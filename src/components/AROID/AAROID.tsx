import { useAuthContext } from "@/app/context/AuthContext";
import { MAvatar } from "../avatar"
import { useAppKitAccount } from "@reown/appkit/react";
import { Btn } from "../btns";
import { formatStr } from "@/lib/utils";
import { FiEdit } from "react-icons/fi";
import { useToggle } from "react-use";
import { ForceModal, TitModal } from "../dialogs";
import { BsExclamationCircle } from 'react-icons/bs'
import { AConfirmInfo, AGenerateModal } from "../ADeviceConsole";
import { CiCircleQuestion } from "react-icons/ci";
import { HelpTip } from "../tips";
import { useEffect, useRef, useState } from "react";
import useMobileDetect from "@/hooks/useMobileDetect";
import { SVGS } from "@/svg";
import { InputSplitCode } from "../inputs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import backendApi from "@/lib/api";
import { AllText } from "@/lib/allText";


const AAROID = () => {
  const [isOpen, setOpenAddNode] = useToggle(false);
  const [isSeOpen, setSeOpenAddNode] = useToggle(false);

  const ac = useAuthContext();
  const user = ac.queryUserInfo?.data;
  const username = user?.email?.split('@')[0] || ''
  const { address } = useAppKitAccount()
  const isMobile = useMobileDetect()
  const helpTipRef = useRef<any>(null);
  const [showInputReferral, toggleShowInputReferral] = useToggle(false);
  const [referalCode, setReferalCode] = useState("");
  const queryClient = useQueryClient();

  const onConfrim = async () => {
    await backendApi.addInviteCode(referalCode)
    queryClient.invalidateQueries({ queryKey: ["QueryUserInfo"] });
    toggleShowInputReferral(false)
  }

  return <div className="w-full justify-center flex mt-10 ">

    <div className="flex items-center gap-[.625rem] bg-[#6D6D6D66] p-5 rounded-xl flex-col w-[37.875rem]">

      <div className="flex items-center justify-start w-full gap-5 smd:gap-[.625rem] mb-[.625rem] ">
        <div className="w-[3.75rem] smd:w-8  ">
          {/* <MAvatar name={user?.email} /> */}
          <MAvatar name={user?.email} size={120} className="smd:hidden" />
          <MAvatar name={user?.email} size={36} className="md:hidden" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <label className="text-2xl smd:text-base font-medium">{username}</label>
            {/* <label className={'text-base'}><FiEdit /></label> */}
          </div>
          <p className="font-normal smd:text-sm text-sm mt-2 text-[#FFFFFF99]">{user?.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[.625rem] mx-5  w-full ">
        <div className="bg-[#FFFFFF14] rounded-lg py-[.9375rem] px-5 ">
          <div className=" font-semibold text-sm smd:text-base ">ARO UID</div>
          <div className="font-normal text-xs smd:text-sm mt-2 text-[#FFFFFF99]">{user?.id}</div>
        </div>
        <div className="bg-[#FFFFFF14] rounded-lg py-[.9375rem] px-5 smd:flex-col smd:gap-5 smd:w-full flex items-center smd:items-start justify-between ">
          <div>
            <div className=" font-semibold text-sm smd:text-base  ">Who Referred Me</div>
            <div className="font-normal text-xs text-[#FFFFFF99] smd:text-sm  mt-2">{user?.invited === false ? 'You are not referred by anyone. ' : user?.inviteUserEmail}</div>
          </div>
          <div hidden className={`flex justify-between smd:justify-center smd:w-full gap-[.625rem]  items-center ${user?.invited === true ? 'hidden' : ''}`}>
            <Btn onPress={toggleShowInputReferral} className="h-[2.125rem] smd:!h-[2.125rem]">Add Referrer</Btn>
          </div>
        </div>
        <div className="bg-[#FFFFFF14] rounded-lg py-[.9375rem] px-5 smd:flex-col smd:w-full flex items-center smd:items-start justify-between ">
          <div>
            <div className=" font-semibold text-sm flex gap-2 items-center  smd:text-base ">
              Bind Your EVM Address
              <div className="text-[#FFFFFF80] " >

                <HelpTip content='This function is not available in Devnet.'>
                  <div>
                    <SVGS.SvgQuesiton />
                  </div>
                </HelpTip>
              </div>

            </div>

            <div className="font-normal text-xs smd:text-sm mt-2  text-[#FFFFFF99]">
              -
            </div>
          </div>
          <div className="flex justify-between smd:justify-center smd:w-full gap-[.625rem]  items-center">
            <Btn disabled={true} className="h-[2.125rem] smd:!h-[2.125rem] bg-default">Bind</Btn>
            <Btn disabled={true} className="h-[2.125rem] smd:!h-[2.125rem] bg-default ">Unbind</Btn>
          </div>
        </div>


      </div>
      <div className="flex justify-end w-full gap-6 ">
        <button onClick={() => window.open('https://aro.network/terms')} className="text-[#999999]  hover:text-[#00E42A] !text-xs underline underline-offset-1 ">Terms of Use</button>
        <button onClick={() => window.open('https://aro.network/privacy')} className="text-[#999999]  hover:text-[#00E42A] !text-xs underline underline-offset-1 ">Privacy Policy</button>
      </div>
      <ForceModal isOpen={showInputReferral} className="!w-[650px] smd:!w-full smd:!mx-5">
        <p className="self-stretch flex-grow-0 flex-shrink-0 font-semibold  text-base text-center  text-white">Add Referrer</p>
        <p className="self-stretch flex-grow-0 flex-shrink-0 text-center text-sm text-white/50">{AllText.aroId.addReferrer.content}</p>
        <InputSplitCode onChange={setReferalCode} />
        <div className="flex w-full gap-[.625rem]">
          <Btn color='default' className="w-full  bg-default border !border-white text-white hover:bg-l1" onPress={() => {
            setReferalCode('')
            toggleShowInputReferral(false)
          }} >
            Cancel
          </Btn>
          <Btn isDisabled={referalCode.length !== 6} className="w-full" onPress={() => {
            setReferalCode('')
            onConfrim()
          }

          }  >
            Confirm
          </Btn>
        </div>

      </ForceModal>
    </div>
  </div>

}

export default AAROID
