import {ApplicationType} from "@/utils/types";
import Row from "../components/Row";

export default function Applications(props: {
  applications: ApplicationType[];
}): JSX.Element {
  const {applications} = props;
  // console.log("applications", applications);

  return (
    <div>
      <form className="subHeaderStyle justify-end">
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search"
            className="searchBarStyle"
          />
          <div className="buttonStyle">Filter</div>
        </div>
      </form>

      <table className="tableStyle ">
        <thead>
          <tr className="[&>*]:border [&>*]:border-slate-200">
            <th className="w-[40px]">No.</th>
            <th className="w-[250px]">id</th>
            <th>created</th>
            <th>applicant</th>
            <th>job</th>
            <th>state</th>
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
