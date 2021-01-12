import React from "react";
import PropTypes from "prop-types";
import "./User.scss";

User.propTypes = {};

function User(props) {
   return (
      <div className="user">
         <div className="user__imgbox">
            <img
               src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
               alt=""
               className="user__img"
            />
         </div>
         <span className="user__name">
            <p>Admin</p>
            <i className="fa fa-sort-desc" aria-hidden="true"></i>
         </span>
      </div>
   );
}

export default User;
