import React, { useState } from "react";
import Button from "../Button/Button";
import FormGroup from "../FormGroup/FormGroup";
import useForm from "../../hooks/useForm";
import validate from "../../validates/LoginValidate";
import "./Login.scss";
import { Link } from "react-router-dom";

function Login(props) {
   const [errorMes, setErrorMes] = useState("");
   function callback(params) {}
   const { handleChange, values, handleSubmit, errors } = useForm(
      validate,
      callback
   );
   return (
      <div className="login">
         <div className="login__header">
            <p className="login__title">Login Form</p>
         </div>
         <form action="" className="login__form" onSubmit={handleSubmit}>
            <FormGroup
               name="username"
               placeholder="Username"
               icon="fa fa-user"
               handleInputChange={handleChange}
               error={errors.username}
            ></FormGroup>
            <FormGroup
               name="password"
               placeholder="Password"
               type="password"
               icon="fa fa-lock"
               handleInputChange={handleChange}
               error={errors.password}
            ></FormGroup>
            <div className="login__submit">
               <Button type="submit">Sign in</Button>
               <Link to="/forgetpassword" className="login__link">
                  Forgot Password?
               </Link>
            </div>
            <div className="login__bottom">
               <Link to="/register" className="login__link">
                  Sign up now
               </Link>
            </div>
         </form>
      </div>
   );
}

export default Login;
