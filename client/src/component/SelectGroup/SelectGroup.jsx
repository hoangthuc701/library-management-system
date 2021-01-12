import React, { useState } from "react";
import "./SelectGroup.scss";
import Select from "react-select";
import PropTypes from "prop-types";
import classNames from "classnames";

function SelectGroup(props) {
   const { id, isCol, label, icon, errors, initValue, ...selectProps } = props;

   const customStyles = {
      // For the select it self, not the options of the select
      control: (provided, state) => ({
         ...provided,
         backgroundColor: state.isDisabled ? "not-allowed" : "default",
      }),
   };

   return (
      <div className="select-group">
         <div className={classNames("select-group__group", { col: isCol })}>
            <label htmlFor={id} className="select-group__lable">
               {label}:
            </label>
            <Select
               {...selectProps}
               classNamePrefix="react-select"
               className="select-group__select"
               styles={customStyles}
               name="categories"
            />
            <i class={icon} aria-hidden="true"></i>
         </div>
         <p className="select-group__error">{errors}</p>
      </div>
   );
}

export default SelectGroup;
