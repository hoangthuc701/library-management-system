import React, { useState } from "react";
import "./Profile.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import InputGroup from "../InputGroup/InputGroup";
import useInput from "../../hooks/useInput";
import InforGroup from "../InforGroup/InforGroup";
import DateGroup from "../DateGroup/DateGroup";
import useDate from "../../hooks/useDate";

function Profile(props) {
   let initValues = {
      name: "Nguyễn Minh Sang",
      email: "msang77335@gmail.com",
      phone: "0967272059",
      address: "Ấp 1 Mỹ Yên Bên Lức Long An",
      parts: "Thủ Thư",
      degree: "Đại Học",
      position: "Nhân Viên",
   };
   const [isEdit, setIsEdit] = useState(false);
   const [name, handleNameChange, resetName] = useInput(initValues.name);
   const [email, handleEmailChange, resetEmail] = useInput(initValues.email);
   const [phone, handlePhoneChange, resetPhone] = useInput(initValues.phone);
   const [address, handleAddressChange, resetAddress] = useInput(
      initValues.address
   );
   const [birthday, handleBirthdayChange, resetBirthday] = useDate(new Date());

   function handleEditClick() {
      setIsEdit(true);
   }

   function handleCancelClick() {
      setIsEdit(false);
      resetName();
      resetPhone();
      resetEmail();
      resetAddress();
      resetBirthday();
   }

   return (
      <form className="profile">
         <div className="profile__top">
            <div className="profile__img-info">
               <div className="profile__img-box">
                  <img
                     src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                     alt=""
                     className="profile__img"
                  />
               </div>
               {isEdit && (
                  <Button className="btn--success">
                     <i className="fa fa-folder-open" aria-hidden="true"></i>
                     Browse
                  </Button>
               )}
            </div>
            <div className="profile__info">
               <InputGroup
                  label="Name"
                  name="name"
                  value={name}
                  disabled={!isEdit}
                  onChange={handleNameChange}
               />
               <InputGroup
                  label="Email"
                  name="email"
                  value={email}
                  disabled={!isEdit}
                  onChange={handleEmailChange}
               />
               <InputGroup
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  disabled={!isEdit}
                  onChange={handlePhoneChange}
               />
               <InputGroup
                  label="Address"
                  name="address"
                  value={address}
                  disabled={!isEdit}
                  onChange={handleAddressChange}
               />
               <DateGroup
                  label="Birthday"
                  selected={birthday}
                  onChange={handleBirthdayChange}
                  disabled={!isEdit}
               />
               <div className="profile__info__bottom">
                  <InforGroup name="Position" value={initValues.position} />
                  <InforGroup name="Parts" value={initValues.parts} />
                  <InforGroup name="Degree" value={initValues.degree} />
               </div>
            </div>
         </div>
         <div className="profile__actions">
            {isEdit ? (
               <div>
                  <Button className="btn--primary" type="button">
                     <i className="fa fa-floppy-o" aria-hidden="true"></i>Save
                  </Button>
                  <Button
                     type="button"
                     className="btn--danger"
                     onClick={handleCancelClick}
                  >
                     <i className="fa fa-ban" aria-hidden="true"></i>Cancel
                  </Button>
               </div>
            ) : (
               <Button
                  type="button"
                  className="btn--warning"
                  onClick={handleEditClick}
               >
                  <i className="fa fa-pencil" aria-hidden="true"></i>Edit
               </Button>
            )}
         </div>
      </form>
   );
}

export default Profile;
