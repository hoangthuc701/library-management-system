import React, { useState } from "react";
import Button from "../Button/Button";
import FormGroup from "../FormGroup/FormGroup";
import useForm from "../../hooks/useForm";
import validate from "../../validates/ForgetPasswordValidate";
import "./ForgetPassword.scss";
import { Link } from "react-router-dom";

function ForgetPassword(props) {
   const [errorMes, setErrorMes] = useState("");
   const [isSubmit, setIsSubmit] = useState(false);
   function callback(params) {
      setIsSubmit(true);
   }
   const { handleChange, values, handleSubmit, errors } = useForm(
      validate,
      callback
   );
   return (
      <div className="forget-password">
         <div className="forget-password__header">
            <p className="forget-password__title">Forget Password Form</p>
         </div>
         {!isSubmit ? (
            <form
               action=""
               className="forget-password__form"
               onSubmit={handleSubmit}
            >
               <p className="forget-password__desc">
                  Enter your email address and we'll send you a link to reset
                  your password.
               </p>
               <FormGroup
                  name="email"
                  placeholder="Your E-mail"
                  icon="fa fa-envelope"
                  type="email"
                  handleInputChange={handleChange}
                  error={errors.email}
               ></FormGroup>
               <Button type="submit">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i> Send
                  Email
               </Button>
               <div className="forget-password__bottom">
                  <Link to="/login" className="forget-password__link">
                     Sign in
                  </Link>
               </div>
            </form>
         ) : (
            <div className="forget-password__result">
               <p className="forget-password__desc">
                  We have sent you a password reset link. Please check your
                  email.
               </p>
               <div className="forget-password__bottom">
                  <Link to="/login" className="btn btn-link">
                     Sign in now
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
}

export default ForgetPassword;
