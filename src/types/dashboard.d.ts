declare namespace Dashboard {
  type ModesType = {
    label: string;
    name: string;
    children: { name: string; content: ReactNode; tab: string }[];
  };

  type TabItem = {
    name: string;
    content: React.ReactNode;
    tab: string;
  };

  type MenusProps = {
    menus?: React.ReactNode;
  };
  type ModeType = {
    label: string;
    name: string;
    children: TabItem[];
  };
}
