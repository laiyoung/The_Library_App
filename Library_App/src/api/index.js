/** API Link */
export const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

/** Book Fetches + Updates */

// Fetching All Books:
export async function getAllBooks() {
  try {
    const response = await fetch(`${API_URL}/books`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result.books;
  } catch (error) {
    console.error("Uh oh, trouble fetching books!", error);
  }
}

// Single Book Fetch:
export async function getSingleBook(id) {
  try {
    const response = await fetch(API_URL + `/books/${id}`);
    const result = await response.json();
    return result.book;
  } catch (error) {
    console.error(error);
  }
}

// Updating Book Availability:
/** Embedded in the Account View API Calls  */


/** Registration + Authentification */

// User Registration:
export async function userRegistration(userData) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    return result.token
  } catch (err) {
    console.error("Oops, something went wrong with your registration!", err);
  }
}

// Login:
export async function accountLogin(userLogin) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    });
    const result = await response.json();
    return result.token;
  } catch (error) {
    console.error(error);
  }
}

// Get User Info with Token:
/** Embedded in Account View */


/** User Account Actions */

// Getting User's Book Reservations:
/** Embedded in the Account View API Calls  */

// Delete Book Reservation:
/** Embedded in the Account View API Calls  */

