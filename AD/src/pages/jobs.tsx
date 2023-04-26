import Row from "../components/Row";
import {JobType} from "@/utils/types";

export default function Jobs(props: {jobs: JobType[]}): JSX.Element {
  const {jobs} = props;

  return (
    <div>
      <form className="subHeaderStyle justify-between">
        <div className="buttonStyle">Add New +</div>
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search"
            className="searchBarStyle"
          />
          <div className="buttonStyle">Filter</div>
        </div>
      </form>
      <table className="tableStyle">
        <thead>
          <tr className="[&>*]:h-[40px] [&>*]:border [&>*]:border-slate-200 rounded-md">
            <th className="w-[40px]">No.</th>
            <th className="w-[250px]">id</th>
            <th>created</th>
            <th>title</th>
            <th>state</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job: JobType, i: number) => {
            const rowData = {
              rowNumber: i,
              data: job,
            };
            return <Row key={i} rowData={rowData} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch("http://localhost:8008/job/all");
    console.log("response", response);
    const jobs = await response.json();
    console.log("response from fetch", jobs);
    return {
      props: {
        jobs: jobs,
      },
    };
  } catch (error) {
    console.log("fetch error", error);
    return {
      props: {
        jobs: "not fetched",
      },
    };
  }
}
