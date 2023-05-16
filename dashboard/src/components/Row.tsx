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

  const job = data as JobType;
  const user = data as UserType;
  const application = data as ApplicationType;

  function rowClickHandler() {
    console.log("row id");
  }

  return (
    <tr
      onClick={rowClickHandler}
      className="[&>*]:border [&>*]:border-slate-200 [&>*]:p-2 [&>*]:break-words"
    >
      <td>{rowData.rowNumber + 1}</td>
      <td>{data._id}</td>
      <td>{job.created_date?.toString() || user.firstName || application.createdAt?.toString() }</td>
      <td>{job.title || user.phoneNumber || application.userId}</td>
      <td>{job.state || user.email || application.jobId}</td>
      {application.jobId && <td>{application.state}</td>}
    </tr>
  );
}
