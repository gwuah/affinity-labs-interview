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
    width: 100
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

export function Table(data) {
  return <Table columns={columns} data={data} />;
}
