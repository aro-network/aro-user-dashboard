import { Tooltip, TooltipProps } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { IoIosHelpCircle } from "react-icons/io";
import { useClickAway } from "react-use";

export function HelpTip({ content, children, placement, ...props }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  useClickAway(triggerRef, () => {
    if (isOpen && isTouchDevice) {
      setIsOpen(false);
    }
  });

  const handleClick = () => {
    if (isTouchDevice) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsOpen(false);
    }
  };


  return (
    <div
      ref={triggerRef}
      className="flex"
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Tooltip
        isOpen={isOpen}
        showArrow={false}
        content={content}
        placement={placement}
        color="default"
        className="min-h-10 min-w-[4.5rem] !max-w-[28.125rem] !w-full"
        classNames={{
          content:
            "bg-[#585858] border border-solid border-white/10 min-h-9 min-w-[4.5rem] text-xs text-white/60",
        }}
        {...props}
      >
        {children ? (
          children
        ) : (
          <button className={`outline-none border-none cursor-default`}>
            <IoIosHelpCircle className="text-base" />
          </button>
        )}
      </Tooltip>
    </div>
  );
}
