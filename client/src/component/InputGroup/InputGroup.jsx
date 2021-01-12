import React from "react";
import "./InputGroup.scss";
import classNames from "classnames";

function InputGroup(props) {
   const { register, errors, label, id, isCol, icon, ...inputProps } = props;
   return (
      <div className="input-group">
         <div className={classNames("input-group__group", { col: isCol })}>
            <label htmlFor={id} className="input-group__lable">
               {label}:
            </label>
            <div className="input-group__input">
               <input ref={register} id={id} {...inputProps}></input>
            </div>
            <i className={icon} aria-hidden="true"></i>
         </div>
         <p className="input-group__error">{errors}</p>
      </div>
   );
}

export default InputGroup;
