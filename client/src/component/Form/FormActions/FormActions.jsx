import React, { useState } from "react";
import "./FormActions.scss";
import FormActionDetail from "./FormActionDetail/FormActionDetail";
import FormActionSave from "./FormActionSave/FormActionSave";

function FormActions(props) {
   const { cancelCallback, partCancel } = props;
   const [isEdit, setIsEdit] = useState(false);

   const handleEditClick = () => {
      setIsEdit(true);
   };

   const handleCancelClick = () => {
      setIsEdit(false);
      if (typeof cancelCallback === "function") {
         cancelCallback();
      }
   };

   return (
      <div className="form-actions">
         {isEdit ? (
            <FormActionSave cancelClick={handleCancelClick}></FormActionSave>
         ) : (
            <FormActionDetail editClick={handleEditClick}></FormActionDetail>
         )}
      </div>
   );
}

export default FormActions;
