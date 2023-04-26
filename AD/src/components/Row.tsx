import {ApplicationType, JobType, UserType} from "@/utils/types";
import React from "react";

interface PropType {
  rowData: {
    rowNumber: number;
    data: JobType | UserType | ApplicationType;
  };
}

export default function Row({rowData}: PropType): JSX.Element {
  const {data} = rowData;
  // console.log("data", data);

  const user = data as UserType;
  const job = data as JobType;
  const application = data as ApplicationType;

  // function dataTypeChecker(object: any) {
  //   if (object.firstName) {
  //     console.log("user");
  //   } else if (object.title) {
  //     console.log("job");
  //   } else {
  //     console.log("application");
  //   }
  // }

  function rowClickHandler() {
    console.log("row id");
  }
  // dataTypeChecker(data);

  return (
    <tr
      onClick={rowClickHandler}
      className="[&>*]:border [&>*]:border-slate-200 [&>*]:p-2 "
    >
      <td>{rowData.rowNumber + 1}</td>
      <td>{data._id}</td>
      <td>{user.firstName || job.createdDate || application.createdAt}</td>
      <td>lorem</td>
      <td>lorem</td>
    </tr>
  );
}
