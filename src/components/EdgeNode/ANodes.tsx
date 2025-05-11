import { Btn } from "../btns";
import { useToggle } from "react-use";
import { useCallback, useRef, useState } from "react";
import ANodeInfo from "./components/ANodeInfo";
import ACommonNodes from "./components/ACommonNodes";
import AAddNewNodes from "./components/AAddNewNodes";
import backendApi from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import AUnbind from "./components/AUnbind";
import { cn } from "@nextui-org/react";
import { formatNumber } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const ANodes = () => {
  const [isOpen, setOpenAddNode] = useToggle(false);
  const [isShowNodeInfo, setShowNodeInfo] = useState<{
    open: boolean;
    list?: EdgeNodeMode.NodeType;
  }>({ open: false, list: undefined });
  const [unbindInfo, setUnbingInfo] = useState<string | undefined>("");
  const [selectedType, setSelectedType] = useState("");
  const addRef = useRef<Nodes.AddType>(null);
  const nodeInfoRef = useRef<EdgeNodeMode.NodeIpType>(null);
  const [nodeInfo, setNodeInfo] = useState<EdgeNodeMode.IpInfo[]>([]);

  const r = useRouter();

  const handleToggleNodeInfo = useCallback((e: EdgeNodeMode.NodeType) => {
    console.log("eeeeeee", e);

    setShowNodeInfo({ open: true, list: e });
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
              <label className="text-[#4281FF] text-2xl font-semibold leading-6">
                +{formatNumber(Number(item.todayRewards) || 0)}
              </label>
              <label className="ml-[.375rem]">BERRY</label>
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

  console.log("ipip", ip, nodeInfo);

  return (
    <>
      <div className=" flex justify-between  items-center">
        <div className="text-[#FFFFFF] text-xs font-medium">
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
                }}
              >
                Nodes
              </button>{" "}
              {">"}{" "}
              <label
                onClick={() => {
                  if (title !== "Add New Node") return;
                  addRef.current?.switchTo();
                  setSelectedType("");
                }}
                className={cn({
                  "text-[#FFFFFF80]": !selectedType,
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
            className="h-[1.875rem]  rounded-lg"
            onClick={() => {
              setOpenAddNode(!isOpen);
            }}
          >
            Add New Node
          </Btn>
        ) : (
          !isOpen &&
          !unbindInfo && (
            <div className="flex gap-[.625rem] font-medium text-xs leading-3">
              <Btn
                onClick={() => window.open(`http://${ip.ip}:40001`)}
                className="h-[1.875rem] rounded-lg"
              >
                Go to Web Console
              </Btn>
              <Btn
                onClick={() => setUnbingInfo(isShowNodeInfo.list?.nodeUUID)}
                className="bg-[#F5F5F51A] h-[1.875rem] rounded-lg "
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
          }}
        />
      ) : !isShowNodeInfo.open && !isOpen ? (
        (!data || !data.length) && !isFetching ? (
          <div className="w-full flex justify-center items-center mt-[6.5625rem]  ">
            <div className="w-[37.5rem] m-auto text-center gap-5 flex flex-col">
              <div className=" text-lg ">Add Your Edge Node</div>
              <div className="text-sm text-[#FFFFFF80]">
                EnReach supports hardware and software solutions on multiple
                platforms for running an Edge Node. Find which node type is best
                for you in this guide.
              </div>
              <Btn
                className="h-10 w-[11.875rem] flex justify-center text-center rounded-lg text-xs font-medium m-auto"
                onClick={() => {
                  setOpenAddNode(!isOpen);
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
          }}
        />
      ) : (
        <ANodeInfo
          nodeInfo={setNodeInfo}
          nodeInfoRef={nodeInfoRef}
          selectList={isShowNodeInfo.list}
        />
      )}
    </>
  );
};

export default ANodes;
