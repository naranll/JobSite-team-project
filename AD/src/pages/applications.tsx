import {ApplicationType} from "@/utils/types";
import Row from "../components/Row";
import {buttonStyle} from "@/styles/tagstyles";

export default function Applications(props: {
  applications: ApplicationType[];
}): JSX.Element {
  const {applications} = props;
  // console.log("applications", applications);

  return (
    <div>
      <form className="flex justify-end p-2 border-2 border-solid border-slate-200 bg-white">
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search"
            className="h-[36px] py-2 px-5 rounded-full bg-[#dee6ec]"
          />
          <div className={buttonStyle}>Filter</div>
        </div>
      </form>

      <table className="w-full table-auto border-2 border-solid rounded-md border-slate-200 bg-white ">
        <thead>
          <tr className="[&>*]:border [&>*]:border-slate-200">
            <th className="w-[40px]">No.</th>
            <th>id</th>
            <th>created</th>
            <th>applicant</th>
            <th>job</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application: ApplicationType, i: number) => {
            const rowData = {
              rowNumber: i,
              data: application,
            };
            return <Row key={i} rowData={rowData} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:8008/application/all");
  const applications = await response.json();
  return {
    props: {
      applications: applications,
    },
  };
}
