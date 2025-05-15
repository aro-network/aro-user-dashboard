import useMobileDetect from "@/hooks/useMobileDetect";
import { SVGS } from "@/svg";
import { PropsWithChildren } from "react";

export function PageUnlogin(p: PropsWithChildren) {
    const isMobile = useMobileDetect()
    return <div className="w-full h-full flex smd:flex-col">
        <div className="flex-[4]  md:min-h-full smd:h-full basis-0 flex flex-col justify-center items-center overflow-auto gap-16 lg:gap-32 md:bg-[#535252]  text-base">
            {isMobile ? <SVGS.SvgMoLogin /> : <SVGS.SvgLogin />}
            <SVGS.SvgLogo colors={['white', 'white']} className="smd:hidden" />
        </div>
        <div className="flex-[6] md:min-h-full basis-0 overflow-y-auto md:bg-[#272727]">{p.children}</div>
    </div>
}