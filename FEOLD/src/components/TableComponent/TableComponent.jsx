import React, { useState } from "react";
import { Divider, Radio, Table } from "antd";
import Loading from "../loading/loading";

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};
const TableComponent = (props) => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const { columns = [], isLoading = false, products = [] } = props;

  return (
    <div className="mr-[30px] mt-5 ">
      <Loading isLoading={isLoading}>
        <Table
          className=""
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={products}
          {...props}
        />
      </Loading>
    </div>
  );
};

export default TableComponent;
