import React from "react";
import "./Table.scss";

function Table(props) {
   const { tableData, headingColums, children } = props;

   if (tableData) {
      var data = tableData.map((row, index) => {
         let rowData = [];
         let i = 0;
         for (const key in row) {
            rowData.push({ key: headingColums[i], val: row[key] });
            i++;
         }
         return (
            <tr key={index}>
               <td data-heading="STT">{index + 1}</td>
               {rowData.map((data, index) => (
                  <td key={index} data-heading={data.key}>
                     {data.val}
                  </td>
               ))}
               {children}
            </tr>
         );
      });
   }

   return (
      <div className="table-container">
         <table className="table">
            <thead>
               <tr>
                  <th headingColums="STT">STT</th>
                  {headingColums.map((col, index) => {
                     let classnames = col == "Actions" ? "table__actions" : "";
                     return (
                        <th className={classnames} key={index}>
                           {col}
                        </th>
                     );
                  })}
               </tr>
            </thead>
            <tbody>{data}</tbody>
         </table>
      </div>
   );
}

export default Table;
