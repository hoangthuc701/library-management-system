import React from "react";
import { Route } from "react-router-dom";
import ContentInner from "../../Content/ContentInner/ContentInner";
import ContentTitle from "../../Content/ContentTitle/ContentTitle";

function ContentRoue(props) {
   return (
      <Route exact={props.exact} path={props.path}>
         <ContentInner>
            <ContentTitle>{props.title}</ContentTitle>
            {props.children}
         </ContentInner>
      </Route>
   );
}

export default ContentRoue;
