import { ReactNode } from "react";

interface SideBarRootProps {
  children: ReactNode;
}

function SideBarRoot(props: Readonly<SideBarRootProps>) {
  const { children } = props;
  return (
    <div className="px-[65px] bg-primary h-full">
      <div className="flex flex-col gap-[77px]">{children}</div>
    </div>
  );
}

export default SideBarRoot;
