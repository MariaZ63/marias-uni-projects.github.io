import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../assets/css/ReactToastify.css";
import BookManager from "../model/BookManager";

/**
 * Component that renders an input form to add a book
 * @returns {JSX.Element} - AddBook component
 */
const AddBook = () => {
  /**
   * function for navigating between the pages of the application
   */
  const navigate = useNavigate();

  /**
   * Manages states of the input fields
   */
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");

  /**
   * Handles the user input for the title
   * @param {object} event 
   */
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

   /**
   * Handles the user input for the author
   * @param {object} event 
   */
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };


 /**
   * Handles the user input for the ISBN
   * @param {object} event 
   */
  const handleChangeIsbn = (event) => {
    setIsbn(event.target.value);
  };

   /**
   * Handles the user input for the description
   * @param {object} event 
   */
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

   /**
   * Handles the form submission by calling the BookManager to add a new book.
   * A successful submission redirects the user to the BooksList page and a faulty submission
   * informs the user by displaying an error toaster.
   * @async
   */
  const handleClickAddBook = async () => {
    event.preventDefault();
    try {
      await BookManager.addBook(title, author, isbn, description);
      setAuthor("");
      setTitle("");
      setIsbn("");
      setDescription("");

      navigate("/books", { state: { key: "success" } });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        icon: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="container mt-4">
      <form id="book-form" onSubmit={handleClickAddBook}>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            className="form-control"
            value={author}
            onChange={handleChangeAuthor}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Titel</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={handleChangeTitle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            className="form-control"
            value={isbn}
            onChange={handleChangeIsbn}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={handleChangeDescription}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block add-button">
          <i className="fas fa-plus"></i> Add Book
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddBook;
