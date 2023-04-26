import {ApplicationType, JobType, UserType} from "@/utils/types";
import React from "react";

interface PropType {
  rowData: {
    rowNumber: number;
    data: JobType | UserType | ApplicationType;
  };
}

export default function Row({rowData}: PropType): JSX.Element {
  const {data} = rowData.data;
  console.log("data", data);
  function rowClickHandler() {
    console.log("row id");
  }

  return (
    <tr
      onClick={rowClickHandler}
      className="[&>*]:border [&>*]:border-slate-200 [&>*]:p-2 "
    >
      <td>{rowData.rowNumber + 1}</td>
      <td>{}</td>
      <td>lorem lorem</td>
      <td>lorem</td>
      <td>lorem</td>
    </tr>
  );
}
