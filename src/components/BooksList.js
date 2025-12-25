import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/actions";
import { setSortBy, setSortOrder, applySorting } from "../redux/reducer";

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, sortOrder } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (books.length > 0) {
      dispatch(applySorting());
    }
  }, [sortBy, sortOrder, books.length, dispatch]);

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleOrderChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="book-list-container">
      {/* 1. FIXED: Title matched to test expectation */}
      <h1>NYT Best Sellers</h1>

      {/* 2. FIXED: Added Labels. Using a simple structure to ensure select:nth-child works relative to the div */}
      <div className="controls">
        <label htmlFor="sort-by">Sort By:</label>
        {/* select:nth-child(2) within this div if label is 1st, or use unique IDs */}
        <select id="sort-by" value={sortBy} onChange={handleSortChange} className="sort-by">
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        <label htmlFor="order">Order:</label>
        <select id="order" value={sortOrder} onChange={handleOrderChange} className="sort-order">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table border="1" style={{ marginTop: "20px", width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.primary_isbn13 || book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;