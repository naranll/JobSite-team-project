import Row from "@/components/Row";
import {UserType} from "@/utils/types";

export default function Users(props: {users: UserType[]}): JSX.Element {
  const {users} = props;
  // console.log("all users", users);

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
      <table className="tableStyle">
        <thead>
          <tr className="[&>*]:border [&>*]:border-slate-200">
            <th className="w-[40px]">No.</th>
            <th className="w-[250px]">id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className="">
          {users.map((user: UserType, i: number) => {
            const rowData = {
              rowNumber: i,
              data: user,
            };
            return <Row key={i} rowData={rowData} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:8008/user/all");
  const users = await response.json();
  console.log("users in static", users);
  return {
    props: {
      users: users,
    },
  };
}
