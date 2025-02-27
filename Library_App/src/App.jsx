import { useState, useEffect } from "react";
import bookLogo from "./assets/books.png";
import { Routes, Route } from "react-router-dom";
import { getAllBooks } from "./api";
import Books from "./components/Books";
import Navigation from "./components/Navigations";
import SearchResults from "./components/SearchResults";
import BookDetails from "./components/BookDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import AccountView from "./components/AccountView";

function App() {
  const [token, setToken] = useState(null);
  const [books, setBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [results, setResults] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");


  useEffect(() => {
    async function getData() {
      const bookData = await getAllBooks();
      setBooks(bookData);
      setAvailableBooks(bookData.filter((book) => book.available === true));
    }
    getData();
  }, [availableBooks.length]); 

  if (!books) {
    return <section className="loading">Loading...</section>;
  }
  

  return (
    <>
      <div>
        <header>
          <Navigation token={token} setToken={setToken} />
        </header>

        <h1 className="library-app" style={{ fontWeight: "bold" }}>
          <img id="logo-image" src={bookLogo} />
          The Library App
        </h1>
        <div></div>

        <Routes>
          <Route
            path="/"
            element={
              <Books
                books={books}
                setBooks={setBooks}
                setResults={setResults}
                results={results}
                search={search}
                setSearch={setSearch}
              />
            }
          />
          <Route
            path="/search-results"
            element={<SearchResults results={results} search={search} />}
          />
          <Route path="/:id" element={<BookDetails />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route
            path="/login"
            element={
              <Login
                setToken={setToken}
                token={token}
                user={user}
                setUser={setUser}
              />
            }
          />

          <Route
            path="/account-view"
            element={
              <AccountView
                token={token}
                books={books}
                availableBooks={availableBooks}
                setAvailableBooks={setAvailableBooks}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
