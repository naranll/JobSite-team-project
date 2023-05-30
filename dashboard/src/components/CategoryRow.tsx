import {CategoryType} from "@/utils/types";

interface CategoryProp {
  categoryData: {
    rowNumber: number;
    data: CategoryType;
  };
}

export default function JobRow({categoryData}: CategoryProp) {
  const {rowNumber, data} = categoryData;
  return (
    <tr className="[&>*]:border [&>*]:border-slate-200 [&>*]:p-2 [&>*]:break-words">
      <td>{rowNumber}</td>
      <td>{data.name}</td>
    </tr>
  );
}
