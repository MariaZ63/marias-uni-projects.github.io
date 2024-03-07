import filterBooksBySearch from "../utils/filterBooksBySearch";
import {
  SORT_OPTIONS,
  sortBooksBySortOption,
} from "../utils/sortBooksBySortOption";
import BookManager from "../model/BookManager";
import InputPanel from "../Components_BookList//InputPanel";
import BooksTable from "../Components_BookList/BooksTable";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "../assets/css/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Spinner from "../Component_Spinner/Spinner";

/**
 * Function to communicate between sorting and filtering classes and BookManager 
 * @returns {JSX.Element} - BooksList container
 */
const BooksList = () => {

  /**
   * Location object
   */
  const location = useLocation();

  /**
  * States to manage the display of the toaster and the loader
  */
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * State to manage the books to be displayed on the website
   */
  const [books, setBooks] = useState([]);

  /**
   * State to manage the user inputs from the inputPanel
   */
  const [searchInput, setSearchInput] = useState({
    searchOption: "title",
    searchText: "",
  });
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.NO_SORTING);

  /**
   * Fetches all data from the remote database and stores it locally in the books variable
   */
  const fetchData = async () => {
    try {
      const storedBooks = await BookManager.getBooks();
      setBooks(storedBooks);
      setLoading(false);
    } catch (error) {
      alert("Sorry an error occurred!\n" + error);
    }
  };

  /**
   * Side effect that fetches the books from the remote DB and stores them locally.
    *  */
  useEffect(() => {
    fetchData();
  }, []);


  /**
   * Handles the user input received from the child component InputPanel
   * @param {object} newSearchInputValue - An object containing two search specifications:
   *  - {string} searchOption: The user input search Option of the InputPanel`s  dropdown menu
   *  - {string} searchText: The user input of the InputPanel´s search Text input 
   * @param {string} newSortOption - A string value of one of the properties of the SORT_OPTIONS object
   */
  const handlePanelClick = (newSearchInputValue, newSortOption) => {
    setSearchInput(newSearchInputValue);
    setSortOption(newSortOption);
  };


  //Handles input changes by fetching the book Data from the remote DB and storing them locally
  const handleChange = () => {
    fetchData();
  };

  //books are being filtered by text and search option
  const filteredBooks = filterBooksBySearch(books, searchInput);

  //filtered books are being sorted
  const filteredSortedBooks = sortBooksBySortOption(filteredBooks, sortOption);

  /**
   * Side effect that animates a success toaster when user added a book
   */
  useEffect(() => {
    if (location?.state?.key === "success" && !showToast) {
      toast.success("Book added", {
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
      setShowToast(true); // Set showToast to true after displaying toast
    }
  }, [location?.state?.key, showToast]);

  /**
   * If data is loading spinner is displayed
   */
  if (loading) {
    return (
      <>
        <Spinner />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <InputPanel onPanelClick={handlePanelClick} />
        <BooksTable books={filteredSortedBooks} onChange={handleChange} />
      </div>
      <ToastContainer />
    </>
  );
};

export default BooksList;
