import React from "react";

export default function Row(): JSX.Element {
  return (
    <tr className="[&>*]:border [&>*]:border-slate-950">
      <td>lorem lorem lorem</td>
      <td>lorem lorem lorem</td>
      <td>lorem lorem lorem</td>
      <td>lorem</td>
    </tr>
  );
}
