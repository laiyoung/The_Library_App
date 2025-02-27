/* TODO - add your code to create a functional React component that renders details for a single book. 
Fetch the book data from the provided API. You may consider conditionally rendering a 
'Checkout' button for logged in users. */
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SingleBook({ book }) {
  const navigate = useNavigate();

  function handleDetails() {
    navigate(`/${book.id}`);
  }

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <h4> By: {book.author}</h4>
      <img src={book.coverimage} alt={book.title} />
      {book.available ? (
        <p className="available">Available to Borrow</p>
      ) : (
        <p className="checked-out">Checked Out</p>
      )}
      <button onClick={handleDetails}>Description</button>
    </div>
  );
}
