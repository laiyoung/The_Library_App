import React, { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function AvailableBooks({
  token,
  setReservations,
  reservations,
  setAvailableBooks,
  availableBooks,
  books,
  refresh,
  setRefresh
}) {
  async function handleReservation(bookId) {
    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId,
        }),
      });
      const result = await response.json();
      setReservations([...reservations, result]);
      const newAvailableBooks = books.filter((book)=> book.available === true)
      setAvailableBooks(newAvailableBooks);
      setRefresh(!refresh)
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <div className="article">
        {availableBooks && (availableBooks.map((book) => 
          (
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
          )
        ))}
      </div>
    </>
  );
}
