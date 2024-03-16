class Store {
  static getBooks() {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      const booksFromStorage = localStorage.getItem("books");
      books = JSON.parse(booksFromStorage);
    }

    return books;
  }

  static getBook(isbn) {
    const books = Store.getBooks();

    return books.find((book) => {
      if (book.isbn === isbn) {
        return book;
      }
      return undefined;
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  static updateBook(isbn, stars) {
    const books = Store.getBooks();

    books.forEach((book) => {
      if (book.isbn === isbn) {
        // eslint-disable-next-line
        book.stars = stars;
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

export default Store;
