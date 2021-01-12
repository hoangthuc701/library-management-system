import React from "react";
import { Link } from "react-router-dom";
import AmountForm from "../../AmountForm/AmountForm";
import Button from "../../Button/Button";
import InforGroup from "../../InforGroup/InforGroup";
import InputGroup from "../../InputGroup/InputGroup";
import useInput from "../../../hooks/useInput";
import useSelect from "../../../hooks/UseSelect";
import SelectGroup from "../../SelectGroup/SelectGroup";
import useAmount from "../../../hooks/useAmount";
import FormActionSave from "../FormActions/FormActionSave/FormActionSave";
import FormActions from "../FormActions/FormActions";

function BookForm(props) {
   const { editForm } = props;
   const [name, handleNameChange] = useInput("");
   const [author, handleAuthorChange] = useInput("");
   const [company, handleCompanyChange] = useInput("");
   const [year, handleYearChange] = useSelect("");
   const [categories, handleCategoriesChange] = useSelect("");
   const [price, handlePriceChange, plus, minus, , priceRef] = useAmount();
   const defaultYear = [
      { value: "2010", label: "2010" },
      { value: "2011", label: "2011" },
      { value: "2012", label: "2012" },
   ];
   const defaultCategories = [
      { value: "cnpm", label: "CNPM" },
      { value: "khmt", label: "KHMT" },
      { value: "ttnt", label: "TTNT" },
   ];
   return (
      <form action="" className="new-book-form">
         <ul className="new-book-form__list">
            <li className="new-book-form__item">
               <InputGroup
                  label="Name"
                  placeholder="Book name"
                  isCol="true"
                  value={name}
                  onChange={handleNameChange}
               />
            </li>
            <li className="new-book-form__item">
               <InputGroup
                  label="Author"
                  placeholder="Author name"
                  isCol="true"
                  value={author}
                  onChange={handleAuthorChange}
               />
            </li>
            <li className="new-book-form__item">
               <SelectGroup
                  label="Categories"
                  isCol
                  options={defaultCategories}
                  isMulti
                  value={categories}
                  onChange={handleCategoriesChange}
               ></SelectGroup>
            </li>
            <li className="new-book-form__item">
               <InputGroup
                  placeholder="Publishing Company"
                  label="Company name"
                  isCol="true"
                  value={company}
                  onChange={handleCompanyChange}
               />
            </li>
            <li className="new-book-form__item">
               <SelectGroup
                  label="Publishing Year"
                  isCol
                  options={defaultYear}
                  value={year}
                  onChange={handleYearChange}
               ></SelectGroup>
            </li>
            <li className="new-book-form__item">
               <AmountForm
                  label="Price"
                  isCol="true"
                  value={price}
                  plus={plus}
                  minus={minus}
                  onChange={handlePriceChange}
                  inputRef={priceRef}
               ></AmountForm>
            </li>
            <li className="new-book-form__item">
               <InforGroup name="Staff" value="Nguyễn Văn A"></InforGroup>
            </li>
            <li className="new-book-form__item">
               <InforGroup name="Date" value="../../...."></InforGroup>
            </li>
         </ul>
         {editForm ? (
            <FormActions></FormActions>
         ) : (
            <FormActionSave></FormActionSave>
         )}
      </form>
   );
}

export default BookForm;
