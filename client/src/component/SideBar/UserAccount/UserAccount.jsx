import React from "react";
import PropTypes from "prop-types";
import "./UserAccount.scss";

UserAccount.propTypes = {};

function UserAccount(props) {
   return (
      <div className="useraccount">
         <div className="useraccount__imgbox">
            <img
               src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
               alt=""
               className="useraccount__img"
            />
         </div>
         <div className="useraccount__info">
            <p className="useraccount__name">Minh Sang</p>
            <p className="useraccount__role">Admin</p>
         </div>
      </div>
   );
}

export default UserAccount;
