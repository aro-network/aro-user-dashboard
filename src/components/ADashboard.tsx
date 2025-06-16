import { useAuthContext } from "@/app/context/AuthContext";
import { SocialButtons } from "./social-buttons";
import { MAvatar } from "./avatar";
import React, { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiCopy, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useDisconnect } from "wagmi";
import { useCopy } from "@/hooks/useCopy";
import { useToggle } from "react-use";
import { ConfirmDialog } from "./dialogimpls";
import { ANodes, AOverview, AStats } from "./EdgeNode";
import { AEdgeNode, ALeaderboard } from "./NetworkExplorer";
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import AMyReferral from "./Referal/AReferal";
import { CiCircleQuestion } from "react-icons/ci";
import { ENV } from "@/lib/env";
import { HelpTip } from "./tips";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@heroui/drawer";
import { Btn } from "./btns";
import useMobileDetect from "@/hooks/useMobileDetect";
import { SVGS } from "@/svg";
import { getItem, removeItem } from "@/lib/storage";
import { useQueryClient } from "@tanstack/react-query";
import { AllText } from "@/lib/allText";
import AAROID from "./AROID/AAROID";
import { AFunds } from "./AROID";
import ALinkOther from "./EdgeNode/components/ALinkOther";

export const currentENVName = ENV === 'staging' ? 'testnet' : 'devnet'
const Modes: Dashboard.ModesType[] = [

  {
    label: ENV === 'staging' ? 'Testnet' : 'Devnet',
    name: currentENVName,
    children: [

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
        name: "Funds",
        content: <AFunds />,
        tab: 'funds'
      },

      {
        name: "Referral",
        content: <AMyReferral />,
        tab: 'referral'
      },
      {
        name: "ARO ID",
        content: <AAROID />,
        tab: 'aroId'
      },


    ],
  },

]

