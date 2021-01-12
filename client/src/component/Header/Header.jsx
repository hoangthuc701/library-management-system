import React from "react";
import PropTypes from "prop-types";
import User from "../User/User";
import "./Header.scss";
import Logo from "../Logo/Logo";

Header.propTypes = {};

function Header(props) {
   function handleToggleClick() {
      props.handleClick();
   }
   return (
      <header className="header">
         <div className="header__left">
            <button className="toggle" onClick={handleToggleClick}>
               <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            <Logo></Logo>
         </div>
         <div className="header__right">
            <a href="" className="header__logout">
               <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </a>
         </div>
      </header>
   );
}

export default Header;
