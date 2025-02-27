import React, { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function AvailableBooks({
  token,
  setReservations,
  reservations,
  setAvailableBooks,
  availableBooks,
}) {
  async function handleReservation(bookId, book) {
    try {
      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          available: !book.available,
        }),
      });
      const result = await response.json();
      setReservations([...reservations, result.book]);
      setAvailableBooks((prevAvailable) =>
        prevAvailable.filter((book) => book.id !== result.book.id)
      );
     
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="article">
        {availableBooks.map((book) => {
          return (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <h4> By: {book.author}</h4>
              <img src={book.coverimage} alt={book.title} />
              {book.available ? (
                <p className="available">Available to Borrow</p>
              ) : (
                <p className="checked-out">Checked Out</p>
              )}
              <h4> Description: </h4>
              <p>{book.description} </p>
              <button
                onClick={() => {
                  handleReservation(book.id, book);
                }}
              >
                Reserve Book
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
