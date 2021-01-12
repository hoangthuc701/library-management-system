import React, { useState } from "react";
import "./Register.scss";
import Button from "../Button/Button";
import FormGroup from "../FormGroup/FormGroup";
import useForm from "../../hooks/useForm";
import validate from "../../validates/RegisterValidate";
import { Link } from "react-router-dom";

function Register(props) {
   const [errorMes, setErrorMes] = useState("");
   function callback(params) {}
   const { handleChange, values, handleSubmit, errors } = useForm(
      validate,
      callback
   );
   return (
      <div className="register">
         <div className="register__header">
            <p className="register__title">Register Form</p>
         </div>
         <form action="" className="register__form" onSubmit={handleSubmit}>
            <FormGroup
               name="username"
               placeholder="Username"
               icon="fa fa-user"
               handleInputChange={handleChange}
               error={errors.username}
            ></FormGroup>
            <FormGroup
               name="email"
               placeholder="E-mail"
               type="email"
               icon="fa fa-envelope"
               handleInputChange={handleChange}
               error={errors.password}
            ></FormGroup>
            <FormGroup
               name="password"
               placeholder="Password"
               type="password"
               icon="fa fa-lock"
               handleInputChange={handleChange}
               error={errors.password}
            ></FormGroup>
            <FormGroup
               name="confirmpassword"
               placeholder="Confirm password"
               type="password"
               icon="fa fa-lock"
               handleInputChange={handleChange}
               error={errors.password}
            ></FormGroup>
            <div className="register__submit">
               <Button>Register</Button>
            </div>
            <div className="register__bottom">
               <Link to="/login" className="register__link">
                  Sign in now
               </Link>
            </div>
         </form>
      </div>
   );
}

export default Register;
