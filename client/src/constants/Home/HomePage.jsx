import React, { Children, useState } from "react";
import Header from "../../component/Header/Header";
import SideBar from "../../component/SideBar/SideBar";
import "./HomePage.scss";
import classNames from "classnames";
import Content from "../../component/Content/Content";
import { Route } from "react-router-dom";
import BookContent from "../../component/BookContent/BookContent";
import CategoryContent from "../../component/CategoryContent/CategoryContent";
import ContentRoue from "../../component/Roues/ContentRoue/ContentRoue";
import Profile from "../../component/Profile/Profile";
import NewCategory from "../../component/CategoryContent/NewCategory/NewCategory";
import ImportBook from "../../component/BookContent/ImportBook/ImportBook";
import EditCategory from "../../component/CategoryContent/EditCategory/EditCategory";
import NewBook from "../../component/BookContent/NewBook/NewBook";
import EditBook from "../../component/BookContent/EditBook/EditBook";
import StaffsContent from "../../component/StaffsContent/StaffsContent";
import NewStaffs from "../../component/StaffsContent/NewStaffs/NewStaffs";
import EditStaffs from "../../component/StaffsContent/EditStaffs/EditStaffs";

function HomePage(props) {
   const [isSideBar, setIsSideBar] = useState(true);
   function handleClick() {
      setIsSideBar(!isSideBar);
   }
   return (
      <div className="homepage">
         <Header handleClick={handleClick}></Header>
         <SideBar className={classNames({ open: isSideBar })}></SideBar>
         <Content className={classNames({ full: !isSideBar })}>
            <ContentRoue exact path="/books/books" title="Books">
               <BookContent></BookContent>
            </ContentRoue>
            <ContentRoue path="/books/books/import" title="Import Book">
               <ImportBook></ImportBook>
            </ContentRoue>
            <ContentRoue path="/books/books/new" title="New Book">
               <NewBook></NewBook>
            </ContentRoue>
            <ContentRoue path="/books/books/edit" title="Edit Book">
               <EditBook></EditBook>
            </ContentRoue>
            <ContentRoue exact path="/books/categories" title="Categories">
               <CategoryContent></CategoryContent>
            </ContentRoue>
            <ContentRoue path="/books/categories/new" title="New Category">
               <NewCategory></NewCategory>
            </ContentRoue>
            <ContentRoue path="/books/categories/edit" title="Edit Category">
               <EditCategory></EditCategory>
            </ContentRoue>
            <ContentRoue exact path="/staffs/staffs" title="Staffs">
               <StaffsContent></StaffsContent>
            </ContentRoue>
            <ContentRoue path="/staffs/staffs/new" title="New Staffs">
               <NewStaffs></NewStaffs>
            </ContentRoue>
            <ContentRoue path="/staffs/staffs/edit" title="Edit Staffs">
               <EditStaffs></EditStaffs>
            </ContentRoue>
            <ContentRoue path="/profile" title="Profile">
               <Profile></Profile>
            </ContentRoue>
         </Content>
      </div>
   );
}

export default HomePage;
