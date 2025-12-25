import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks } from './actions';

const initialState = {
   books: [],
   loading: false,
   error: null,
   sortBy: 'title',   // default sort
   sortOrder: 'asc'   // default order
};

const BookStoreSlice = createSlice({
     name: 'book',
     initialState,
     reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        applySorting: (state) => {
            const { sortBy, sortOrder } = state;
            
            // Safety check: if books is undefined/null, do nothing
            if (!state.books || state.books.length === 0) return;

            state.books.sort((a, b) => {
                // We use || "" to handle cases where a field might be missing/null
                const aValue = (a[sortBy] || "").toString().toLowerCase();
                const bValue = (b[sortBy] || "").toString().toLowerCase();

                if (sortOrder === "asc") {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            });
        }   
    },
    extraReducers: (builder) => {
        builder
            // 1. Loading State
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // 2. Success State
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            // 3. Error State
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

// Export Actions
export const { setSortBy, setSortOrder, applySorting } = BookStoreSlice.actions;

// Export Reducer
export default BookStoreSlice.reducer;