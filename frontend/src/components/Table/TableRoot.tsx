import { ReactNode } from "react";

interface TableContentProps {
  children: ReactNode;
}

function TableRoot(props: Readonly<TableContentProps>) {
  const { children } = props;

  return <div className="flex flex-col gap-6">{children}</div>;
}

export default TableRoot;
