import { Btn } from "@/components/btns";
import { SVGS } from "@/svg";

const nodeData = {
  image: <SVGS.SvgDevice />,
  totalReach: 290,
  todayReach: 2.1,
  yesterdayReach: 4.6,
  nodeName: "Home Node 001",
  nodeId: "H8SMNNOP5",
  nodeType: "Box",
  createDate: "2025-01-01",
  activationCode: "F8V01g6d6g",
  device: "Box ABC",
  region: "China 2",
  externalIp: "116.****.241",
  ipRegion: "华东上海电信",
  internalIp: "192.168.50.220",
  macAddress: "2c:c4:4f:a1:90:f5",
  natType: "对称型",
  upnp: "不适用",
  delay: "---",
  cpuCores: 4,
  cpuUsage: 4,
  ramUsage: 300,
  totalRam: 1024,
  romUsage: 1,
  totalRom: 997,
};

const ANodeInfo = () => {

  return <>
    <div className="max-w-4xl mx-auto  text-white mb-5">
      <div className="flex rounded-[1.25rem] w-full p-5   mb-6 bg-[#404040]">
        {nodeData.image}
        <div className="ml-4 flex flex-col justify-between py-[.625rem] ">
          <div className="text-sm font-semibold flex justify-between gap-[3.125rem]  ">
            <label>
              Total
            </label>
            <div>
              <label className="text-[#4281FF] mr-1">
                +{nodeData.totalReach}
              </label>
              <label>
                $REACH
              </label>
            </div>
          </div>
          <div>
            <div className="text-sm mt-1 flex justify-between  font-semibold  gap-[3.125rem]">
              <label>
                Today
              </label>
              <div>
                <label className="text-[#4281FF] mr-1">
                  +{nodeData.todayReach}
                </label>
                <label>
                  $REACH
                </label>
              </div>
            </div>


            <div className="text-sm mt-1 flex justify-between  font-semibold  gap-[3.125rem]">
              <label>
                Yesterday
              </label>
              <div>

                <label className="text-[#4281FF] mr-1">
                  +{nodeData.yesterdayReach}
                </label>
                <label>
                  $REACH
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" text-sm  flex gap-[.625rem] flex-col">
        <div className="flex justify-between">
          <span >Node Name</span>
          <span className="text-[#FFFFFF80]">{nodeData.nodeName}</span>
        </div>
        <div className="flex justify-between">
          <span>Node ID</span>
          <span className="text-[#FFFFFF80]">{nodeData.nodeId}</span>
        </div>
        <div className="flex justify-between">
          <span >Node Type</span>
          <span className="text-[#FFFFFF80]">{nodeData.nodeType}</span>
        </div>
      </div>

      <div className=" my-5 p-5 bg-[#404040] rounded-[1.25rem] ">
        <label className=" text-base font-semibold">
          Basics
        </label>
        <div className="flex flex-col gap-[10px] mt-5 text-sm">
          <div className="flex justify-between">
            <span >Create Date</span>
            <span className="text-[#FFFFFF80]">{nodeData.createDate}</span>
          </div>
          <div className="flex justify-between">
            <span >Device</span>
            <span className="text-[#FFFFFF80]">{nodeData.device}</span>
          </div>
          <div className="flex justify-between">
            <span >Region</span>
            <span className="text-[#FFFFFF80]">{nodeData.region}</span>
          </div>
        </div>
      </div>

      <div className="my-5 p-5 bg-[#404040] rounded-[1.25rem]">
        <label className=" text-base font-semibold">
          Network Info
        </label>
        <div className="flex flex-col gap-[10px] mt-5 text-sm">

          <div className="flex justify-between">
            <span >外网 IP</span>
            <span className="text-[#FFFFFF80]">{nodeData.externalIp}</span>
          </div>
          <div className="flex justify-between">
            <span >IP归属</span>
            <span className="text-[#FFFFFF80]">{nodeData.ipRegion}</span>
          </div>
          <div className="flex justify-between">
            <span >内外 IP</span>
            <span className="text-[#FFFFFF80]">{nodeData.internalIp}</span>
          </div>
          <div className="flex justify-between">
            <span >MAC Address</span>
            <span className="text-[#FFFFFF80]">{nodeData.macAddress}</span>
          </div>
          <div className="flex justify-between">
            <span >NAT Type</span>
            <span className="text-[#FFFFFF80]">{nodeData.natType}</span>
          </div>
          <div className="flex justify-between">
            <span >UPNP</span>
            <span className="text-[#FFFFFF80]">{nodeData.upnp}</span>
          </div>
          <div className="flex justify-between">
            <span >Delay</span>
            <span className="text-[#FFFFFF80]">{nodeData.delay}</span>
          </div>
        </div>
      </div>


      <div className="my-5 p-5 bg-[#404040] rounded-[1.25rem]">
        <label className=" text-base font-semibold">
          Device States
        </label>
        <div className="flex flex-col gap-[10px] mt-5 text-sm">
          <div className="flex justify-between">
            <span >CPU Cores</span>
            <span className="text-[#FFFFFF80]">{nodeData.cpuCores}</span>
          </div>
          <div className="flex justify-between">
            <span >CPU Usage</span>
            <span className="text-[#FFFFFF80]">{nodeData.cpuUsage}%</span>
          </div>
          <div className="flex justify-between">
            <span >RAM</span>
            <span className="text-[#FFFFFF80]">{nodeData.ramUsage}MB/{nodeData.totalRam}MB</span>
          </div>
          <div className="flex justify-between">
            <span >ROM</span>
            <span className="text-[#FFFFFF80]">{nodeData.romUsage}GB/{nodeData.totalRom}GB</span>
          </div>
        </div>
      </div>

      <Btn className="h-8 rounded-[1.875rem] w-[6.8125rem] flex justify-center m-auto"  >Unbond Node</Btn>
    </div>
  </>

}
export default ANodeInfo