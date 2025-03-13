declare namespace EdgeNodeMode {
  type CommonProps = {
    data?: NodeType[] | null;
    onOpenModal: (node: NodeType) => void;
    className?: string;
  };

  type NodeType = {
    deviceName: string;
    icon: React.FC;
    mode: string;
    when: string;
    experience: React.ReactNode;
    status: "online" | "offline";
  };

  type AModalProps = {
    isOpen: boolean;
    onCloseModal: () => void;
    onSubmit: (data: any) => void;
  };
}
