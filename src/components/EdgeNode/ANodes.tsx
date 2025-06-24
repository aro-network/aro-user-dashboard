import { Btn } from "../btns";
import { useToggle } from "react-use";
import { useEffect, useMemo, useRef, useState } from "react";
import ANodeInfo from "./components/ANodeInfo";
import ACommonNodes from "./components/ACommonNodes";
import AAddNewNodes from "./components/AAddNewNodes";
import backendApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import AUnbind from "./components/AUnbind";
import { cn } from "@nextui-org/react";
import { covertName, formatNumber, sortIp } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";
import { debounce } from "lodash";
import { AllText } from "@/lib/allText";
import { ForceModal } from "../dialogs";



const ANodes = () => {
  const [isOpen, setOpenAddNode] = useToggle(false);
  const [unbindInfo, setUnbingInfo] = useState<string | undefined>("");
  const [selectedType, setSelectedType] = useState("");
  const addRef = useRef<Nodes.AddType>(null);
  const [nodeInfo, setNodeInfo] = useState<Nodes.NodeInfoList>();
  const r = useRouter()
  const searchParams = useSearchParams();
  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);
  const ac = useAuthContext();
  const nId = params.get("nId") || ''
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [openLink, setOpenLink] = useState('')

  const title =
    nId && !unbindInfo
      ? "Node Details"
      : isOpen
        ? "Add New Node"
        : unbindInfo
          ? "Delete"
          : "All Nodes";


  const refetchRes = debounce(() => {
    refetch();
  }, 1300);

  const { data = [], isFetching, refetch, isLoading } = useQuery({
    queryKey: ["NodeList"],
    enabled: false,
    refetchOnWindowFocus: 'always',
    staleTime: 0,
    refetchOnMount: false,
    queryFn: async ({ pageParam: pageNum }) => {
      const pageSize = 10;
      const pageParams = { pageSize, pageNum };
      const data = await backendApi.getNodeList();

      const list = data.map((item) => {

        return {
          nodeType: item.nodeType,
          deviceName: item.nodeName,
          icon: (
            <img
              src={`./${covertName[item.nodeType]}.png`}
              alt={`${covertName[item.nodeType]}`}
              className="w-[135px] h-[130px] smd:w-[104px] smd:h-[100px] object-cover rounded-lg"
            />
          ),
          nodeUUID: item.nodeUUID,
          when: "Today",
          experience: (
            <>
              <label className="text-[#00E42A] text-2xl font-semibold leading-6">
                +{formatNumber(Number(item.todayRewards) || 0)}
              </label>
              <label className="ml-[.375rem]">Jades</label>
            </>
          ),
          status: item.online,
          nodeId: item.nodeId,
        };
      });

      setIsInitialLoading(false)
      return list;
    },
  });


  const updateURL = (key: string, value: string) => {
    params.set(key, value);
    r.push(`?${params.toString()}`);

  };

  const handleToggleNodeInfo = (e: EdgeNodeMode.NodeType) => {
    if (isInitialLoading) return
    params.delete('chooseType')
    updateURL('type', 'detail')
    updateURL('nId', `${e.nodeUUID}`)
    setOpenAddNode(false);
  }

  useEffect(() => {
    const typeParam = params.get("type");
    const showAdd = typeParam === 'add';
    const showDetail = typeParam === 'detail';
    const showDel = typeParam === 'del';
    const showLink = typeParam === 'link';
    const type = params.get("chooseType");
    const obj: { [key: 'box' | 'x86' | string]: string } = {
      box: 'Aro Pod',
      x86: 'Aro Client',
      lite: 'Aro Lite',
      link: 'Aro Link'
    }

    if (showAdd) {
      setOpenAddNode(showAdd);
      updateURL('type', 'add')
      if (type) {
        setSelectedType(obj[type]);
      }
    } else if (showDetail && nId) {
      setUnbingInfo('')
      updateURL('type', 'detail')
    } else if (showDel && nId) {
      setUnbingInfo(nId)
      updateURL('type', 'del')
    } else if (showLink) {
      updateURL('type', 'link')
    } else {
      closeAll()
    }

  }, [nId, searchParams, params]);


  const closeAll = () => {
    setIsInitialLoading(true)

    addRef.current?.switchTo();
    setUnbingInfo('')
    setSelectedType("");
    setOpenAddNode(false);
    params.delete('type')
    params.delete('chooseType')
    params.delete('nId')
    r.push(`?${params.toString()}`);
    refetchRes()

  }


  return (
    <>
      <div className={` flex justify-between items-center  ${nId && 'smd:flex-wrap smd:w-full'}`}>
        <div className="text-[#FFFFFF] h-[30px]   text-xs smd:text-base font-medium smd:w-full " >
          {!nId && !isOpen && !unbindInfo ? (
            <>
              <span className="text-base">{title}</span>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  closeAll()
                }}
              >
                Nodes {">"} {" "}
              </button>{" "}

              <label
                onClick={() => {
                  if (title !== "Add New Node") return;
                  addRef.current?.switchTo();
                  setSelectedType("");
                  params.delete('chooseType')
                  r.push(`?${params.toString()}`);

                }}
                className={cn({
                  "text-[#FFFFFF80] ": !selectedType,
                  "text-[#FFFFFF] cursor-pointer": selectedType,
                })}
              >
                {title}
              </label>
              {selectedType && (
                <span>
                  {" "}
                  {">"}{" "}
                  <span className={"text-[#FFFFFF80]"}> {selectedType}</span>
                </span>
              )}
            </>
          )}
        </div>
        {!nId && !isOpen ? (
          <Btn
            className="h-[1.875rem] smd:p-2 smd:!h-[1.875rem]  rounded-lg"
            onClick={() => {
              setOpenAddNode(!isOpen);
              updateURL('type', 'add')
            }}
          >
            Add New Node
          </Btn>
        ) : (
          !isOpen &&
          !unbindInfo && (
            <div className="flex gap-[.625rem] smd:justify-end smd:pt-[10px]   font-medium text-xs leading-3  smd:w-full">

              {nodeInfo?.nodeType === 'box' && <Btn
                onPress={() => {
                  setOpenLink(sortIp(nodeInfo?.deviceInfo.networkInterfaces || [])[0].ip)
                }
                }
                className="h-[1.875rem] rounded-lg smd:!h-[1.875rem]"
              >
                Go to Web Console
              </Btn>

              }
              <Btn
                onPress={() => {
                  updateURL('type', 'del')

                }}
                className="bg-[#F5F5F51A] border-white text-white smd:!h-[1.875rem] h-[1.875rem] rounded-lg  hover:!bg-default"
              >
                Delete
              </Btn>
            </div>
          )
        )}
      </div >
      {
        unbindInfo ? (
          <AUnbind
            nodeId={unbindInfo}
            onBack={() => {
              setUnbingInfo("");
              params.delete('nId')
              setOpenAddNode(false);
              // refetch();
              setSelectedType("");
              params.delete('type')
              params.delete('chooseType')

              r.push(`?${params.toString()}`);
            }}
          />
        ) : !nId && !isOpen ? (
          (!data || !data.length) && !isInitialLoading ? (
            <div className="w-full flex justify-center items-center mt-[6.5625rem]  ">
              <div className="w-[37.5rem] m-auto text-center gap-5 flex flex-col">
                <div className=" text-lg ">Add Your Edge Node</div>
                <div className="text-sm text-[#FFFFFF80]">
                  ARO supports both hardware and software Edge Nodes on various platforms. Check <button onClick={() => window.open('https://docs.aro.network/edge-node/types', '_blank')} className="underline underline-offset-1 hover:text-[#00E42A]">our guide</button> to choose the best node type for you.


                </div>
                <Btn
                  className="h-10 w-[11.875rem] flex justify-center text-center rounded-lg text-xs font-medium m-auto"
                  onPress={() => {
                    setOpenAddNode(!isOpen);
                    updateURL('type', 'add')
                  }}
                >
                  Add New Node
                </Btn>
              </div>
            </div>
          ) : (
            <ACommonNodes
              isLoading={isInitialLoading}
              data={data}
              onOpenModal={handleToggleNodeInfo}
            />
          )
        ) : isOpen ? (
          <AAddNewNodes
            addRef={addRef}
            onSelectedType={setSelectedType}
            onBack={() => {
              params.delete('nId')
              setOpenAddNode(!isOpen);
              // refetch();
              setSelectedType("");
              params.delete('type')
              params.delete('chooseType')
              r.push(`?${params.toString()}`);
            }}
          />
        ) : (
          <ANodeInfo
            nodeInfo={setNodeInfo}
            onBack={() => {
              params.delete('nId')
              params.delete('type')
              params.delete('chooseType')
              r.replace(`?${params.toString()}`);
            }}
          />
        )}



      <ForceModal isOpen={!!openLink} className="!w-[650px] smd:!w-full smd:!mx-5">
        <div className="self-stretch flex-grow-0 flex-shrink-0 font-semibold  text-lg text-center  text-white">  {AllText["Access Your Device’s Web Console"]}</div>
        <div className="text-[#FFFFFF80] text-center">
          {AllText["To access the Web Console for your Edge Node device, your computer or phone must be connected to the same Wi-Fi network as the device. If you’re not on the same network, you may not be able to connect."]}
        </div>
        <div className="flex w-full gap-[.625rem] smd:gap-5 ">
          <Btn className="w-full smd:h-12" onPress={() => {
            window.open(`http://${openLink}:40001`)
            setOpenLink('')
          }}  >
            Confirm
          </Btn>
          <Btn color='default' className="w-full  bg-default border smd:h-12 !border-white text-white hover:bg-l1" onPress={() => {
            setOpenLink('')
          }} >
            Cancel
          </Btn>

        </div>

      </ForceModal>
    </>
  );
};

export default ANodes;

