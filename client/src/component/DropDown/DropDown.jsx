import React, { useRef, useState } from "react";
import "./DropDown.scss";
import classNames from "classnames";
import { Link, NavLink, Route } from "react-router-dom";

function DropDown(props) {
   const { listItem, to } = props;
   const [isOpen, setIsOpen] = useState(false);
   const dropdownListRef = useRef();
   function handleClick() {
      if (isOpen) {
         setIsOpen(false);
         dropdownListRef.current.style.maxHeight = "0px";
      } else {
         setIsOpen(true);
         dropdownListRef.current.style.maxHeight =
            dropdownListRef.current.scrollHeight + "px";
      }
   }
   return (
      <Route
         path={to}
         children={({ match }) => {
            let active = match ? " active" : "";
            return (
               <div
                  className={classNames("dropdown", { open: isOpen }) + active}
               >
                  {listItem.map((item) => {
                     <p>{item.name}</p>;
                  })}
                  <button className="dropdown__title" onClick={handleClick}>
                     <span className="dropdown__name">
                        <i className={props.icon} aria-hidden="true"></i>
                        {props.name}
                     </span>
                  </button>
                  <ul ref={dropdownListRef} className="dropdown__list">
                     {listItem.map((item) => {
                        return (
                           <li className="dropdown__item">
                              <NavLink
                                 activeClassName="active"
                                 to={to + "/" + item.link}
                                 className="dropdown__item-link"
                              >
                                 {item.name}
                              </NavLink>
                           </li>
                        );
                     })}
                  </ul>
               </div>
            );
         }}
      />
   );
}

export default DropDown;
