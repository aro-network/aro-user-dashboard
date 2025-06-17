import { cn } from "@nextui-org/react";
import { Btn } from "./btns";
import { TitModal } from "./dialogs";


export function ConfirmDialog({
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  cancelColor = 'primary',
  confirmColor = 'default',
  onCancel,
  onConfirm,
  tit,
  msg,
  isOpen,
  className,
  isLoading,
  btnClassName,
  confirmClassName,
  cancelClassName,
  cancelDisable,
  confirmDisable

}: OtherTypes.ConfirmDialogProps) {
  return (
    <TitModal className={className} isOpen={isOpen} tit={tit} onClose={onCancel}>
      <div className="flex flex-col gap-6 w-full">
        <div className="text-center text-lg  whitespace-pre-wrap font-AlbertSans">{msg}</div>
        <div className={cn("grid grid-cols-2 gap-2.5  smd:gap-5", btnClassName)}>

          {confirmText &&
            <Btn disabled={confirmDisable} className={cn("h-[2.1875rem] smd:h-12", confirmClassName)} color={confirmColor} isLoading={isLoading} onPress={onConfirm}>
              {confirmText}
            </Btn>
          }
          {cancelText &&
            <Btn disabled={cancelDisable} className={cn("h-[2.1875rem] smd:h-12", cancelClassName)} isLoading={isLoading} color={cancelColor} onPress={onCancel}>
              {cancelText}
            </Btn>
          }
        </div>
      </div>
    </TitModal>
  );
}
