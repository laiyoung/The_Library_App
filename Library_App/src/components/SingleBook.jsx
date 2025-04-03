import React from "react";
import { useNavigate } from "react-router-dom";

export default function SingleBook({ book }) {
  const navigate = useNavigate();
  const bookStack = "./assets/bookstackvector.png";

  function handleDetails() {
    navigate(`/${book.id}`);
  }

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <h4> By: {book.author}</h4>
      <img
        src={book.coverimage}
        onError={(e) => (e.currentTarget.src = bookStack)}
        alt={book.title || bookStack}
      />
      {book.available ? (
        <p className="available">Available to Borrow</p>
      ) : (
        <p className="checked-out">Checked Out</p>
      )}
      <button onClick={handleDetails}>Description</button>
    </div>
  );
}
