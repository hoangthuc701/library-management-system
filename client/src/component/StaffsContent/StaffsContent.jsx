import React from "react";
import "./StaffsContent.scss";
import { Link } from "react-router-dom";
import Table from "../Table/Table";

function StaffsContent(props) {
   const tableData = [
      {
         Name: "Nguyễn Minh Sang",
         Birtday: "22/05/1999",
         Address: "Ấp 1, Mỹ Yên, Bến Lức, Long An",
         Phone: "0962727059",
      },
      {
         Name: "Nguyễn Minh Sang",
         Birtday: "22/05/1999",
         Address: "Ấp 1, Mỹ Yên, Bến Lức, Long An",
         Phone: "0962727059",
      },
      {
         Name: "Nguyễn Minh Sang",
         Birtday: "22/05/1999",
         Address: "Ấp 1, Mỹ Yên, Bến Lức, Long An",
         Phone: "0962727059",
      },
      {
         Name: "Nguyễn Minh Sang",
         Birtday: "22/05/1999",
         Address: "Ấp 1, Mỹ Yên, Bến Lức, Long An",
         Phone: "0962727059",
      },
   ];
   return (
      <div className="staffs-content">
         <div className="staffs-content__new">
            <Link className="btn btn--success btn-link" to="/staffs/staffs/new">
               <i className="fa fa-plus" aria-hidden="true"></i>New
            </Link>
         </div>
         <Table
            tableData={tableData}
            headingColums={["Name", "Birtday", "Address", "Phone", "Actions"]}
         >
            <td className="table__actions">
               <Link
                  to="/staffs/staffs/edit"
                  className="btn btn-link btn--warning"
               >
                  <i className="fa fa-eye" aria-hidden="true"></i>
               </Link>
            </td>
         </Table>
      </div>
   );
}

export default StaffsContent;
