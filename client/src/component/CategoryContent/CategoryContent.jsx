import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Table from "../Table/Table";
import "./CategoryContent.scss";

function CategoryContent(props) {
   const tableData = [
      {
         ID: "001",
         Category: "KHMT",
         Date: "1/7/2021",
      },
      {
         ID: "002",
         Category: "CNPM",
         Date: "1/7/2021",
      },
      {
         ID: "003",
         Category: "TTNT",
         Date: "1/7/2021",
      },
      {
         ID: "004",
         Category: "DTVT",
         Date: "1/7/2021",
      },
   ];
   return (
      <div className="category-content">
         <div className="category__new">
            <Link
               className="btn btn--success btn-link"
               to="/books/categories/new"
            >
               <i className="fa fa-plus" aria-hidden="true"></i>New
            </Link>
         </div>
         <Table
            tableData={tableData}
            headingColums={["ID", "Category", "Date", "Actions"]}
         >
            <td className="table__actions">
               <Link
                  to="/books/categories/edit"
                  className="btn btn-link btn--warning"
               >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
               </Link>
               <button className="btn btn--danger">
                  <i className="fa fa-trash" aria-hidden="true"></i>
               </button>
            </td>
         </Table>
      </div>
   );
}

export default CategoryContent;
