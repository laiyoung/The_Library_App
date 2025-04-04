import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchResults({ results, search }) {
  const navigate = useNavigate();

  async function handleBack() {
    navigate("/");
  }

  return (
    <div className="article">
      <h2> Your search for "{search}", returned: </h2>
      {results.map((book) => {
        const bookStack = "./bookstackvector.png";
        const bookCover =
          book.author === "J.R.R. Tolkien" ? bookStack : book.coverimage;
        return (
          <div key={book.id} className="single-card-view">
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
            <h4> Description: </h4>
            <p>{book.description} </p>
          </div>
        );
      })}

      <button onClick={handleBack}>Back To the Full Catalog</button>
    </div>
  );
}
