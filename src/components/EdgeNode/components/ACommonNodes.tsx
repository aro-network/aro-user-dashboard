import { HelpTip } from "@/components/tips"
import { cn, Skeleton } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import { FC } from "react"
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io"

const ACommonNodes: FC<EdgeNodeMode.CommonProps> = ({ data, onOpenModal, className, isLoading }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const chooseType = params.get("nodeType") || '';

  return <div>
    <div className={cn(`grid grid-cols-[repeat(auto-fill,minmax(21.875rem,1fr))] smd:grid-cols-[repeat(auto-fill,minmax(100%,1fr))]  w-full gap-5 mt-5 `, className)}>
      {!isLoading && Array.isArray(data) && data.map((node, index) => {
        return <div
          key={`nodes_${index}`}
          onClick={() => onOpenModal(node)}
          className="bg-[#6D6D6D66] commonTab cursor-pointer hover:bg-[#6D6D6DCC] rounded-xl flex items-center gap-[1.0625rem] px-4 py-5">
          <div className="flex justify-center h-[130px] w-[130px] rounded-lg bg-[#FFFFFF26] items-center">
            {node.icon}
          </div>
          <div className="flex flex-col justify-between pb-[.3125rem] w-[60%] h-full ">
            <div className="flex flex-col">
              <div className="flex items-center  gap-[10px] ">
                <HelpTip content={node.deviceName}>
                  <label className="text-[#FFFFFF] text-lg truncate max-w-[8rem] smd:max-w-[6rem] ">
                    {node.deviceName}
                  </label>
                </HelpTip>
                <div className="flex items-center gap-1 ">
                  {node.status ? <IoIosCheckmarkCircle className="text-status-0 text-base " /> : <IoIosCloseCircle className="text-status-1 text-base" />}
                  <label
                    className={cn('text-base ', {
                      "text-status-0": node.status,
                      "text-status-1": !node.status
                    })}
                  >{node.status ? 'Online' : 'Offline'}</label>
                </div>
              </div>
              <label className="text-[#FFFFFF80] text-sm break-words">{node.nodeType === 'lite_node' ? node.nodeId : node.nodeUUID}</label>

            </div>
            <div className="w-full flex gap-[.625rem] smd:gap-[5px] text-sm items-center ">

              <div className="flex gap-1 items-center">
                {node.experience}
              </div>
            </div>
          </div>
        </div>
      })}
      {isLoading &&
        <Skeleton className="rounded-xl max-w-[24.375rem] smd:w-full"><div className="h-[12.5rem]  rounded-3xl" /></Skeleton>
      }
    </div>
  </div>

}
export default ACommonNodes