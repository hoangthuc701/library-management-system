import React from "react";
import "./EditCategory.scss";
import { Link } from "react-router-dom";
import FormGroup from "../../FormGroup/FormGroup";
import useInput from "../../../hooks/useInput";
import InputGroup from "../../InputGroup/InputGroup";

function EditCategory(props) {
   const [category, handleCategoryChange] = useInput("CNTT");
   return (
      <div className="edit-category">
         <form action="">
            <InputGroup
               label="Category Name"
               value={category}
               onChange={handleCategoryChange}
            ></InputGroup>
         </form>
         <div className="edit-category__actions">
            <Link className="btn btn--primary">
               <i className="fa fa-floppy-o" aria-hidden="true"></i>Save
            </Link>
            <Link className="btn btn--danger" to="/books/categories">
               <i className="fa fa-ban" aria-hidden="true"></i>Cancel
            </Link>
         </div>
      </div>
   );
}

export default EditCategory;
