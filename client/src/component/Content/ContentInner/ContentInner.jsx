import React from "react";
import "../Content.scss";

function ContentInner(props) {
   return <div className="content__inner">{props.children}</div>;
}

export default ContentInner;
