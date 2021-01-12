import React from "react";
import "./FormGroup.scss";
import PropTypes from "prop-types";
import classNames from "classnames";

FormGroup.propTypes = {
   id: PropTypes.string,
   lable: PropTypes.string,
   type: PropTypes.string,
   name: PropTypes.string,
   error: PropTypes.string,
   handleInputChange: PropTypes.func,
};

function FormGroup(props) {
   return (
      <div className="form-group">
         <div className={classNames("form-group__group", { col: props.isCol })}>
            <label htmlFor={props.id} className="form-group__lable">
               {props.lable}:
            </label>
            <div className="form-group__input">
               <input
                  type={props.type}
                  id={props.id}
                  name={props.name}
                  onChange={props.handleInputChange}
                  placeholder={props.placeholder}
                  disabled={props.disabled}
                  value={props.value}
               ></input>
            </div>
            <i className={props.icon} aria-hidden="true"></i>
         </div>
         <p className="form-group__error">{props.error}</p>
      </div>
   );
}

export default FormGroup;
