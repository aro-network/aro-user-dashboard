import { useAuthContext } from "@/app/context/AuthContext";
import { SocialButtons } from "./social-buttons";
import { MAvatar } from "./avatar";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Button, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiCopy, FiLogOut, FiUser } from "react-icons/fi";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useDisconnect } from "wagmi";
import { formatStr } from "@/lib/utils";
import { useCopy } from "@/hooks/useCopy";
import { Btn } from "./btns";
import { useToggle } from "react-use";
import { ConfirmDialog } from "./dialogimpls";
import { ANodes, AOverview, AStats } from "./EdgeNode";
import { AEnReachID, AFunds } from "./EnReachID";
import { AEdgeNode, ALeaderboard } from "./NetworkExplorer";
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"

const Modes: Dashboard.ModesType[] = [

  {
    label: 'Testnet',
    name: 'testnet',
    children: [
      // {
      //   name: "Overview",
      //   content: <AOverview />,
      //   tab: 'overview'
      // },
      {
        name: "Edge Nodes",
        content: <ANodes />,
        tab: 'nodes'
      },
      {
        name: "Stats",
        content: <AOverview />,
        tab: 'stats'
      },
      {
        name: "EnReach ID",
        content: <AEnReachID />,
        tab: 'enreachId'
      },
      {
        name: "Funds",
        content: <AFunds />,
        tab: 'funds'
      },
      // {
      //   name: "Edge Node",
      //   content: <AEdgeNode />,
      //   tab: 'edgeNode'
      // },
      {
        name: "Leaderboard",
        content: <ALeaderboard />,
        tab: 'leaderboard'
      },
      {
        name: "Referral",
        content: '',
        tab: 'referral'
      },
      // {
      //   name: "Keeper Node",
      //   content: '',
      //   tab: 'keeperNode'
      // },
      // {
      //   name: "Incentives",
      //   content: '',
      //   tab: 'incentives'
      // },

    ],
  },
  // {
  //   label: 'Enreach ID',
  //   name: 'enreachId',
  //   children: [
  //     {
  //       name: "EnReach ID",
  //       content: <AEnReachID />,
  //       tab: 'enreachId'
  //     },
  //     {
  //       name: "Funds",
  //       content: <AFunds />,
  //       tab: 'funds'
  //     },
  //   ],
  // },
  // {
  //   label: 'Network Explorer',
  //   name: 'networkExplorer',
  //   children: [
  //     {
  //       name: "Edge Node",
  //       content: <AEdgeNode />,
  //       tab: 'edgeNode'
  //     },
  //     {
  //       name: "Leaderboard",
  //       content: <ALeaderboard />,
  //       tab: 'leaderboard'
  //     },
  //     {
  //       name: "Keeper Node",
  //       content: '',
  //       tab: 'keeperNode'
  //     },
  //     {
  //       name: "Incentives",
  //       content: '',
  //       tab: 'incentives'
  //     },
  //   ]
  // },
]

