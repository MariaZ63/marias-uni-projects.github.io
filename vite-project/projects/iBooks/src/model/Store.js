import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";




/**
 * The Store class contains all methods required for direct data exchange with the Firestore database. All methods are static and most methods ar asynchronous. It is necessary to establish an initial connection to the database once with the connectDataBase() method before all other static functions can be used.
 * @class
 */
class Store {
  _db;

  /**
   * Initially establishes a connection to the Firebase database
   *
   * @method
   * @returns {Object} - Returns a Firebase object that contains information about the database's general configuration and authentication for database usage. This object is necessary for further communicate with the database. Stores the return value as a private variable in the Store class.
   * @throws {Error} - Displays an error message in the console with an error description, if the connection establishment fails and throws an Error object. 
  */
  static connectDataBase(){
    try {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
      };
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      
      this._db = db;
      return;
    } catch (e) {
      console.error("Error establishing connection to Firebase database: ", e);
      throw e;
    }
  }


  /**
   * Retrieves all books stored in the Firebase database
   *
   * @async
   * @method
   * @returns {Promise<Array<Book>>} Returns a Promise that resolves to an array of Book objects
   * @throws {Error} Displays an error message in the console with an error description, if the books fail to load and throws an error object.
  */
  static async getBooks() {
    try {
      let books = [];
      const querySnapshot = await getDocs(collection(this._db, "books"));
      querySnapshot.forEach((doc) => {
        books.push(doc.data());
      });
      return books;
    } catch (e) {
      console.error("Error loading Books: ", e);
      throw e;
    }
  }

  /**
   * Retrieves a specific books objects from the Firebase database according to the given ISBN
   *
   * @async
   * @method
   * @param {string} isbn - the ISBN of the book to be downloaded. ISBN must adhere to the format specified in the Book class (e.g., "XXX-XXX-XXX-X").
   * @returns {Promise<Book>} Returns a Promise that resolves to the Book Object with the corresponding ISBN
   * @throws {Error} Displays an error message in the console with an error description, if there is no book with the corresponding ISBN and throws an error object.
   * @throws {Error} Displays an error message in the console with an error description, if the book fail to load and throws an error object.
  */
  static async getBook(isbn) {
    try {
      const docRef = doc(this._db, "books", isbn);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("No such Book!");
      }
    } catch (e) {
      console.error("Error loading Book: ", e);
      throw e;
    }
  }


  /**
   * Adds a given book object to the Firebase database
   *
   * @async
   * @method
   * @param {Book} book - The book Object must adhere to the format specified in the Book class.
   * @returns {Promise<void>} Promise that resolves when the book is successfully added to the database.
   * @throws {Error} Displays an error message in the console with a description of the error if saving to the database fails and throws an error object.
  */
  static async addBook(book) {
    try {
      return await setDoc(doc(this._db, "books", book["isbn"]), {
        isbn: book["isbn"],
        author: book["author"],
        title: book["title"],
        description: book["description"],
        stars: book["stars"],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e
    }
  }


  /**
   * Removes a book from the Firebase database according to the given ISBN
   *  
   * @async
   * @method 
   * @param {string} isbn - the ISBN of the book to be removed. ISBN must adhere to the format specified in the Book class (e.g., "XXX-XXX-XXX-X").
   * @returns {Promise<void>} Promise that resolves when the book is successfully removed from the database. 
   * @throws {Error} Displays an error message in the console with an error description, if removing of the book fails and throws an error object.
  */
  static async removeBook(isbn) {
    try {
      return await deleteDoc(doc(this._db, "books", isbn));
    } catch (e) {
      console.error("Error remove Book: ", e);
      throw e
    }
  }


  /**
   * Update a book to the Firebase database according to the given ISBN and stars
   *
   * @async
   * @method 
   * @param {string} isbn - the ISBN of the book to be updated. ISBN must adhere to the format specified in the Book class (e.g., "XXX-XXX-XXX-X").
   * @param {number} stars - The number of stars. The number can be a maximum of five (Stars <= 5)
   * @returns {Promise<void>} Promise that resolves when the book is successfully updated to the database. 
   * @throws {Error} Displays an error message in the console with an error description, if the number of stars are below 0 or above 5 and throws an error object.
   * @throws {Error} Displays an error message in the console with an error description, if the save in the database fails and throws an error object.
  */
  static async updateBook(isbn, stars) {
    try {
      if(stars<0 || stars>5) {
        throw new Error("Star rating must be between 0 and 5 inclusive.");
      }
      const book = await Store.getBook(isbn);
      book["stars"] = stars;
      return await Store.addBook(book);
    } catch (e) {
      console.error("Error update Book: ", e);
      throw e
    }
  }
}

export default Store;