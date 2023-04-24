import Row from "../components/Row";

export default function Applications(): JSX.Element {
  return (
    <div>
      application
      <table className="w-full table-auto border border-collapse border-slate-950 bg-white rounded">
        <thead>
          <tr className="[&>*]:border [&>*]:border-slate-950">
            <th>one</th>
            <th>two</th>
            <th>three</th>
            <th>four</th>
          </tr>
        </thead>
        <tbody className="">
          {[1, 2, 3].map((mynum: number, i: number) => {
            console.log(mynum);
            return <Row key={i} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