const ADashboard: FC<Dashboard.MenusProps> = () => {
  const ac = useAuthContext();
  const [currentTab, setCurrentTab] = useState<typeof Modes[0]['children'][0]>(Modes[0].children[0]);
  const [selectedTab, setSelectedTab] = useState<Dashboard.ModesType>(Modes[0]);
  const user = ac.queryUserInfo?.data;
  const r = useRouter();
  const searchParams = useSearchParams();
  const ud = useDisconnect();
  const { open, close } = useAppKit()
  const copy = useCopy()
  const [showConfirmLogout, toggleShowConfirmLogout] = useToggle(false);
  const { address, isConnected, } = useAppKitAccount()
  const username = user?.email?.split('@')[0] || ''
  const [refreshKey, setRefreshKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const modeFromURL = searchParams.get("mode");
    const tabFromURL = searchParams.get("tab");
    if (modeFromURL && tabFromURL) {
      const mode = Modes.find((m) => m.name === modeFromURL);
      if (mode) {
        const tab = mode.children.find((t) => t.tab === tabFromURL);
        if (tab) {
          setSelectedTab(mode);
          setCurrentTab(tab);
        }
      }
    } else {
      updateURL('testnet', 'nodes')
    }
  }, [searchParams]);

  const handleModeChange = (mode: Dashboard.ModeType) => {
    setSelectedTab(mode);
    setCurrentTab(mode.children[0]);
    updateURL(mode.name, mode.children[0].tab);
  };

  const handleTabChange = (tab: Dashboard.TabItem) => {
    setCurrentTab(tab);
    updateURL(selectedTab.name, tab.tab);
    if (tab.name === currentTab.name) {
      setRefreshKey((prev) => prev + 1);
    }
  };

  const updateURL = (mode: string, tab: string) => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("tab", tab);
    r.push(`?${params.toString()}`);
  };


  return (
    <div className=" sticky top-0">
      <div className=" flex h-[3.75rem] flex-row w-full justify-between items-center py-5 bg-[#373737]  px-[50px]  ">
        <div className="flex items-center  gap-5 smd:flex-col">
          <img src="/logo.svg" className={`shrink-0 rotate-90 lg:ml-0 max-w-[9.375rem] h-[2.375rem] lg:rotate-0 `} alt="Logo" />
          {/* <div onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}> */}
          <Dropdown isOpen={isOpen}>
            <DropdownTrigger  >
              <Button className="rounded-[.625rem]  cursor-default h-8 border flex items-center p-[.625rem] border-[#999999] text-[#999999] font-normal text-xs leading-3" variant="bordered">
                {selectedTab.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-readonly
              aria-label="selected tab"
              selectedKeys={[selectedTab.name]}
              selectionMode="single"
              variant="flat"

            >
              {Modes.map((mode) => {
                return <DropdownItem key={mode.name} className={`${selectedTab.name === mode.name && 'text-[#4281FF]   '} dropdown-item-custom`} onClick={() => { handleModeChange(mode); setIsOpen(false) }}>{mode.label}</DropdownItem>
              }
              )}
            </DropdownMenu>
          </Dropdown>
          {/* </div> */}
        </div>
        <div className="flex gap-[1.875rem] items-center">
          <SocialButtons />
          <div className=" font-normal text-xs leading-[.9rem] text-[#999999] h-8 flex flex-col items-center lg:flex-row gap-[.625rem]">
            <a href="https://enreach.network/" target="_blank" className="underline-offset-4 hover:text-[#4281FF] hover:border-[#4281FF] h-8 rounded-[.625rem] items-center flex border p-[.625rem] border-[#999999]">Website</a>
            <a href="https://docs.enreach.network/berry-season-1" target="_blank" className="underline-offset-4 h-8 hover:text-[#4281FF] hover:border-[#4281FF]  items-center flex rounded-[.625rem] border p-[.625rem] border-[#999999]">Guide</a>
          </div>

          <Dropdown className="bg-[#585858] w-[20.625rem] py-[.625rem]" placement="bottom-end">
            <DropdownTrigger>
              <div className="w-8 cursor-pointer">
                <MAvatar name={user?.email} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem isReadOnly className=" gap-2 data-[hover=true]:bg-[#585858] ">
                <div className="flex items-center gap-[.625rem] cursor-default">
                  <div className="w-8 ">
                    <MAvatar name={user?.email} />
                  </div>
                  <div>
                    <label>{username}</label>
                    <p className="font-semibold text-[#FFFFFF99]">{user?.email}</p>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                isReadOnly
                className="flex flex-col  justify-start w-full  "
                startContent={
                  isConnected &&
                  <div className="flex flex-col w-full justify-center"
                  >
                    <label className="font-medium text-sm  border-t  border-[#FFFFFF1A] pt-5">
                      Wallet Connected
                    </label>

                    <div className="flex items-center mt-[.625rem] border-b pb-5 border-[#FFFFFF1A]">
                      <label className="font-normal text-xs text-[#FFFFFF99]">
                        {formatStr(address!)}
                      </label>

                      <button className="ml-[10px]" onClick={() => copy(address!)}>
                        <FiCopy />
                      </button>
                      <Btn className=" h-5 ml-5" onClick={() => ud.disconnect()}>Disconnect</Btn>
                    </div>
                  </div>
                }
                endContent={
                  !isConnected &&
                  <div className="flex justify-start w-full flex-col gap-2 py-5 border-t border-b border-[#FFFFFF1A]">
                    <label className="font-medium text-sm">
                      Wallet Connected
                    </label>
                    <div>
                      <Btn disabled className="h-5" onClick={() => open()}>Connect Your Wallet</Btn>
                    </div>
                  </div>
                }
              >
              </DropdownItem>
              <DropdownItem>
                <button onClick={() => r.push('?mode=testnet&tab=enreachId')} className="flex gap-[.625rem] items-center">
                  <FiUser className="text-[#FFFFFF99] text-base" />
                  <label className="font-medium text-sm  text-[#FFFFFF99]   cursor-pointer">My EnReach ID</label>
                </button>
              </DropdownItem>
              <DropdownItem>
                <button onClick={() => toggleShowConfirmLogout()} className="flex gap-[.625rem]  items-center">
                  <FiLogOut className="text-[#FFFFFF99] text-base" />
                  <label className="font-medium text-sm   text-[#FFFFFF99] cursor-pointer">Sign Out Account</label>
                </button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <ConfirmDialog
        tit="Log Out"
        msg={
          <>
            You are going to log out your account.
            <br />
            Are you sure?
          </>
        }
        isOpen={showConfirmLogout}
        onCancel={toggleShowConfirmLogout}
        onConfirm={ac.logout}
      />

      <div className=" flex flex-row gap-3 px-[3.125rem] py-[.625rem] border-b border-[#404040]">
        {selectedTab.children.map((m) => {
          const selected = m.name === currentTab.name;

          return (
            <button
              key={m.name}
              className={cn(" flex justify-start items-center  self-stretch flex-grow-0 flex-shrink-0  gap-2.5 px-[.375rem] rounded-[1.875rem] cursor-pointer select-none",
                {
                  "bg-[#373737] text-white ": selected,
                  "text-white/50 hover:bg-default": !selected,
                }
              )}
              onClick={() => {
                handleTabChange(m)
              }}
            >
              <div className="text-sm font-medium text-left whitespace-nowrap hidden lg:block">{m.name}</div>
            </button>
          );
        })}
      </div>

      <div className="h-full overflow-auto nodes">
        <AnimatePresence mode="wait">
          <motion.div
            className=" pt-5  px-[6.5rem] smd:px-5 flex flex-col w-full "
            key={currentTab.name + refreshKey}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentTab.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div >
  );
}

export default ADashboard;