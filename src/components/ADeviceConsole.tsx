import { FC } from "react"
import { TitModal } from "./dialogs"
import { FiAlertTriangle, FiCheckCircle, FiCopy } from "react-icons/fi"
import { Btn } from "./btns"

type AConfirmInfoProps = {
  isOpen: boolean,
  onClose: () => void
  onConfirm?: () => void
}
export const AConfirmInfo: FC<AConfirmInfoProps> = ({ isOpen, onClose }) => {
  return <TitModal isOpen={isOpen} className=" p-5 " >
    <div className="flex flex-col justify-center items-center self-stretch gap-5 flex-grow-0 flex-shrink-0 relative ">
      <FiCheckCircle className="text-[3.125rem]" />
      <p className="self-stretch flex-grow-0 flex-shrink-0 text-sm  text-white">
        <span className="self-stretch flex-grow-0 flex-shrink-0 text-sm font-semibold  text-white">A new Auth Token has been generated.  </span>
      </p>
      <div className="flex items-center w-full gap-[.625rem] ">
        <span className="text-[#34D399] text-base">5H73uVr7ZY......mEAzZb1wbn</span>
        <FiCopy className="text-base" />
      </div>
      <p className="text-[#FFFFFF99] text-sm">
        To continue binding process, please copy and paste this token to your binding process page.
      </p>
      <Btn className="w-full" onClick={onClose}>
        Ok
      </Btn>
    </div>
  </TitModal>
}


export const AGenerateModal: FC<AConfirmInfoProps> = ({ isOpen, onClose, onConfirm }) => {
  return <TitModal isOpen={isOpen} >
    <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
      <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-[1.875rem] mb-[1.875rem]">
        <FiAlertTriangle className="text-[3.125rem]" />
        <p className="self-stretch flex-grow-0 flex-shrink-0 text-sm  text-white">
          <span className="self-stretch flex-grow-0 flex-shrink-0 text-sm font-semibold  text-white">Are you sure you want to generate a new Auth Token? In case you have a previous binding, it will be expired after a new Auth Token is generated.
          </span>
          <br />
        </p>
      </div>
      <div className="w-full flex justify-between gap-[10px]">
        <Btn className="w-full bg-[#FFFFFF26]" onClick={onClose}>
          Cancel
        </Btn>
        <Btn className="w-full" onClick={onConfirm}>
          Confirm and Continue
        </Btn>
      </div>
    </div>
  </TitModal>
}