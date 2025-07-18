import { pxToRem } from "@/lib/utils";
import { SVGS } from "@/svg";
import { Card, cn } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export function IconCard({ icon, className, leftTopIconClassName, iconSize = 24, tit, content, isNeed = true, contentClassname, titClassName }: OtherTypes.IconCardProps) {
  const Micon = icon;
  const sizeRem = pxToRem(iconSize);
  const leftSizeRem = pxToRem(120 - iconSize);
  const pl = pxToRem((40 - iconSize) / 2);
  return (
    <Card className={cn(" flex flex-col p-6 gap-[2.8125rem] smd:gap-10 relative", className, {
      ' innerTab': isNeed
    })}>
      <SVGS.SvgBgIconCard className={cn("absolute left-0 top-0 text-[6.375rem] z-0", leftTopIconClassName)} />
      <div className={cn("flex items-center whitespace-nowrap ", titClassName)} style={{ height: pxToRem(40) }}>
        <div
          className="shrink-0 "
          style={{
            height: sizeRem,
            width: leftSizeRem,
            fontSize: sizeRem,
            paddingLeft: pl,
          }}
        >
          <Micon />
        </div>
        {tit}
      </div>
      <div className="w-full flex flex-row">
        {Boolean(tit) && <div style={{ width: leftSizeRem, flexShrink: 100 }} />}
        <div style={{ flexBasis: `calc(100% - ${leftSizeRem})`, flexGrow: 1 }} className={contentClassname}>
          {content}
        </div>
      </div>
    </Card>
  );
}



export function TitCard(p: PropsWithChildren & OtherTypes.TitCardProps) {
  return (
    <Card className={cn("bg-gray-1 bg-no-repeat rounded-xl flex p-5 gap-5 commonTab", p.className)}>
      {p.tit && (
        <div className={cn("flex items-center justify-between w-full", p.contentClassName)}>
          <span className={cn("text-base font-semibold font-Alexandria", p.titClassName)}>{p.tit}</span>
          {p.right}
        </div>
      )}
      {p.children}
    </Card>
  );
}

const shadowSize = 1.1

export function BgCard(p: PropsWithChildren & OtherTypes.BGProps) {

  return <div className={cn("relative overflow-visible flip_item", p.wrapClassName)}>
    <div style={{ backgroundSize: '100% 100%', width: `calc(100% + ${shadowSize * 2}rem)`, height: `calc(100% + ${shadowSize * 2}rem)`, left: `-${shadowSize}rem`, top: `-${shadowSize}rem` }} className="bg-s1 bg-no-repeat animate-pulse absolute z-0" />
    <Card className={cn("bg-[#2E2E2E] border border-[#007AFF] flex flex-col justify-start items-center p-6 gap-6 w-full h-full rounded-3xl", p.className)}>{p.children}</Card>
  </div>
}
