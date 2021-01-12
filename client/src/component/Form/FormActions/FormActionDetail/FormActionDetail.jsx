import React from "react";
import Button from "../../../Button/Button";
import { useHistory } from "react-router-dom";

function FormActionDetail(props) {
   const { editClick } = props;
   let history = useHistory();
   const handleBackClick = () => {
      history.goBack();
   };
   return (
      <div className="form-actions__detail">
         <Button
            type="button"
            className="btn btn--info"
            onClick={handleBackClick}
         >
            <i className="fa fa-undo" aria-hidden="true"></i>Back
         </Button>
         <Button type="button" className="btn--danger">
            <i class="fa fa-trash" aria-hidden="true"></i>Delete
         </Button>
         <Button type="button" className="btn--warning" onClick={editClick}>
            <i class="fa fa-pencil" aria-hidden="true"></i>Edit
         </Button>
      </div>
   );
}

export default FormActionDetail;
