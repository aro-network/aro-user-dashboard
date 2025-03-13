import { SVGS } from "@/svg"
import { cn } from "@nextui-org/react"
import { FC, ReactNode } from "react"
import { IoIosCheckmarkCircle } from "react-icons/io"
export type nodeType = { deviceName: string, icon: React.ElementType, mode: string, when: string, experience: ReactNode, status: 'online' | 'offline' }
export type CommonProps = {
  data?: nodeType[] | null
  onOpenModal: (node: nodeType) => void,
  className?: string
}

const ACommonNodes: FC<CommonProps> = ({ data, onOpenModal, className }) => {
  return <div className={cn(`grid grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))] w-full gap-5 `, className)}>
    {Array.isArray(data) && data.map((node, index) => {
      return <div key={`nodes_${index}`} onClick={() => onOpenModal(node)} className="bg-[#6D6D6D66] rounded-[1.25rem] flex items-center gap-[1.0625rem] px-4 py-5">
        <div className="w-[40%]">
          <node.icon />
        </div>
        <div className="flex flex-col gap-14 w-[60%]  ">
          <div className="flex flex-col">
            <div className="flex items-center gap-[10px] ">
              <label className="text-[#FFFFFF] text-lg leading-10">{node.deviceName} </label>
              <div className="flex items-center gap-1">
                {node.status === 'online' ? <IoIosCheckmarkCircle className="text-[#34D399]" /> : <SVGS.Svgoffline />}
                <label className="text-[#FFFFFF80] text-xs">{node.status}</label>
              </div>
            </div>

            <label className="text-[#FFFFFF80] text-sm">{node.mode}</label>
          </div>
          <div className="w-full flex gap-[.625rem] text-sm items-center ">
            <div >
              {node.when}
            </div>
            <div className="flex gap-1 items-center">
              {node.experience}
            </div>
          </div>
        </div>
      </div>
    })}
  </div>
}
export default ACommonNodes