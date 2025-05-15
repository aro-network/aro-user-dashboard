import useMobileDetect from "@/hooks/useMobileDetect";
import { SVGS } from "@/svg";
import { cn } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function PageUnlogin(p: PropsWithChildren & { childrenClassName?: string, headerClassNmae?: string }) {
    const isMobile = useMobileDetect()
    return <div className="w-full h-full flex smd:flex-col">
        <div className={cn("flex-[4] smd:flex-[1]  md:min-h-full smd:h-full basis-0 flex flex-col justify-center items-center overflow-auto gap-16 lg:gap-32 md:bg-[#535252]  text-base", p.headerClassNmae)}>
            {!isMobile && <SVGS.SvgLogin />}
            <SVGS.SvgLogo colors={['white', 'white']} />
        </div>
        <div className={cn("flex-[6] smd:flex-[9]  md:min-h-full basis-0 overflow-y-auto md:bg-[#272727]", p.childrenClassName)}>{p.children}</div>
    </div>
}