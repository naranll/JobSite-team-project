import {UserType} from "@/utils/types";

interface UserProp {
  userData: {
    rowNumber: number;
    data: UserType;
  };
}

export default function UserRow({userData}: UserProp) {
  const {rowNumber, data} = userData;
  return (
    <tr className="[&>*]:border [&>*]:border-slate-200 [&>*]:p-2 [&>*]:break-words">
      <td>{rowNumber}</td>
      <td>{data.firstName}</td>
      <td>{data.lastName}</td>
      <td>{data.phoneNumber}</td>
      <td>{data.email}</td>
    </tr>
  );
}
