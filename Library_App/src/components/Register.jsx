/* TODO - add your code to create a functional React component that renders 
a registration form */
import React from "react";
import { useState } from "react";
import { userRegistration } from "../api";
import { useNavigate } from "react-router-dom";

export default function Registration({ setToken }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    setToken(await userRegistration(userData));
    navigate("/account-view");
  }
  return (
    <>
      <div className="form">
        <form onSubmit={submitHandler}>
          <label>
            {" "}
            First name:{" "}
            <input
              required
              name="firstname"
              value={userData.firstname}
              type="text"
              onChange={handleChange}
            />
          </label>
          <label>
            {" "}
            Last Name:{" "}
            <input
              required
              name="lastname"
              value={userData.lastname}
              type="text"
              onChange={handleChange}
            />
          </label>
          <label>
            {" "}
            Email:{" "}
            <input
              required
              name="email"
              value={userData.email}
              type="text"
              onChange={handleChange}
            />
          </label>
          <label>
            {" "}
            Password:{" "}
            <input
              required
              name="password"
              value={userData.password}
              type="text"
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
