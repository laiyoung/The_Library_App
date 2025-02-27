import React from "react";
import SingleBook from "./SingleBook";
import SearchBar from "./SearchBar";
import { useEffect } from "react";

export default function Books({
  books,
  results,
  setResults,
  search,
  setSearch,
}) {
  return (
    <>
      <div>
        <SearchBar
          books={books}
          setResults={setResults}
          results={results}
          search={search}
          setSearch={setSearch}
        ></SearchBar>{" "}
      </div>

      <h1 style={{ textDecorationLine: "underline", textAlign: "center" }}>
        See Our Full Collection
      </h1>
      <div className="article">
        {books.map((book) => {
          return <SingleBook key={book.id} book={book} />;
        })}
      </div>
    </>
  );
}
