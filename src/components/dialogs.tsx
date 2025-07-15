import { Modal, cn, ModalBody, ModalBodyProps, ModalContent, ModalContentProps, ModalHeader, ModalProps } from "@nextui-org/react";
import { FiX } from "react-icons/fi";


export function ForceModal({
  children,
  contentProps,
  bodyProps,
  ...props
}: ModalProps & {
  contentProps?: ModalContentProps;
  bodyProps?: ModalBodyProps;
}) {
  return (
    <Modal backdrop="blur" classNames={{ backdrop: "backdrop-blur", wrapper: 'py-5' }} hideCloseButton {...props}>
      <ModalContent className="w-[22.5rem] p-6 bg-[#404040] rounded-3xl !my-auto" {...(contentProps || {})}>
        <ModalBody className="flex flex-col justify-start items-center w-full gap-6 p-0" {...(bodyProps || {})}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export function TitModal({
  tit,
  children,
  contentProps,
  bodyProps,
  className,
  ...props
}: ModalProps & {
  contentProps?: ModalContentProps;
  bodyProps?: ModalBodyProps;
  tit?: string;
}) {
  return (
    <Modal hideCloseButton backdrop="blur" className={className} classNames={{ backdrop: "backdrop-blur-[6px]", wrapper: 'py-5' }} {...props}>
      <ModalContent className={cn('w-[31.25rem] bg-[#404040] gap-6 p-6 rounded-3xl !my-auto ', className)} {...(contentProps || {})}>
        {(onClose) => (
          <>
            {typeof onClose == 'function' || tit &&
              <ModalHeader className="justify-between p-0 bg-fuchsia-300  ">
                {tit && <span className="text-base font-semibold text-left text-white">{tit}</span>}
                {typeof onClose == 'function' && <div className="p-0 rounded-full w-6 h-6 flex justify-center items-center text-xs cursor-pointer bg-white/10 hover:bg-white/30" onClick={onClose}>
                  <FiX />
                </div>}
              </ModalHeader>
            }
            <ModalBody className="flex flex-col justify-center items-center w-full gap-6 p-0" {...(bodyProps || {})}>
              {children}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
