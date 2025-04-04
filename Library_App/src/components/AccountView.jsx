import React, { useEffect, useState } from "react";
import AvailableBooks from "./AvailableBooks";
import { API_URL } from "../api";

export default function AccountView({
  token,
  availableBooks,
  setAvailableBooks,
  books,
  refresh,
  setRefresh,
}) {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchAccount() {
      if (!token) {
        setError("You need to log in to view your account details.");
        return;
      }
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          setError("Failed to fetch account details.");
        }
        const result = await response.json();
        setUserData(result);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchAccount();
  }, [token]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const booksResponse = await fetch(`${API_URL}/reservations`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const booksResult = await booksResponse.json();
        setReservations(booksResult);
      } catch {
        console.error;
      }
    }
    fetchReservations();
  }, [token, reservations.length]);
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  async function handleReturn(resId) {
    try {
      await fetch(`${API_URL}/reservations/${resId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations((prevReserved) =>
        prevReserved.filter((reserved) => reserved.id !== resId)
      );

      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <h2>
          Welcome {userData.firstname} {userData.lastname}
        </h2>

        {/* Reservations */}
        <h1 style={{ textDecorationLine: "underline", textAlign: "center" }}>
          Your Currently Reserved Books:
        </h1>
        <h2>You have {reservations.length} book(s) checked out</h2>
        <div className="article">
          {" "}
          {reservations.map((book) => {
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
                <h4> Description: </h4>
                <p>{book.description} </p>
                <button
                  onClick={() => {
                    handleReturn(book.id);
                  }}
                >
                  Return Book
                </button>
              </div>
            );
          })}
        </div>

        {/* Available Books */}
        <h1 style={{ textDecorationLine: "underline", textAlign: "center" }}>
          Books Available for Reservation:
        </h1>
        <div>
          <AvailableBooks
            token={token}
            setReservations={setReservations}
            reservations={reservations}
            setAvailableBooks={setAvailableBooks}
            availableBooks={availableBooks}
            books={books}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </div>
      </div>
    </>
  );
}
