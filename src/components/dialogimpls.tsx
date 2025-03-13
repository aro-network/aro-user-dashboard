import { Btn } from "./btns";
import { TitModal } from "./dialogs";
import { ReactNode } from "react";


export function ConfirmDialog({
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  cancelColor = 'primary',
  onCancel,
  onConfirm,
  tit,
  msg,
  isOpen,
  className,

}: {
  confirmText?: string | ReactNode;
  cancelText?: string | ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  tit: string;
  msg: ReactNode;
  isOpen: boolean;
  className?: string;
  cancelColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
}) {
  return (
    <TitModal className={className} isOpen={isOpen} tit={tit} onClose={onCancel}>
      <div className="flex flex-col gap-6 w-full">
        <div className="text-center text-sm whitespace-pre-wrap font-AlbertSans">{msg}</div>
        <div className="grid grid-cols-2 gap-2.5">
          {confirmText &&
            <Btn className="h-10" color="default" onClick={onConfirm}>
              {confirmText}
            </Btn>
          }
          {cancelText &&
            <Btn className="h-10" color={cancelColor} onClick={onCancel}>
              {cancelText}
            </Btn>
          }
        </div>
      </div>
    </TitModal>
  );
}
