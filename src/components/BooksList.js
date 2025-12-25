import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/actions';
import { setSortBy, setSortOrder, applySorting } from '../redux/reducer';

const BooksList = () => {
    const dispatch = useDispatch();
    
    // Select data from Redux store
    const { books, loading, error, sortBy, sortOrder } = useSelector((state) => state.book);

    // Fetch data when component mounts
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    // Re-run sorting whenever sort criteria or order changes
    useEffect(() => {
        dispatch(applySorting());
    }, [sortBy, sortOrder, books.length, dispatch]);

    // Event Handlers
    const handleSortChange = (e) => {
        dispatch(setSortBy(e.target.value));
    };

    const handleOrderChange = (e) => {
        dispatch(setSortOrder(e.target.value));
    };

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="book-container">
            <h1>NYT Best Sellers</h1>
            
            {/* Controls Section */}
            <div className="controls">
                {/* 1st Select: Sort Criteria */}
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="publisher">Publisher</option>
                </select>

                {/* 2nd Select: Sort Order */}
                <select value={sortOrder} onChange={handleOrderChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Data Table */}
            <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
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