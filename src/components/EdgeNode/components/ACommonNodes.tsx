import { HelpTip } from "@/components/tips"
import useMobileDetect from "@/hooks/useMobileDetect"
import { shortenMiddle } from "@/lib/utils"
import { cn, Skeleton } from "@nextui-org/react"
import { FC } from "react"
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io"

const ACommonNodes: FC<EdgeNodeMode.CommonProps> = ({ data, onOpenModal, className, isLoading }) => {
  const isMobile = useMobileDetect()
  return <div>
    <div className={cn(`grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] smd:grid-cols-[repeat(auto-fill,minmax(100%,1fr))]  w-full gap-5 mt-5 `, className)}>
      {!isLoading && Array.isArray(data) && data.map((node, index) => {
        return <div
          key={`nodes_${index}`}
          onClick={() => onOpenModal(node)}
          className="bg-[#6D6D6D66] cursor-pointer hover:bg-[#6D6D6DCC] rounded-[1.25rem] flex items-center gap-[1.0625rem] px-4 py-5">
          <div className="w-[40%]">
            {node.icon}
          </div>
          <div className="flex flex-col justify-between pb-[.3125rem] w-[60%] h-full ">
            <div className="flex flex-col">
              <div className="flex items-center  gap-[10px] ">
                <HelpTip content={node.deviceName}>

                  <label className="text-[#FFFFFF] text-lg  truncate">{shortenMiddle(node.deviceName, isMobile ? 12 : 15)} </label>
                </HelpTip>
                <div className="flex items-center gap-1 ">
                  {node.status ? <IoIosCheckmarkCircle className="text-[#4297FF] text-base " /> : <IoIosCloseCircle className="text-[#FF6A6C] text-base" />}
                  <label
                    className={cn('text-base ', {
                      "text-[#4297FF]": node.status,
                      "text-[#FF6A6C]": !node.status
                    })}
                  >{node.status ? 'Online' : 'Offline'}</label>
                </div>
              </div>
              <label className="text-[#FFFFFF80] text-sm break-words">{node.nodeId}</label>

            </div>
            <div className="w-full flex gap-[.625rem] text-sm items-center ">
              <div className="text-[#FFFFFF80]">
                {node.when}
              </div>
              <div className="flex gap-1 items-center">
                {node.experience}
              </div>
            </div>
          </div>
        </div>
      })}
      {isLoading &&
        <Skeleton className="rounded-2xl"><div className="h-[13.75rem] rounded-3xl" /></Skeleton>
      }
    </div>
  </div>

}
export default ACommonNodes