import React, { useEffect, useState } from "react";
import "./EditBook.scss";
import { Link } from "react-router-dom";
import AmountForm from "../../AmountForm/AmountForm";
import Button from "../../Button/Button";
import FormGroup from "../../FormGroup/FormGroup";
import InforGroup from "../../InforGroup/InforGroup";
import useForm from "../../../hooks/useForm";
import SelectGroup from "../../SelectGroup/SelectGroup";
import useInput from "../../../hooks/useInput";
import InputGroup from "../../InputGroup/InputGroup";
import useSelect from "../../../hooks/UseSelect";
import useAmount from "../../../hooks/useAmount";

function EditBook(props) {
   let initValues = {
      name: "CNPM",
      author: "Hồ Thanh Phong",
      company: "NXB Trẻ",
      year: { value: "2010", label: "2010" },
      staff: "Lê A",
      date: "22/10/2014",
      price: "10",
      categories: [{ value: "khmt", label: "KHMT" }],
   };

   const [name, handleNameChange, resetName] = useInput(initValues.name);
   const [author, handleAuthorChange, resetAuthor] = useInput(
      initValues.author
   );
   const [company, handleCompanyChange, resetCompany] = useInput(
      initValues.company
   );
   const [categories, handleCategoriesChange, resetCategories] = useSelect(
      initValues.categories
   );
   const [year, handleYearChange, resetYear] = useSelect(initValues.year);
   const [
      price,
      handleAmountChange,
      plusAmount,
      minusAmount,
      resetAmount,
      priceRef,
   ] = useAmount(initValues.price);
   const [isEdit, setIsEdit] = useState(false);

   function handleEditClick() {
      setIsEdit(true);
   }

   function handleCancelClick() {
      setIsEdit(false);
      resetName();
      resetAuthor();
      resetCompany();
      resetCategories();
      resetYear();
      resetAmount();
   }

   const defaultCategories = [
      { value: "cnpm", label: "CNPM" },
      { value: "khmt", label: "KHMT" },
      { value: "ttnt", label: "TTNT" },
   ];

   const defaultYear = [
      { value: "2010", label: "2010" },
      { value: "2011", label: "2011" },
      { value: "2012", label: "2012" },
   ];
   return (
      <div className="edit-book">
         <form action="" className="edit-book-form">
            <ul className="edit-book-form__list">
               <li className="edit-book-form__item">
                  <InputGroup
                     label="Name"
                     value={name}
                     placeholder="Book name"
                     isCol="true"
                     disabled={!isEdit}
                     onChange={handleNameChange}
                  />
               </li>
               <li className="edit-book-form__item">
                  <InputGroup
                     label="Author"
                     name="author"
                     value={author}
                     placeholder="Author name"
                     isCol="true"
                     disabled={!isEdit}
                     onChange={handleAuthorChange}
                  />
               </li>
               <li className="edit-book-form__item">
                  <SelectGroup
                     label="Categories"
                     isCol
                     options={defaultCategories}
                     value={categories}
                     isDisabled={!isEdit}
                     isMulti
                     onChange={handleCategoriesChange}
                  ></SelectGroup>
               </li>
               <li className="edit-book-form__item">
                  <InputGroup
                     placeholder="Publishing Company"
                     label="Company name"
                     name="company"
                     value={company}
                     isCol="true"
                     disabled={!isEdit}
                     onChange={handleCompanyChange}
                  />
               </li>
               <li className="edit-book-form__item">
                  <SelectGroup
                     label="Publishing Year"
                     name="year"
                     value={year}
                     placeholder="Publishing Year"
                     isCol="true"
                     isDisabled={!isEdit}
                     options={defaultYear}
                     onChange={handleYearChange}
                  />
               </li>
               <li className="edit-book-form__item">
                  <AmountForm
                     label="Price"
                     isCol="true"
                     value={price}
                     disabled={!isEdit}
                     onChange={handleAmountChange}
                     plus={plusAmount}
                     minus={minusAmount}
                     inputRef={priceRef}
                  ></AmountForm>
               </li>
               <li className="edit-book-form__item">
                  <InforGroup
                     name="Staff"
                     value={initValues.staff}
                  ></InforGroup>
               </li>
               <li className="edit-book-form__item">
                  <InforGroup name="Date" value={initValues.date}></InforGroup>
               </li>
            </ul>
            <div className="edit-book__actions">
               {isEdit ? (
                  <div>
                     <Button className="btn--primary" type="button">
                        <i class="fa fa-floppy-o" aria-hidden="true"></i>Save
                     </Button>
                     <Button
                        type="button"
                        className="btn--danger"
                        onClick={handleCancelClick}
                     >
                        <i class="fa fa-ban" aria-hidden="true"></i>Cancel
                     </Button>
                  </div>
               ) : (
                  <div>
                     <Link className="btn btn--info" to="/books/books">
                        <i className="fa fa-undo" aria-hidden="true"></i>Back
                     </Link>
                     <Button type="button" className="btn--danger">
                        <i class="fa fa-trash" aria-hidden="true"></i>Delete
                     </Button>
                     <Button
                        type="button"
                        className="btn--warning"
                        onClick={handleEditClick}
                     >
                        <i class="fa fa-pencil" aria-hidden="true"></i>Edit
                     </Button>
                  </div>
               )}
            </div>
         </form>
      </div>
   );
}

export default EditBook;
