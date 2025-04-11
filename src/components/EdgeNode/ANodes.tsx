import { SVGS } from "@/svg"
import { Btn } from "../btns"
import { useToggle } from "react-use";
import { useCallback, useRef, useState } from "react";
import ANodeInfo from "./components/ANodeInfo";
import ACommonNodes from "./components/ACommonNodes";
import AAddNewNodes from "./components/AAddNewNodes";
import backendApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import AUnbind from "./components/AUnbind";
import { cn } from "@nextui-org/react";
export const allNodes: EdgeNodeMode.CommonProps['data'] = [
  { deviceName: 'Home Node 001', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'online' },
  { deviceName: 'Home Node 002', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'offline' },
  { deviceName: 'Home Node 003', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'online' },
  { deviceName: 'Home Node 004', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'online' },
  { deviceName: 'Home Node 005', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'offline' },
  { deviceName: 'Home Node 006', icon: SVGS.SvgDevice, mode: 'H8SMNNOP5', when: 'Today', experience: < ><label className="text-[#4281FF]">+3.7</label><label>$REACH</label></>, status: 'online' },
]


export type addType = { switchTo: () => void; }

const ANodes = () => {
  const [isOpen, setOpenAddNode] = useToggle(false);
  const [isShowNodeInfo, setShowNodeInfo] = useState<{ open: boolean, list?: EdgeNodeMode.NodeType }>({ open: false, list: undefined });
  const [unbindInfo, setUnbingInfo] = useState<string | undefined>('');
  const [selectedType, setSelectedType] = useState('')
  const addRef = useRef<addType>(null)



  const handleToggleNodeInfo = useCallback((e: EdgeNodeMode.NodeType) => {
    console.log('handleToggleNodeInfoeeee', e);

    setShowNodeInfo({ open: true, list: e });
    setOpenAddNode(false);

  }, []);

  const title = isShowNodeInfo.open && !unbindInfo
    ? "Node Details"
    : isOpen
      ? "Add New Node"
      : unbindInfo ? 'Unbind' : "All Nodes";


  const { data, isFetching, refetch } = useQuery({
    queryKey: ["NodeList"],
    enabled: true,
    queryFn: async ({ pageParam: pageNum }) => {
      const pageSize = 10
      const pageParams = { pageSize, pageNum }
      const data = await backendApi.getNodeList()
      const list = data.map((item) => {
        return {
          deviceName: item.nodeName,
          icon: <img src={`./${item.nodeType}.png`} alt={`${item.nodeType}`} style={{ height: '100%', width: '100%' }} />,
          mode: item.nodeUUID,
          when: 'Today',
          experience: <><label className="text-[#4281FF] text-2xl font-semibold leading-6">{item.rewards}</label><label>$Berry</label></>,
          status: item.online,
          nodeId: item.nodeUUID
        }
      })


      return list
    }

  });

  console.log('unbindInfounbindInfo', unbindInfo, title);



  return (
    <>
      <div className=" flex justify-between mb-5 h-[2.125rem] items-center">
        <div className="text-[#FFFFFF] text-xs font-medium">
          {!isShowNodeInfo.open && !isOpen && !unbindInfo ? (
            title
          ) : (
            <>
              <button
                onClick={() => {
                  setShowNodeInfo({ open: false, list: undefined });
                  setOpenAddNode(false)
                  setUnbingInfo('')
                  refetch()
                  setSelectedType('');
                }
                }>
                Nodes
              </button> {">"}{" "}
              <label
                onClick={() => {
                  if (title !== 'Add New Node') return
                  addRef.current?.switchTo();
                  setSelectedType('')
                }}
                className={cn({
                  "text-[#FFFFFF80]": !selectedType,
                  "text-[#FFFFFF] cursor-pointer": selectedType
                })}>{title}</label>
              {selectedType && <span> {'>'}  <span className={'text-[#FFFFFF80]'}> {selectedType}</span>
              </span>}
            </>
          )}
        </div>
        {!isShowNodeInfo.open && !isOpen ? <Btn className="h-[2.125rem]" onClick={() => { setOpenAddNode(!isOpen) }} >Add New Node</Btn> :
          !isOpen && !unbindInfo && <div className="flex gap-[.625rem] font-medium text-xs leading-3">
            <Btn className="h-[1.875rem] rounded-lg">Go to Web Console</Btn>
            <Btn onClick={() => setUnbingInfo(isShowNodeInfo.list?.nodeId)} className="bg-[#F5F5F51A] h-[1.875rem] rounded-lg ">Delete</Btn>
          </div>

        }

      </div>


      {unbindInfo ? <AUnbind nodeId={unbindInfo}
        onBack={
          () => {
            setUnbingInfo('')
            setShowNodeInfo({ open: false, list: undefined });
            setOpenAddNode(false);
            refetch()
          }

        } /> : (!isShowNodeInfo.open && !isOpen ?
          <ACommonNodes isLoading={isFetching} data={data} onOpenModal={handleToggleNodeInfo} />
          : isOpen ?
            <AAddNewNodes
              addRef={addRef}
              onSelectedType={setSelectedType}
              onBack={() => {
                setShowNodeInfo({ open: false, list: undefined });
                setOpenAddNode(!isOpen)
                refetch()

              }} />
            : <ANodeInfo
              onSwitchToUnbind={() => {
                setShowNodeInfo({ open: false, list: undefined });
                setOpenAddNode(false);
              }}
              selectList={isShowNodeInfo.list} />
      )
      }


    </>
  )
}

export default ANodes