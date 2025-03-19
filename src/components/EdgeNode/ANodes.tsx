import { SVGS } from "@/svg"
import { Btn } from "../btns"
import { useToggle } from "react-use";
import { useCallback, useState } from "react";
import ANodeInfo from "./components/ANodeInfo";
import ACommonNodes from "./components/ACommonNodes";
import AAddNewNodes from "./components/AAddNewNodes";

export const allNodes: EdgeNodeMode.CommonProps['data'] = [
  { deviceName: 'Home Node 001', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'online' },
  { deviceName: 'Home Node 002', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'offline' },
  { deviceName: 'Home Node 003', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'online' },
  { deviceName: 'Home Node 004', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'online' },
  { deviceName: 'Home Node 005', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'offline' },
  { deviceName: 'Home Node 006', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'online' },
]

const ANodes = () => {
  const [isOpen, setOpenAddNode] = useToggle(false);
  const [isShowNodeInfo, setShowNodeInfo] = useState(false);

  const handleToggleNodeInfo = useCallback(() => {
    setShowNodeInfo(true);
    setOpenAddNode(false);

  }, []);

  const title = isShowNodeInfo
    ? "Node Info"
    : isOpen
      ? "Add New Node"
      : "All Nodes";


  return (
    <>
      <div className=" flex justify-between mb-5 h-[2.125rem] items-center">
        <div className="text-[#FFFFFF] text-xs font-medium">
          {!isShowNodeInfo && !isOpen ? (
            title
          ) : (
            <>
              <button onClick={handleToggleNodeInfo}>Nodes</button> {">"}{" "}
              <label className="text-[#FFFFFF80]">{title}</label>
            </>
          )}
        </div>
        {!isShowNodeInfo && !isOpen && <Btn className="h-[2.125rem]" onClick={() => setOpenAddNode(!isOpen)} >Add New Node</Btn>}
      </div>

      {!isShowNodeInfo && !isOpen ?
        <ACommonNodes data={allNodes} onOpenModal={handleToggleNodeInfo} />
        : isOpen ? <AAddNewNodes /> : <ANodeInfo />
      }


    </>
  )
}

export default ANodes