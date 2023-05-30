import {JobType} from "@/utils/types";

interface JobProp {
  jobData: {
    rowNumber: number;
    data: JobType;
  };
}

export default function JobRow({jobData}: JobProp) {
  const {rowNumber, data} = jobData;
  return (
    <tr className="[&>*]:border [&>*]:border-slate-200 [&>*]:p-2 [&>*]:break-words">
      <td>{rowNumber}</td>
      <td>{data.createdDate}</td>
      <td>{data.title}</td>
      <td>{data.state}</td>
    </tr>
  );
}
