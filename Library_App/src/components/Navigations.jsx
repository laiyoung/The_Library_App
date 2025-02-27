/* TODO - add your code to create a functional React component that renders a 
navigation bar for the different views in your single page application. You may 
consider conditionally rendering some options - for example 'Login' should be 
available if someone has not logged in yet. **/
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navigation({ token, setToken }) {
  const navigate = useNavigate();
  async function handlelogOut() {
    navigate("/");
    setToken(null);
  }

  return token ? (
    <div className="nav">
      <Link to={"/"}>
        {" "}
        <h2>Full Catalog</h2>
      </Link>
      <Link to={"/account-view"}>
        <h2>Make a Reservation</h2>
      </Link>
      <button onClick={handlelogOut}>Log Out</button>
    </div>
  ) : (
    <div className="nav">
      <Link to={"/"}>
        {" "}
        <h2>Full Catalog</h2>
      </Link>
      <Link to={"/login"}>
        <h2>Login for Reservations</h2>
      </Link>
    </div>
  );
}
