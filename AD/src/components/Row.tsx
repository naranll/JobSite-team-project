import React from "react";

interface PropType {
  rowNumber: number;
}

export default function Row({rowNumber}: PropType): JSX.Element {
  function rowClickHandler() {
    console.log("row id");
  }

  return (
    <tr
      onClick={rowClickHandler}
      className="[&>*]:border [&>*]:border-slate-200 [&>*]:p-2 "
    >
      <td>{rowNumber + 1}</td>
      <td>lorem lorem lorem</td>
      <td>lorem lorem</td>
      <td>lorem</td>
      <td>lorem</td>
    </tr>
  );
}
