import React from "react";
import { Link } from "react-router-dom";
import FormGroup from "../../FormGroup/FormGroup";
import "./NewCategory.scss";

function NewCategory(props) {
   return (
      <form className="new-category">
         <FormGroup lable="Name" placeholder="Category Name"></FormGroup>
         <div className="new-category__actions">
            <Link className="btn btn--primary">
               <i className="fa fa-floppy-o" aria-hidden="true"></i>Save
            </Link>
            <Link className="btn btn--danger" to="/books/categories">
               <i className="fa fa-ban" aria-hidden="true"></i>Cancel
            </Link>
         </div>
      </form>
   );
}

export default NewCategory;
