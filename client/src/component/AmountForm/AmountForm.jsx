import React, { useRef, useEffect, useState } from "react";
import Button from "../Button/Button";
import "./AmountForm.scss";

function AmountForm(props) {
   const { label, value, disabled, inputRef, onChange, plus, minus } = props;

   return (
      <div className="amount-form">
         <label htmlFor="" className="amount-form__label">
            {label}:
         </label>
         <div className="amount-form__actions">
            <Button
               type="button"
               className="btn--primary"
               onClick={minus}
               disabled={disabled}
            >
               <i className="fa fa-minus" aria-hidden="true"></i>
            </Button>
            <input
               value={value}
               ref={inputRef}
               type="number"
               className="amount-form__input"
               onChange={onChange}
               disabled={disabled}
            />
            <Button
               type="button"
               className="btn--primary"
               onClick={plus}
               disabled={disabled}
            >
               <i className="fa fa-plus" aria-hidden="true"></i>
            </Button>
         </div>
      </div>
   );
}

export default AmountForm;
