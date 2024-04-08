import { ReactNode } from "react";

interface SideBarContentProps {
  children: ReactNode;
}

function SideBarContent(props: Readonly<SideBarContentProps>) {
  const { children } = props;
  return <div className="flex flex-col gap-5 m-auto">{children}</div>;
}

export default SideBarContent;
