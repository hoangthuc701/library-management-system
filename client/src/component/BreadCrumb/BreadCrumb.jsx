import React from "react";
import { Link } from "react-router-dom";
import "./BreadCrumb.scss";

function BreadCrumb(props) {
   return (
      <div className="breadcrumb">
         <ul className="breadcrumb__list">
            <li className="breadcrumb__item">
               <Link className="breadcrumb__item-link">Books</Link>
               <span>/</span>
            </li>
            <li className="breadcrumb__item">
               <p> Books</p>
            </li>
         </ul>
      </div>
   );
}

export default BreadCrumb;
