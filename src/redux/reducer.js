import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "./actions";

const initialState = {
  books: [],
  loading: false,
  error: null,
  sortBy: "title",
  sortOrder: "asc",
};

const BookStoreSlice = createSlice({
  name: "book",
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
      if (!state.books.length) return;

      state.books.sort((a, b) => {
        const valA = a[sortBy] ? a[sortBy].toString().toLowerCase() : "";
        const valB = b[sortBy] ? b[sortBy].toString().toLowerCase() : "";

        if (sortOrder === "asc") {
          return valA.localeCompare(valB);
        } else {
          return valB.localeCompare(valA);
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, setSortOrder, applySorting } = BookStoreSlice.actions;
export default BookStoreSlice.reducer;