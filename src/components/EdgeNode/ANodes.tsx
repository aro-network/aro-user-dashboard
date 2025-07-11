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
import { addNewNodeList, covertName, formatNumber, sortIp } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";
import { debounce } from "lodash";
import { AllText } from "@/lib/allText";
import { ForceModal } from "../dialogs";


export const typeObj: { [key: 'box' | 'x86' | string]: string } = {
  box: 'ARO Pod',
  client: 'ARO Client',
  lite: 'ARO Lite',
  link: 'ARO Link'
}


const ANodes = () => {
  const [isOpen, setOpenAddNode] = useToggle(false);
  const [unbindInfo, setUnbingInfo] = useState<string | undefined>("");
  const [selectedType, setSelectedType] = useState("");
  const addRef = useRef<Nodes.AddType>(null);
  const [nodeInfo, setNodeInfo] = useState<Nodes.NodeInfoList>();
  const r = useRouter()
  const searchParams = useSearchParams();
  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);
  const nId = params.get("nId") || ''
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [openLink, setOpenLink] = useState('')
  const chooseType = params.get("nodeType") || '';


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
    refetchOnWindowFocus: false,
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
              className="w-[135px] h-[130px] smd:w-[100px] smd:h-[100px] object-cover rounded-lg"
            />
          ),
          nodeUUID: item.nodeUUID,
          experience: (
            <>
              <label className="text-[#00E42A] text-2xl smd:text-[19px] font-semibold smd:font-extrabold leading-6">
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
    refetchRes.cancel();
    if (isInitialLoading) return
    params.delete('chooseType')
    params.set('type', 'detail')
    params.set('nodeType', e.nodeType)
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



    if (showAdd) {
      setOpenAddNode(showAdd);
      updateURL('type', 'add')
      if (type) {
        setSelectedType(typeObj[type]);
      } else {
        setSelectedType('');
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

    return () => {
      refetchRes.cancel();
    };

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
    params.delete('nodeType')
    r.push(`?${params.toString()}`);
    refetchRes()

  }


  const onSwitch = (index: number) => {
    window.open(index !== 3 ? 'https://shop.aro.network/' : 'https://download.aro.network/images/aro-client-latest.iso')

  }

  const onOpen = (url?: string) => {
    if (!url) return
    window.open(url)
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
          data.length ? <Btn
            className="h-[1.875rem] smd:p-2 smd:!h-[1.875rem]  rounded-lg"
            onClick={() => {
              setOpenAddNode(!isOpen);
              updateURL('type', 'add')
            }}
          >
            Add New Node
          </Btn> : null
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
              params.delete('nodeType')
              r.push(`?${params.toString()}`);
            }}
          />
        ) : !nId && !isOpen ? (
          (!data || !data.length) && !isInitialLoading ? (
            <div className="w-full flex justify-center items-center mt-[10px] ">
              <div className="w-full m-auto text-center gap-5 flex flex-col">
                <div className=" text-lg ">{AllText.edgeNodes["Pick Your ARO Node to Start"]}</div>
                <div className="text-sm text-[#FFFFFF80]">
                  {AllText.edgeNodes["Welcome aboard, new Aronauts! "]} <br />
                  {AllText.edgeNodes["Explore ARO Network’s diverse nodes—hardware, software, and browser extensions—then choose the perfect ARO Node for you."]}
                </div>
                <div className={cn(`grid grid-cols-[repeat(auto-fill,minmax(540px,1fr))] h-full   smd:grid-cols-[repeat(auto-fill,minmax(100%,1fr))]  w-full gap-5 mt-5 `)}>
                  {addNewNodeList.map((item, index) => {
                    return <div
                      key={`nodes_${index}`}
                      className="bg-[#6D6D6D66]  commonTab  hover:bg-[#6D6D6DCC] rounded-xl  flex  gap-10 smd:gap-[30px] p-5 smd:flex-wrap">
                      <div className="flex flex-col  justify-between smd:justify-start smd:w-full ">
                        <div className="md:w-[218px] smd:!w-full  h-[130px]">
                          <img src={`../${item.icon}`} alt={item.name} className=" w-full h-full object-contain bg-white rounded-lg" />
                        </div>
                        <div className="smd:mt-4">
                          <Btn
                            className="h-[1.875rem] w-full flex justify-center text-center rounded-lg text-xs font-medium m-auto"
                            onPress={() => {
                              setOpenAddNode(!isOpen);
                              params.set("type", 'add');
                              updateURL('chooseType', item.value)

                            }}
                          >
                            Add an {item.name}

                          </Btn>
                        </div>
                      </div>

                      <div className="text-left flex flex-col justify-between smd:justify-start ">
                        <div className="text-xl ">{item.name}</div>
                        <div className="mt-[10px] h-[80px] flex flex-col justify-center">
                          {item.description.map((item) => {
                            return <div key={`des_${item}`} className="text-sm text-left">{item}</div>
                          })}
                        </div>
                        <div className="text-sm">Cost: {item.cost}</div>
                        <div className="text-sm">Rewards: {item.Rewards}</div>
                        <div className="text-sm">User-friendly: {item["User-friendly"]}</div>
                        <div className=" mt-3 flex gap-5 text-xs">
                          <button onClick={() => window.open(item.url)} className="text-[#568AFF] underline underline-offset-1">{item.goToText}</button>
                          <button onClick={() => onOpen(item.docs)} className="text-[#568AFF] underline underline-offset-1">Learn more in docs</button>
                        </div>
                      </div>
                    </div>
                  })}
                </div>

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
            onClose={() => setOpenAddNode(false)}
            onBack={() => {
              params.delete('nId')
              setOpenAddNode(!isOpen);
              // refetch();
              setSelectedType("");
              params.delete('type')
              params.delete('chooseType')
              params.delete('nodeType')
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
              params.delete('nodeType')

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

