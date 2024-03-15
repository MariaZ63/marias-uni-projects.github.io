/**
 * @typedef {Object} Book
 * @property {string} title - The title of the book.
 * @property {string} author - The author of the book.
 * @property {string} isbn - The ISBN of the book (must have 10 digits).
 * @property {string} description - The description of the book.
 * @property {number} stars - The star rating of the book.
 */

/**
 * Represents a book with title, author, ISBN, description, and star rating.
 */
class Book {
  /**
   * Creates an instance of the Book class.
   *
   * @constructor
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {string} isbn - The ISBN of the book (must have 10 digits).
   * @param {string} description - The description of the book.
   * @throws {Error} Throws an error if any of the required fields is empty or if the ISBN is invalid.
   */
  constructor(title, author, isbn, description) {
    if (title === "" || author === "" || isbn === "" || description === "") {
      throw new Error("Please fill in all fields");
    }

    Book.isISBNValid(isbn);

    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.description = description;
    this.stars = 1;
  }

  /**
   * Checks if the provided ISBN is valid using a regular expression.
   *
   * @static
   * @function
   * @param {string} isbn - The ISBN to validate.
   * @throws {Error} Throws an error if the ISBN is invalid.
   */
  static isISBNValid(isbn) {
    const isbnRegex = /^(?=[-0-9X ]{13}$)(?:[0-9]+[- ]){3}[0-9]*[X0-9]$/;

    if (!isbnRegex.test((isbn))) {
      throw new Error("ISBN must have 10 digits");
    }
  }
}

export default Book;
