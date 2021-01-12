import React, { useState } from "react";
import "./StaffsForm.scss";
import DateGroup from "../../DateGroup/DateGroup";
import InputGroup from "../../InputGroup/InputGroup";
import SelectGroup from "../../SelectGroup/SelectGroup";
import useInput from "../../../hooks/useInput";
import useDate from "../../../hooks/useDate";
import FormActions from "../FormActions/FormActions";
import FormActionDetail from "../FormActions/FormActionDetail/FormActionDetail";
import FormActionSave from "../FormActions/FormActionSave/FormActionSave";

function StaffsForm(props) {
   const { editForm, initValues = {} } = props;
   const [isEdit, setIsEdit] = useState(false);
   const [name, handleNameChange, resetName] = useInput(initValues.name);
   const [email, handleEmailChange, resetEmail] = useInput(initValues.email);
   const [phone, handlePhoneChange, resetPhone] = useInput(initValues.phone);
   const [address, handleAddressChange, resetAddress] = useInput(
      initValues.address
   );
   const [birthday, handleBirthdayChange, resetBirthday] = useDate(new Date());

   return (
      <form action="" className="staffs-form">
         <ul className="staffs-form__list">
            <li className="staffs-form__item">
               <InputGroup
                  label="Name"
                  isCol
                  placeholder="Your Full Name"
               ></InputGroup>
            </li>
            <li className="staffs-form__item">
               <InputGroup
                  label="Address"
                  isCol
                  placeholder="Your Address"
               ></InputGroup>
            </li>
            <li className="staffs-form__item">
               <DateGroup
                  label="Birth Day"
                  isCol
                  placeholder="Your Birth Day"
               ></DateGroup>
            </li>
            <li className="staffs-form__item">
               <InputGroup
                  label="Phone"
                  isCol
                  placeholder="Your Phone Number"
               ></InputGroup>
            </li>
            <li className="staffs-form__item">
               <SelectGroup
                  label="Degree"
                  isCol
                  placeholder="Select Degree..."
               ></SelectGroup>
            </li>
            <li className="staffs-form__item">
               <SelectGroup
                  label="Part"
                  isCol
                  placeholder="Select Part..."
               ></SelectGroup>
            </li>
            <li className="staffs-form__item">
               <SelectGroup
                  label="Position"
                  isCol
                  placeholder="Select Position..."
               ></SelectGroup>
            </li>
         </ul>
         {editForm ? (
            <FormActions></FormActions>
         ) : (
            <FormActionSave></FormActionSave>
         )}
      </form>
   );
}

export default StaffsForm;
