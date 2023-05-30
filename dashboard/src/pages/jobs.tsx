import JobRow from "../components/JobRow";
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
            <th>created</th>
            <th>title</th>
            <th>state</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job: JobType, i: number) => {
            const jobData = {
              rowNumber: i,
              data: job,
            };
            return <JobRow key={i} jobData={jobData} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch("http://localhost:8008/job/all");
    const jobs = await response.json();
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
