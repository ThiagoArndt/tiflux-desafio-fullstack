import { Table, TableProps } from "antd";

interface TableContentProps extends TableProps {}

function TableContent(props: Readonly<TableContentProps>) {
  return (
    <Table
      className="px-8 font-poppins font-normal !overflow-y-clip"
      scroll={{ y: 300 }}
      size="large"
      pagination={false}
      {...props}
    />
  );
}

export default TableContent;
