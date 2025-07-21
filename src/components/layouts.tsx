import { cn } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function PageUnlogin(p: PropsWithChildren & { childrenClassName?: string, headerClassNmae?: string, type?: string }) {


    return <div className="w-full h-full flex smd:flex-col  ">
        <div className={cn("flex-[4] smd:flex-[1] smd:bg-none smd:mt-[80px]  bg-[url(/mainBg.png)] bg-no-repeat bg-cover bg-center  md:min-h-full  smd:h-full basis-0 flex flex-col justify-center items-center md:overflow-auto smd:gap-5 text-base  gap-10", p.headerClassNmae)}>
            {/* {!isMobile && <img src='./mainBg.png' className="w-full h-full" />} */}
            <img src="https://aro.network/aro-logo.svg" alt="Logo" className="w-[284px] h-9" />
            <div className="flex gap-6 smd:hidden flex-col justify-center items-center px-5 ">
                <div className="text-[2.75rem] font-bold leading-[120%] text-center xs:text-[2.125rem]">ARO Previewnet Is LIVE!</div>
                <div className={`text-[42px]  xs:text-[1.75rem] smd:text-lg  leading-normal text-center text-xl text-[#00FF0D]`}>
                    <div className="text-left leading-[190%]">
                        - Campaign for Grand Airdrop<br />
                        - Run and test ARO Nodes<br />
                        - $30k Top Referrer Bonus<br />
                    </div>
                </div>
            </div>

            <button onClick={() => window.open('https://docs.aro.network/campaigns/previewnet')} className="underline underline-offset-1 smd:hidden hover:text-[#00FF0D] text-white mt-5">Learn More</button>

        </div>
        <div className={cn("flex-[6] smd:flex-[9]   md:min-h-full basis-0 mo:overflow-y-auto", p.childrenClassName)}>{p.children}</div>
    </div>
}