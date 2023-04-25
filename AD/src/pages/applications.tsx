import Row from "../components/Row";

export default function Applications(): JSX.Element {
  const buttonStyle =
    "h-[36px] p-2 flex items-center text-white font-bold border-2 border-solid border-[#318ec2] bg-[#318ec2] rounded-[10px]";
  return (
    <div>
      <form className="flex justify-end p-2 border-2 border-solid border-slate-200 bg-white">
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search"
            className="h-[36px] py-2 px-5 bg-[#dee6ec] rounded-full"
          />
          <div className={buttonStyle}>Filter</div>
        </div>
      </form>

      <table className="w-full table-fixed border-2 border-solid border-slate-200 bg-white rounded-md">
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
          {[1, 2, 3].map((mynum: number, i: number) => {
            console.log(mynum);
            return <Row key={i} rowNumber={i} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
