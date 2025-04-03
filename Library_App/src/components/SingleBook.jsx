import React from "react";
import { useNavigate } from "react-router-dom";

export default function SingleBook({ book }) {
  const navigate = useNavigate();
  const bookStack = "../public/bookstackvector.png";

  function handleDetails() {
    navigate(`/${book.id}`);
  }
 
  const bookCover = book.author === "J.R.R. Tolkien" ? bookStack : book.coverimage ;

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <h4> By: {book.author}</h4>
      <img src={bookCover} alt={book.title} />
      {book.available ? (
        <p className="available">Available to Borrow</p>
      ) : (
        <p className="checked-out">Checked Out</p>
      )}
      <button onClick={handleDetails}>Description</button>
    </div>
  );
}
