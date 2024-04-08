import { ReactNode } from "react";

interface TableHeaderProps {
  children: ReactNode;
}

function TableHeader(props: Readonly<TableHeaderProps>) {
  const { children } = props;
  return (
    <div>
      <div className="w-full flex flex-row justify-between h-12  pl-8 pr-4 align-middle">
        {children}
      </div>
      <div className="h-[1px] bg-grey-color-50"></div>
    </div>
  );
}

export default TableHeader;
