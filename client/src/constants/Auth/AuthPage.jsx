import React from "react";
import "./AuthPage.scss";

function AuthPage(props) {
   return <div className="auth-page">{props.children}</div>;
}

export default AuthPage;
