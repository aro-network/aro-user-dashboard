import { Tooltip, TooltipProps } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { IoIosHelpCircle } from "react-icons/io";

export function HelpTip({ content, children, placement, ...props }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const helpTipRef = useRef<any>(null);
  const contentClassname = "bg-[#585858] border border-solid border-white/10 min-h-9 min-w-[4.5rem] text-xs text-white/60"
  useEffect(() => {
    const handleClose = (event: { type: string; target: any; }) => {
      if (event.type === "click" && helpTipRef.current!.contains(event.target)) {
        return;
      }
      setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("click", handleClose, true);
      window.addEventListener("scroll", handleClose, true);
    }

    return () => {
      window.removeEventListener("click", handleClose, true);
      window.removeEventListener("scroll", handleClose, true);
    };
  }, [isOpen]);
  return (
    <div className="flex" ref={helpTipRef} onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} onClick={() => setIsOpen(!isOpen)} >
      <Tooltip
        isOpen={isOpen}
        showArrow={false}
        content={content}
        placement={placement}
        color="default"
        className=" min-h-10 min-w-[4.5rem]  !max-w-[28.125rem] !w-full"
        classNames={{ content: contentClassname }}
        {...props}
      >
        {children ? (
          children
        ) : (
          <button className="outline-none border-none">
            <IoIosHelpCircle className="text-base" />
          </button>
        )}
      </Tooltip>
    </div>
  );
}
