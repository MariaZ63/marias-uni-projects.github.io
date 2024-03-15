import Store from "./Store";
import Book from "./Book";


/**
 * The BookManager class uses all the methods of the Store class. Additional and supplementary methods for managing the books are provided here. As in the methods of the Store class, all methods are static and most of the methods are asynchronous.
 * @class
 */
class BookManager {

  /**
   * Retrieves all books from the Store (Firebase database)
   * @static
   * @async
   * @method
   * @returns {Promise<Array<Book>>} Returns a Promise that resolves to an array of Book objects
  */

  static async getBooks() {
    return await Store.getBooks();
  }

  /**
   * Retrieves a specific books objects from the Store (Firebase database) according to the given ISBN
   * @static
   * @async
   * @method
   * @param {string} isbn - the ISBN of the book to be downloaded. ISBN must adhere to the format specified in the Book class (e.g., "XXX-XXX-XXX-X").
   * @returns {Promise<Book>} Returns a Promise that resolves to the Book Object with the corresponding ISBN
  */
  static async getBook(isbn) {
    return await Store.getBook(isbn);
  }

    /**
   * Method to update the rating of a specific book in the store given the ISBN and stars
   * @static
   * @async
   * @method 
   * @param {string} isbn - the ISBN of the book to be updated. ISBN must adhere to the format specified in the Book class (e.g., "XXX-XXX-XXX-X").
   * @param {number} stars - The number of stars. The number can be a maximum of five (Stars <= 5)
   * @returns {Promise<void>} Promise that resolves when the book is successfully updated to the database. 
  */
  static async updateBook(isbn, stars) {
    return await Store.updateBook(isbn, stars);
  }

  /**
   * Adds a given book object to the store (Firebase database)
   * @static
   * @async
   * @method
   * @param {string} title - The title of the book to be added.
   * @param {string} author - The author of the book to be added.
   * @param {string} isbn - the ISBN of the book to be added. ISBN must adhere to the format specified in the Book class (e.g., "XXX-XXX-XXX-X").
   * @param {string} description - The description of the book to be added.
   * @returns {Promise<void>} Promise that resolves when the book is successfully added to the database.
   * @throws {Error} Throws an error object if the specified ISBN of the book to be created already exists in the database.
  */
  static async addBook(title, author, isbn, description) {
    const book = new Book(title, author, isbn, description);
    const books = await Store.getBooks();

    if (BookManager.doesISBNAlreadyExist(books, isbn)) {
      throw new Error("ISBN already exists");
    }
    return await Store.addBook(book);
  }

    /**
   * Checks whether an isbn already exists in an array of book objects
   * @static
   * @method
   * @param {string} isbn - The ISBN for which a given array of book objects is to be checked. The ISBN must correspond to the format specified in the book class, otherwise the result will always be false (e.g., "XXX-XXX-XXX-X").
   * @param {Array<Book>} books - An array of book objects to be checked for the given ISBN.
   * @returns {boolean} Returns true if a book with the corresponding ISBN is contained in the array or false if no book with the given ISBN is contained in the array.
  */
  static doesISBNAlreadyExist(books, isbn) {
    let doesISBNAlreadyExist = false;
    books.forEach((book) => {
      if (book.isbn === isbn) {
        doesISBNAlreadyExist = true;
      }
    });
    return doesISBNAlreadyExist;
  }

  /**
   * Removes a book from the store (Firebase database) according to the given ISBN
   * @static
   * @async
   * @method 
   * @param {string} isbn - the ISBN of the book to be removed. ISBN must adhere to the format specified in the Book class (e.g., "XXX-XXX-XXX-X").
   * @returns {Promise<void>} Promise that resolves when the book is successfully removed from the database. 
  */
  static async removeBook(isbn) {
    return await Store.removeBook(isbn);
  }
}

export default BookManager;
