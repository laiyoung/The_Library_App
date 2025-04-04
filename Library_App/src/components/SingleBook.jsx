import React from "react";
import { useNavigate } from "react-router-dom";

export default function SingleBook({ book }) {
  const navigate = useNavigate();
  const bookStack = "./bookstackvector.png";
  const bookCover =
  book.author === "J.R.R. Tolkien" ? bookStack : book.coverimage;

  function handleDetails() {
    navigate(`/${book.id}`);
  }

 

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <h4> By: {book.author}</h4>
      <div className="image-wrapper">
        <img
          style={{ display: "block", margin: "0 auto" }}
          src={bookCover}
          alt={book.title}
        />
      </div>
      {book.available ? (
        <p className="available">Available to Borrow</p>
      ) : (
        <p className="checked-out">Checked Out</p>
      )}
      <button onClick={handleDetails}>Description</button>
    </div>
  );
}
