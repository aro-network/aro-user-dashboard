declare namespace EdgeNodeMode {
  type CommonProps = {
    data?: NodeType[] | null;
    onOpenModal: (node: NodeType) => void;
    className?: string;
    isLoading: boolean;
  };

  type NodeType = {
    deviceName: string;
    icon: React.ReactNode;
    nodeUUID: string;
    when?: string;
    experience: React.ReactNode;
    status: string | boolean;
    nodeId?: string;
    ip?: string;
    nodeType: "box" | "x86" | "lite_node";
    [key: string]: any;
  };

  type AModalProps = {
    isOpen: boolean;
    onCloseModal: () => void;
    onSubmit: (data: any) => void;
  };

  type IpInfo = {
    ip: string;
    mac: string;
    name: string;
    nodeType?: "box" | "x86";
  };

  type NodeIpType = {
    nodeInfo: () => void;
  };
}
