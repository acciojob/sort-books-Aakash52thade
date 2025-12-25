import { createAsyncThunk } from "@reduxjs/toolkit";

// Google Books API (Public, No Key Required)
// fetching books with subject 'fiction' to get a good list
const API_URL = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10";

export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // The Google API returns a complex structure (data.items)
      // We must map it to the simple structure our Table expects (title, author, publisher)
      const formattedBooks = data.items.map((item) => {
        const info = item.volumeInfo;
        return {
          title: info.title || "No Title",
          // Authors is an array, we take the first one or join them
          author: info.authors ? info.authors.join(", ") : "Unknown Author",
          publisher: info.publisher || "Unknown Publisher",
          primary_isbn13: info.industryIdentifiers ? info.industryIdentifiers[0]?.identifier : "N/A"
        };
      });

      return formattedBooks;
    } catch (error) {
      throw Error("Failed to fetch books");
    }
  }
);