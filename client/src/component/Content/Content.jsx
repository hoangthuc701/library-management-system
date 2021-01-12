import React from "react";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Header from "../Header/Header";
import "./Content.scss";

function Content(props) {
   return (
      <div className={"content" + " " + props.className}>
         <BreadCrumb></BreadCrumb>
         {props.children}
      </div>
   );
}

export default Content;
