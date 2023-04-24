import Row from "../components/Row";
import {jobsData} from "@/utils/dummyData";

export default function Jobs(): JSX.Element {
  return (
    <div>
      <p>job</p>
      <table className="w-full table-auto border border-collapse border-slate-950 bg-white">
        <thead>
          <tr className="[&>*]:border [&>*]:border-slate-950">
            <th>one</th>
            <th>two</th>
            <th>three</th>
            <th>four</th>
          </tr>
        </thead>
        <tbody className="">
          {jobsData.map((job, i: number) => {
            console.log(job);
            return <Row key={i} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
