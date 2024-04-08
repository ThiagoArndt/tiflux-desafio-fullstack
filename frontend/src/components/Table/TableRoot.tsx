import { ReactNode } from "react";

interface TableContentProps {
  children: ReactNode;
}

function TableRoot(props: Readonly<TableContentProps>) {
  const { children } = props;

  return <div className="flex flex-col gap-6 w-[1184px]">{children}</div>;
}

export default TableRoot;
