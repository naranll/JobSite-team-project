import Row from "../components/Row";
import {JobType} from "@/utils/types";
import {buttonStyle} from "@/styles/tagstyles";

export default function Jobs(props: {jobs: JobType[]}): JSX.Element {
  const {jobs} = props;

  return (
    <div>
      <form className="flex justify-between p-2 border-2 border-solid border-slate-200 bg-white">
        <div className={buttonStyle}>Add New +</div>
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search"
            className="h-[36px] py-2 px-5 bg-[#dee6ec] rounded-full"
          />
          <div className={buttonStyle}>Filter</div>
        </div>
      </form>
      <table className="w-full table-auto border-2 border-solid border-slate-200 rounded bg-white">
        <thead>
          <tr className="[&>*]:h-[40px] [&>*]:border [&>*]:border-slate-200 rounded-md">
            <th className="w-[40px]">No.</th>
            <th>id</th>
            <th>created</th>
            <th>title</th>
            <th>status</th>
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