type OverlayPlacement = "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
type Placement = { placement?: OverlayPlacement }
export const Devnet: FC<Placement> = ({ placement = 'bottom' }) => {
  const parts = AllText.signIn.titleTips.split('//');
  const openPage = () => {
    window.open("https://aro.network/#target-section", "_blank");
  };
  const align = placement as OverlayPlacement ?? 'bottom'
  return <HelpTip className=" w-[12.5rem]" placement={align}
    content={
      <span>
        {parts[0]}
        <button onClick={openPage} className="underline underline-offset-1 hover:text-[#00E42A]">
          Pioneer Program
        </button>
        {parts[1]}
      </span>
    }>
    <div>
      <SVGS.SvgQuesiton />
    </div>

  </HelpTip>


}

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
  const queryClient = useQueryClient();
  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const isLink = params.get('type') === 'link'


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

      updateURL(currentENVName, 'nodes')
    }
  }, [searchParams]);

  const handleModeChange = (mode: Dashboard.ModeType) => {
    setSelectedTab(mode);
    setCurrentTab(mode.children[0]);
    updateURL(mode.name, mode.children[0].tab);
  };

  const handleTabChange = (tab: Dashboard.TabItem) => {
    params.delete('type')
    params.delete('nId')
    setCurrentTab(tab);
    updateURL(selectedTab.name, tab.tab);
    if (tab.name === currentTab.name) {
      setRefreshKey((prev) => prev + 1);
    }
  };

  const updateURL = (mode: string, tab: string) => {
    params.set("mode", mode);
    params.set("tab", tab);
    r.push(`?${params.toString()}`);
  };


  const { isOpen: isVisable, onOpen, onOpenChange, onClose } = useDisclosure();


  return (
    <div className="  overflow-hidden m-auto flex justify-center flex-col xs:w-full ">
      <div className={cn(` flex h-[3.75rem] bg-[#373737]   smd:fixed  top-0 flex-row w-full justify-between items-center py-5   px-[50px] smd:px-5 `, {
        'smd:!z-[-100] ': isVisable,
        'smd:z-[10000]': !isVisable
      })}>
        <button className="md:hidden" onClick={() => onOpen()}>
          <FiMenu className="text-2xl" />
        </button>

        <div className="flex items-center  gap-5   smd:w-full smd:justify-center">
          <img src="https://aro.network/aro-logo.svg" className={` w-[12.8125rem]  smd:w-[6.25rem] smd:h-7 `} alt="Logo" />
          {/* <div onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}> */}
          <div className={cn(`bg-[#FFFFFF33] rounded-md py-1 px-2 smd:h-6 smd:text-xs `, {
            'flex items-center gap-2': ENV === 'prod'
          })}>
            {selectedTab.label}
            <div hidden={ENV !== 'prod'}>
              <Devnet />

            </div>
          </div>
          {/* <Dropdown isOpen={isOpen}>
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
                return <DropdownItem key={mode.name} className={`${selectedTab.name === mode.name && 'text-[#00E42A]   '} dropdown-item-custom`} onClick={() => { handleModeChange(mode); setIsOpen(false) }}>{mode.label}</DropdownItem>
              }
              )}
            </DropdownMenu>
          </Dropdown> */}
          {/* </div> */}
        </div>
        <div className="flex gap-[1.875rem] items-center">
          <div className="smd:hidden">
            <SocialButtons />
          </div>
          <div className=" font-normal text-xs leading-[.9rem] smd:hidden  text-[#999999] h-8 flex  items-center flex-row gap-[.625rem]">
            <a href="https://aro.network/" target="_blank" className="underline-offset-4 hover:text-[#00E42A] hover:border-[#00E42A] h-8 rounded-[.625rem] items-center flex border p-[.625rem] border-[#999999]">Website</a>
            <a href="https://docs.aro.network" target="_blank" className="underline-offset-4 h-8  hover:text-[#00E42A] hover:border-[#00E42A]  items-center flex rounded-[.625rem] border p-[.625rem] border-[#999999] justify-center">Docs</a>
          </div>

          <Dropdown className="bg-[#585858] !w-[18.75rem] mo:!w--full  py-[.625rem]" placement="bottom-end">
            <DropdownTrigger>
              <div className="w-8 cursor-pointer">
                <MAvatar name={user?.email} size={46} className="smd:hidden" />
                <MAvatar name={user?.email} size={24} className="md:hidden" />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key={'user'} isReadOnly className=" gap-2 data-[hover=true]:bg-[#585858] ">
                <div className="flex items-center gap-[.625rem] cursor-default">
                  <div className="w-8 smd:w-6 ">
                    <MAvatar name={user?.email} size={46} />
                  </div>
                  <div>
                    <label>{username}</label>
                    <p className="font-semibold text-[#FFFFFF99]">{user?.email}</p>
                  </div>
                </div>
              </DropdownItem>
              {/* <DropdownItem
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
              </DropdownItem> */}
              <DropdownItem key={'aroId'} onClick={() => {
                ac.setLink('')
                r.push(`?mode=${currentENVName}&tab=aroId`)


              }} >
                <div className="flex gap-[.625rem] items-center">
                  <FiUser className="text-[#FFFFFF99] text-base" />
                  <label className="font-medium text-sm  text-[#FFFFFF99]   cursor-pointer">My ARO ID</label>
                </div>
              </DropdownItem>
              <DropdownItem key={'signout'} onClick={() => toggleShowConfirmLogout()}>
                <div className="flex gap-[.625rem]  items-center">
                  <FiLogOut className="text-[#FFFFFF99] text-base" />
                  <label className="font-medium text-sm   text-[#FFFFFF99] cursor-pointer">Sign Out Account</label>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="relative z-[10000] bg-[#404040]">
        <Drawer isOpen={isVisable} placement={'left'} onOpenChange={onOpenChange} className="w-[70%]  z-[1000] bg-[#404040]" hideCloseButton>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerBody>
                  <div className={` flex flex-col gap-4  pt-[1.875rem] border-[#404040]`}>
                    {selectedTab.children.map((m) => {
                      const selected = m.name === currentTab.name;
                      return (
                        <button
                          key={m.name}
                          className={cn(" h-12 flex  bg-[#373737] justify-start items-center  self-stretch flex-grow-0 flex-shrink-0  gap-2.5 px-6 rounded-lg cursor-pointer select-none",

                            {
                              " text-[#00E42A] ": selected,
                              "text-white": !selected,
                            }
                          )}
                          onClick={() => {
                            handleTabChange(m)
                            onClose()
                          }}
                        >
                          <div className="text-sm font-medium text-left whitespace-nowrap ">{m.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </DrawerBody>
                <DrawerFooter className="justify-center mb-10">
                  <div className="flex flex-col justify-center items-center gap-6">
                    <div>
                      <SocialButtons />
                    </div>
                    <div className=" font-normal text-xs leading-[.9rem] w-full  text-[#999999] justify-center flex  items-center flex-row gap-[.625rem]">
                      <a href="https://aro.network/" target="_blank" className="underline-offset-1 underline items-center text-xs  border-[#999999]">Website</a>
                      <a href="https://docs.aro.network" target="_blank" className="underline-offset-1 underline  justify-center text-xs">Docs</a>
                    </div>
                  </div>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
        <ConfirmDialog
          tit="Log Out"
          msg={
            <>
              {AllText.signOut.tips}
            </>
          }
          className="smd:mx-5"
          isOpen={showConfirmLogout}
          confirmClassName="hover:bg-[#00E42A33]"
          cancelClassName="  bg-default border !border-white text-white hover:bg-l1  "
          onCancel={toggleShowConfirmLogout}
          onConfirm={() => {
            ac.setLink('')
            ac.logout()
          }
          }

        />
      </div>


      <div className={` smd:hidden flex flex-row gap-3 px-[3.125rem] xs:px-[50px] py-[.625rem] border-b border-[#404040] ${selectedTab.children[5] && 'justify-end'}`}>
        {selectedTab.children.map((m) => {
          const selected = m.name === currentTab.name;
          return (
            <button
              key={m.name}
              className={cn(" flex justify-start items-center  self-stretch flex-grow-0 flex-shrink-0  gap-2.5 px-[.375rem] rounded-[1.875rem] cursor-pointer select-none",

                {
                  "bg-[#373737] text-white ": selected,
                  "text-white/50 hover:bg-default": !selected,
                  'ml-auto': m.name === 'ARO ID'
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


      <div className="h-full  nodes mb-5 smd:mt-[3.75rem]">
        {currentTab.tab === 'referral' && user?.invited === false &&
          <div className="bg-[#00E42A]  py-[.625rem]  justify-center smd:px-4  w-full flex gap-5 smd:gap-[.3125rem] smd:flex-col items-center">
            <span className="text-black">You have not set your Referrer Information. Being referred by an ARO user will give you extra boost! </span>
            <button onClick={() => r.push(`?mode=${currentENVName}&tab=aroId`)} className=" bg-white rounded-lg smd:w-[6.25rem] text-black py-[.3125rem] px-[.625rem] text-xs">Go to set</button>

          </div>
        }
        {isLink && ac.link ?
          <ALinkOther /> :
          <div className=" w-container m-auto flex justify-center xs:w-full smd:w-full xs:px-[104px] px-[3.125rem] smd:px-5 ">
            <AnimatePresence mode="wait">
              <motion.div
                className=" pt-5 smd:pb-10  flex flex-col w-full "
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

        }

      </div>


    </div >
  );
}

export default ADashboard;
