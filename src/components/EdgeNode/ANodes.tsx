import { Btn } from "../btns";
import { useToggle } from "react-use";
import { useCallback, useEffect, useRef, useState } from "react";
import ANodeInfo from "./components/ANodeInfo";
import ACommonNodes from "./components/ACommonNodes";
import AAddNewNodes from "./components/AAddNewNodes";
import backendApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import AUnbind from "./components/AUnbind";
import { cn } from "@nextui-org/react";
import { formatNumber } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { getItem, removeItem, setItem } from "@/lib/storage";

const ANodes = () => {
  const [isOpen, setOpenAddNode] = useToggle(false);
  const [isShowNodeInfo, setShowNodeInfo] = useState<{
    open: boolean;
    list?: EdgeNodeMode.NodeType;
  }>({ open: false, list: undefined });
  const [unbindInfo, setUnbingInfo] = useState<string | undefined>("");
  const [selectedType, setSelectedType] = useState("");
  const addRef = useRef<Nodes.AddType>(null);
  const [nodeInfo, setNodeInfo] = useState<EdgeNodeMode.IpInfo[]>([]);
  const r = useRouter()
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const handleToggleNodeInfo = useCallback((e: EdgeNodeMode.NodeType) => {
    params.delete('chooseType')
    updateURL('type', 'detail')
    setShowNodeInfo({ open: true, list: e });
    setItem('sid', JSON.stringify(e))
    setOpenAddNode(false);
  }, []);

  const title =
    isShowNodeInfo.open && !unbindInfo
      ? "Node Details"
      : isOpen
        ? "Add New Node"
        : unbindInfo
          ? "Delete"
          : "All Nodes";

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["NodeList"],
    enabled: true,
    refetchOnWindowFocus: false,
    queryFn: async ({ pageParam: pageNum }) => {
      const pageSize = 10;
      const pageParams = { pageSize, pageNum };
      const data = await backendApi.getNodeList();
      const list = data.map((item) => {
        return {
          deviceName: item.nodeName,
          icon: (
            <img
              src={`./${item.nodeType}.png`}
              alt={`${item.nodeType}`}
              style={{ height: "100%", width: "100%" }}
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
      return list;
    },
  });
  const ip = nodeInfo[0];

  const updateURL = (key: string, value: string) => {
    params.set(key, value);
    r.push(`?${params.toString()}`);

  };

  useEffect(() => {
    const showAdd = params.get("type") === 'add';
    const showDetail = params.get("type") === 'detail';
    const showDel = params.get("type") === 'del';
    const sid = JSON.parse(getItem('sid') || '{}')

    console.log('sids222idsidsidsid', sid);


    const type = params.get("chooseType");
    const obj: { [key: 'box' | 'x86' | string]: string } = {
      box: 'Hardware',
      x86: 'Software'
    }

    if (showAdd) {
      setOpenAddNode(showAdd);
      updateURL('type', 'add')
    } else if (showDetail) {
      setUnbingInfo('')
      setShowNodeInfo({ open: true, list: sid });
      updateURL('type', 'detail')
    } else if (showDel) {
      setUnbingInfo(sid?.nodeUUID)
      updateURL('type', 'del')
    } else if (JSON.stringify(sid) === '{}') {
      params.delete('chooseType')
      params.delete('type')
      setShowNodeInfo({ open: false, list: undefined });
      refetch();
    } else {
      addRef.current?.switchTo();
      setUnbingInfo('')
      setSelectedType("");
      setOpenAddNode(false);
      r.push(`?${params.toString()}`);
      refetch();
    }

    if (type) {
      setSelectedType(obj[type]);
    } else {
      addRef.current?.switchTo();
      setSelectedType('');
    }
  }, [searchParams.toString()]);



  return (
    <>
      <div className={` flex justify-between  items-center  ${isShowNodeInfo.open && 'smd:flex-wrap smd:w-full'}`}>
        <div className="text-[#FFFFFF] text-xs smd:text-base font-medium smd:w-full " >
          {!isShowNodeInfo.open && !isOpen && !unbindInfo ? (
            <>
              <span className="text-base">{title}</span>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowNodeInfo({ open: false, list: undefined });
                  setOpenAddNode(false);
                  setUnbingInfo("");
                  refetch();
                  setSelectedType("");
                  params.delete('type')
                  params.delete('chooseType')
                  r.push(`?${params.toString()}`);
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
                  "text-[#FFFFFF80] text-white": !selectedType,
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
        {!isShowNodeInfo.open && !isOpen ? (
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
            <div className="flex gap-[.625rem] smd:justify-end smd:pt-5   font-medium text-xs leading-3  smd:w-full">
              <Btn
                onClick={() => window.open(`http://${ip.ip}:40001`)}
                className="h-[1.875rem] rounded-lg smd:!h-[1.875rem]"
              >
                Go to Web Console
              </Btn>
              <Btn
                onClick={() => {
                  updateURL('type', 'del')

                  setUnbingInfo(isShowNodeInfo.list?.nodeUUID)
                }}
                className="bg-[#F5F5F51A] text-white smd:!h-[1.875rem] h-[1.875rem] rounded-lg  hover:!bg-default"
              >
                Delete
              </Btn>
            </div>
          )
        )}
      </div>
      {unbindInfo ? (
        <AUnbind
          nodeId={unbindInfo}
          onBack={() => {
            setUnbingInfo("");
            setShowNodeInfo({ open: false, list: undefined });
            setOpenAddNode(false);
            refetch();
            setSelectedType("");
            params.delete('type')
            params.delete('chooseType')
            r.push(`?${params.toString()}`);
          }}
        />
      ) : !isShowNodeInfo.open && !isOpen ? (
        (!data || !data.length) && !isFetching ? (
          <div className="w-full flex justify-center items-center mt-[6.5625rem]  ">
            <div className="w-[37.5rem] m-auto text-center gap-5 flex flex-col">
              <div className=" text-lg ">Add Your Edge Node</div>
              <div className="text-sm text-[#FFFFFF80]">
                ARO supports both hardware and software Edge Nodes on various platforms. Check <button onClick={() => window.open('https://docs.aro.network/edge-node/types', '_blank')} className="underline underline-offset-1 hover:text-[#00E42A]">our guide</button> to choose the best node type for you.


              </div>
              <Btn
                className="h-10 w-[11.875rem] flex justify-center text-center rounded-lg text-xs font-medium m-auto"
                onClick={() => {
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
            isLoading={isFetching}
            data={data}
            onOpenModal={handleToggleNodeInfo}
          />
        )
      ) : isOpen ? (
        <AAddNewNodes
          addRef={addRef}
          onSelectedType={setSelectedType}
          onBack={() => {
            setShowNodeInfo({ open: false, list: undefined });
            setOpenAddNode(!isOpen);
            refetch();
            setSelectedType("");
            params.delete('type')
            params.delete('chooseType')
            r.push(`?${params.toString()}`);
          }}
        />
      ) : (
        <ANodeInfo
          nodeInfo={setNodeInfo}
          selectList={isShowNodeInfo.list}
          onBack={() => {
            setShowNodeInfo({ open: false, list: undefined });
            params.delete('type')
            params.delete('chooseType')
            r.push(`?${params.toString()}`);


          }}
        />
      )}
    </>
  );
};

export default ANodes;
