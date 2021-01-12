import React from "react";
import "./NewBook.scss";
import BookForm from "../../Form/BookForm/BookForm";

function NewBook(props) {
   return (
      <div className="new-book">
         <BookForm></BookForm>
      </div>
   );
}

export default NewBook;
