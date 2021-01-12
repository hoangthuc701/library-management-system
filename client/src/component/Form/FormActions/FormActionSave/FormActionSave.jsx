import React from "react";
import Button from "../../../Button/Button";
import { useHistory } from "react-router-dom";

function FormActionSave(props) {
   const { cancelClick } = props;
   let history = useHistory();
   const handleCancelClick = () => {
      if (typeof cancelClick !== "function") {
         history.goBack();
      }
   };
   return (
      <div className="form-actions__save">
         <Button className="btn--primary" type="button">
            <i class="fa fa-floppy-o" aria-hidden="true"></i>Save
         </Button>
         <Button
            onClick={handleCancelClick}
            type="button"
            className="btn--danger"
         >
            <i class="fa fa-ban" aria-hidden="true"></i>Cancel
         </Button>
      </div>
   );
}

export default FormActionSave;
