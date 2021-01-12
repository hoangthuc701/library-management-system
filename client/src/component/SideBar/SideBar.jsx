import React from "react";
import Logo from "../Logo/Logo";
import Navbar from "../NarBar/NavBar";
import "./SideBar.scss";
import UserAccount from "./UserAccount/UserAccount";

function SideBar(props) {
   return (
      <div className={"sidebar" + " " + props.className}>
         <UserAccount></UserAccount>
         <Navbar></Navbar>
      </div>
   );
}

export default SideBar;
