import { HelpTip } from "@/components/tips"
import { cn, Skeleton } from "@nextui-org/react"
import { FC } from "react"
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io"

const ACommonNodes: FC<EdgeNodeMode.CommonProps> = ({ data, onOpenModal, className, isLoading }) => {
  return <div>
    <div className={cn(`grid grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))] w-full gap-5 mt-5 `, className)}>
      {!isLoading && Array.isArray(data) && data.map((node, index) => {
        return <div
          key={`nodes_${index}`}
          onClick={() => onOpenModal(node)}
          className="bg-[#6D6D6D66] cursor-pointer hover:bg-[#6D6D6DCC] rounded-[1.25rem] flex items-center gap-[1.0625rem] px-4 py-5">
          <div className="w-[40%]">
            {node.icon}
          </div>
          <div className="flex flex-col gap-14 justify-between pb-[.625rem] w-[60%] h-full ">
            <div className="flex flex-col">
              <div className="flex items-center  gap-[10px] ">
                <HelpTip content={node.deviceName}>
                  <label className="text-[#FFFFFF] text-lg  truncate">{node.deviceName} </label>
                </HelpTip>
                <div className="flex items-center gap-1 ">
                  {node.status ? <IoIosCheckmarkCircle className="text-[#34D399] text-lg " /> : <IoIosCloseCircle className="text-[#FF6A6C] text-lg" />}
                  <label
                    className={cn(' text-lg ', {
                      "text-[#34D399]": node.status,
                      "text-[#FF6A6C]": !node.status
                    })}
                  >{node.status ? 'Online' : 'Offline'}</label>
                </div>
              </div>

              <label className="text-[#FFFFFF80] text-sm">{node.mode}</label>
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