import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  books,
  results,
  setResults,
  search,
  setSearch,
}) {
  const navigate = useNavigate();

  function handleSearch() {
    results = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setResults(results);
    navigate("/search-results");
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <>
      <div className="search">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <label id="bookSearch">Find a Book:</label>
          <input
            name="bookSearch"
            type="text"
            placeholder="Book Title"
            onChange={handleChange}
          />
          <button type="submit">Search for a Book</button>
        </form>
      </div>
    </>
  );
}
