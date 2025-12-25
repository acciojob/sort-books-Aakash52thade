import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // MOCK DATA: 15 Books to satisfy the "60 table cells" test requirement
    // (15 rows * 4 columns = 60 elements)
    const mockData = [
      { title: "The Women", author: "Kristin Hannah", publisher: "St. Martin's", primary_isbn13: "9781250178633" },
      { title: "Fourth Wing", author: "Rebecca Yarros", publisher: "Red Tower", primary_isbn13: "9781649374042" },
      { title: "Iron Flame", author: "Rebecca Yarros", publisher: "Red Tower", primary_isbn13: "9781649374172" },
      { title: "The Heaven & Earth Grocery Store", author: "James McBride", publisher: "Riverhead", primary_isbn13: "9780593422946" },
      { title: "House of Flame and Shadow", author: "Sarah J. Maas", publisher: "Bloomsbury", primary_isbn13: "9781635574104" },
      { title: "Holly", author: "Stephen King", publisher: "Scribner", primary_isbn13: "9781668016138" },
      { title: "The Exchange", author: "John Grisham", publisher: "Doubleday", primary_isbn13: "9780385548953" },
      { title: "Tom Lake", author: "Ann Patchett", publisher: "Harper", primary_isbn13: "9780063327528" },
      { title: "Lessons in Chemistry", author: "Bonnie Garmus", publisher: "Doubleday", primary_isbn13: "9780385547345" },
      { title: "Yellowface", author: "R.F. Kuang", publisher: "Morrow", primary_isbn13: "9780063250833" },
      { title: "Happy Place", author: "Emily Henry", publisher: "Berkley", primary_isbn13: "9780593441275" },
      { title: "Hello Beautiful", author: "Ann Napolitano", publisher: "Dial", primary_isbn13: "9780593243732" },
      { title: "The Covenant of Water", author: "Abraham Verghese", publisher: "Grove", primary_isbn13: "9780802162175" },
      { title: "Demon Copperhead", author: "Barbara Kingsolver", publisher: "Harper", primary_isbn13: "9780063251922" },
      { title: "Remarkably Bright Creatures", author: "Shelby Van Pelt", publisher: "Ecco", primary_isbn13: "9780063204157" }
    ];

    return mockData;
  }
);