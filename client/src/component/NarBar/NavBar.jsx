import React from "react";
import { NavLink } from "react-router-dom";
import DropDown from "../DropDown/DropDown";
import "./NavBar.scss";

function Navbar(props) {
   return (
      <ul className="navbar">
         <li className="navbar__item">
            <NavLink
               to="/home"
               className="navbar__link"
               activeClassName="active"
            >
               <i className="fa fa-home" aria-hidden="true"></i>
               <span>Home</span>
            </NavLink>
         </li>
         <li className="navbar__item">
            <DropDown
               name="Books Management"
               icon="fa fa-book"
               to="/books"
               listItem={[
                  {
                     name: "Books",
                     link: "books",
                  },
                  {
                     name: "Categories",
                     link: "categories",
                  },
               ]}
            />
         </li>
         <li className="navbar__item">
            <DropDown
               name="Staffs"
               to="/staffs"
               icon="fa fa-users"
               listItem={[
                  { name: "Staffs", link: "staffs" },
                  { name: "Readers", link: "readers" },
               ]}
            />
         </li>
         <li className="navbar__item">
            <NavLink
               to="/profile"
               className="navbar__link"
               activeClassName="active"
            >
               <i className="fa fa-user" aria-hidden="true"></i>
               <span>Profile</span>
            </NavLink>
         </li>
      </ul>
   );
}

export default Navbar;
