import React from "react";
import Table from "rc-table";

const columns = [
  {
    title: "Employee Id",
    dataIndex: "id",
    key: "EmployeeId",
    width: 100
  },
  {
    title: "Number of Hours",
    dataIndex: "hours",
    key: "Number of Hours",
    width: 200
  },
  {
    title: "Unit Price",
    dataIndex: "rate",
    key: "Unit Price",
    width: 100
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "Cost",
    width: 100
  }
];

export default function CustomTable({ data }) {
  return (
    <div
      style={{
        marginBottom: "15px"
      }}
    >
      <Table columns={columns} data={data} />
    </div>
  );
}
