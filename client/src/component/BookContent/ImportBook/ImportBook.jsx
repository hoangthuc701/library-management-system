import React from "react";
import "./ImportBook.scss";
import Button from "../../Button/Button";
import FormGroup from "../../FormGroup/FormGroup";
import InforGroup from "../../InforGroup/InforGroup";
import { Link } from "react-router-dom";
import AmountForm from "../../AmountForm/AmountForm";
import useAmount from "../../../hooks/useAmount";

function ImportBook(props) {
   const [amount, handleAmountChange, plus, minus, , amountRef] = useAmount(10);
   return (
      <div className="import-book">
         <div className="import-book__info">
            <InforGroup name="ID" value="1" />
            <InforGroup name="Name" value="CNTT" />
            <InforGroup name="Author" value="Nguyen Van A" />
            <InforGroup name="Amount" value="100" />
            <InforGroup name="Created" value="../../.." />
         </div>
         <form action="" className="import-book__form">
            <AmountForm
               label="Amount"
               value={amount}
               onChange={handleAmountChange}
               inputRef={amountRef}
               plus={plus}
               minus={minus}
            ></AmountForm>
         </form>
         <div className="import-book__actions">
            <Button className="btn btn--primary">
               <i className="fa fa-download" aria-hidden="true"></i>Import
            </Button>
            <Link to="/books/books/" className="btn btn--danger">
               <i className="fa fa-ban" aria-hidden="true"></i>Cancel
            </Link>
         </div>
      </div>
   );
}

export default ImportBook;
