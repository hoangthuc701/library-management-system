import React from "react";
import { Link } from "react-router-dom";
import Table from "../Table/Table";
import "./BookContent.scss";

function BookContent(props) {
   const tableData = [
      {
         ID: "001",
         Name: "NMLT",
         Categories: "CNTT",
         Author: "Nguyễn Văn A",
         Status: "Active",
      },
      {
         ID: "001",
         Name: "NMLT",
         Categories: "CNTT",
         Author: "Nguyễn Văn A",
         Status: "Active",
      },
      {
         ID: "001",
         Name: "NMLT",
         Categories: "CNTT",
         Author: "Nguyễn Văn A",
         Status: "Active",
      },
      {
         ID: "001",
         Name: "NMLT",
         Categories: "CNTT",
         Author: "Nguyễn Văn A",
         Status: "Active",
      },
   ];
   return (
      <div className="book-content">
         <div className="book__new">
            <Link to="/books/books/new" className="btn btn--success btn-link">
               <i className="fa fa-plus" aria-hidden="true"></i>New
            </Link>
         </div>
         <Table
            tableData={tableData}
            headingColums={[
               "ID",
               "Name",
               "Categories",
               "Author",
               "Status",
               "Actions",
            ]}
         >
            <td className="book__table-actions">
               <Link
                  to="/books/books/edit"
                  className="btn btn-link btn--warning"
               >
                  <i className="fa fa-eye" aria-hidden="true"></i>
               </Link>
               <Link
                  to="/books/books/import"
                  className="btn btn-link btn--info"
               >
                  <i className="fa fa-download" aria-hidden="true"></i>
               </Link>
            </td>
         </Table>
      </div>
   );
}

export default BookContent;
