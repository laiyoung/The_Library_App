import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBook } from "../api";


export default function BookDetails() {
  const [bookDetails, setBookDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const bookStack = "./bookstackvector.png";
  const bookCover =
  bookDetails.author === "J.R.R. Tolkien" ? bookStack : bookDetails.coverimage;

  useEffect(() => {
    async function getBookDetails(id) {
      setBookDetails(await getSingleBook(id));
    }
    getBookDetails(id);
  }, []);


  return (
    <>
      <div className="single-card-view">
        <h3>{bookDetails.title}</h3>
        <h4> By: {bookDetails.author}</h4>
        <div className="image-wrapper">
        <img
          style={{ display: "block", margin: "0 auto" }}
          src={bookCover}
          alt={bookDetails.title}
        />
      </div>
        {bookDetails.available ? (
          <p className="available">Available to Borrow</p>
        ) : (
          <p className="checked-out">Checked Out</p>
        )}
        <h4> Description: </h4>
        <p>{bookDetails.description} </p>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Close Description
        </button>
      </div>
    </>
  );
}
