import { Button, ButtonProps, cn } from "@nextui-org/react";
import { HelpTip } from "./tips";
import { ReactNode } from "react";

export function Btn({ children, className, ...props }: ButtonProps) {
  return (
    <Button isDisabled={props.disabled} color={props.disabled ? `default` : 'primary'} className={cn("h-[2.625rem] bg-[#00E42A] smd:!h-12 rounded-lg text-xs text-black  font-medium !min-w-max  hover:bg-[#5CF077]", props.color == "default" ? "hover:bg-[#5CF077]" : "", props.disabled && 'cursor-not-allowed', className)} {...props}>
      {children}
    </Button>
  );
}
export function TransBtn({ children, className, ...props }: ButtonProps) {
  return (
    <Button color="primary" className={cn("h-[2.625rem] bg-l1 shadow-1 backdrop-blur-lg hover:bg-primary", className)} {...props}>
      {children}
    </Button>
  );
}

export function IconBtn({ children, className, tip, ...props }: ButtonProps & { tip: ReactNode }) {
  return (
    <HelpTip content={tip}>
      <Button color="primary" className={cn("h-8 w-8 min-w-8 max-w-8 rounded-full p-0 hover:bg-default", className)} {...props}>
        {children}
      </Button>
    </HelpTip>
  );
}
