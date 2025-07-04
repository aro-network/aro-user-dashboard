import { cn } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function PageUnlogin(p: PropsWithChildren & { childrenClassName?: string, headerClassNmae?: string }) {
    return <div className="w-full h-full flex smd:flex-col  ">
        <div className={cn("flex-[4] smd:flex-[1] smd:bg-none smd:mt-[120px]  bg-[url(/mainBg.png)] bg-no-repeat bg-cover bg-center  md:min-h-full  smd:h-full basis-0 flex flex-col justify-center items-center md:overflow-auto smd:gap-5 gap-16 lg:gap-32 text-base", p.headerClassNmae)}>
            {/* {!isMobile && <img src='./mainBg.png' className="w-full h-full" />} */}
            <img src="https://aro.network/aro-logo.svg" alt="Logo" className="w-[284px] h-9" />
            <div className="text-[42px] smd:text-lg  leading-normal text-center">Don’t Just Pay for the Internet.<br /> Get Paid for it.</div>

        </div>
        <div className={cn("flex-[6] smd:flex-[9]   md:min-h-full basis-0 mo:overflow-y-auto md:bg-[#272727]", p.childrenClassName)}>{p.children}</div>
    </div>
}