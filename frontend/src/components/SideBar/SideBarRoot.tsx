import { ReactNode } from "react";

interface SideBarRootProps {
  children: ReactNode;
}

function SideBarRoot(props: Readonly<SideBarRootProps>) {
  const { children } = props;
  return (
    <div className="w-[300px] bg-primary">
      <div className="flex flex-col gap-[77px]">{children}</div>
    </div>
  );
}

export default SideBarRoot;
