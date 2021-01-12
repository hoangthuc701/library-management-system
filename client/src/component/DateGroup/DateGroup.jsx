import React from "react";
import "./DateGroup.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";

function DateGroup(props) {
   const {
      register,
      errors,
      label,
      id,
      isCol,
      disabled,
      placeholder,
      ...dateProps
   } = props;
   console.log(dateProps);
   const CustomInput = ({ value, onClick }) => (
      <div className="date-group__input">
         <input
            id="date"
            type="text"
            disabled={disabled}
            value={value}
            onClick={onClick}
            placeholder={placeholder}
         />
         <label htmlFor="date">
            <i className="fa fa-calendar" aria-hidden="true"></i>
         </label>
      </div>
   );
   return (
      <div className="date-group">
         <div className={classNames("date-group__group", { col: isCol })}>
            <label htmlFor={id} className="date-group__lable">
               {label}:
            </label>
            <div className="date-group__datepicker">
               <DatePicker
                  customInput={<CustomInput />}
                  {...dateProps}
               ></DatePicker>
            </div>
         </div>
         <p className="date-group__error">{errors}</p>
      </div>
   );
}

export default DateGroup;
