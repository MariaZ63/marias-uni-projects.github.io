import Stars from "./Stars";
import BookManager from "../model/BookManager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

/**
 * The props "book" and "onChange" are unpacked
 * @param {object} props - Component props
 * @param {object} props.book - Current book
 * @param {function} props.onChange - Call-back function for handeling changes
 * @returns {JSX.Element} - BookElement component
 */
const BookElement = ({ book, onChange }) => {
  /**
   * function for navigating between the pages of the application
   */
  const navigate = useNavigate();

  /**
   * Navigates to the Bookdetail page
   * @returns {void} - BookDetail
   */
  const handleDetail = () => {
    const isbn = book.isbn;
    return navigate(`/details/${isbn}`, { state: { key: book } });
  };

  /**
   * State-Hooks for the animation and delete function
   */
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  /**
   * handleDelete function - deletes the book, performs the animation and calls the onChange function
   */
  const handleDelete = () => {
    //setIsDeleted(true) - sets the status to true, to check whether the book has been deleted
    setIsDeleted(true);
    //BookManager.removeBook(book.isbn) - calls the BookManager
    BookManager.removeBook(book.isbn);
    //setTimeout() - sets timer for the animation
    setTimeout(() => {
      setIsAnimationComplete(true);
    }, 500);
    //onChange() - Execute the onChange function to update the list of books
    onChange();
  };

  return (
    <>{!isAnimationComplete && (
    <motion.tr
      animate={{ x: isDeleted ? 5000 : 0 }}
      transition={{ duration: 0.5 }}
      data-isbn={book.isbn}
    >
      <motion.td>{book.title}</motion.td>
      <motion.td>{book.author}</motion.td>
      <motion.td>{book.isbn}</motion.td>
      <motion.td>
        <a
          onClick={handleDetail}
          className="fas fa-eye text-primary detail-button"
          data-isbn={book.isbn}
        ></a>
      </motion.td>
      <motion.td>
        <a
          onClick={handleDelete}
          className="fas fa-trash text-primary remove-button"
          data-isbn={book.isbn}
        ></a>
      </motion.td>
      <motion.td data-isbn={book.isbn} className="starRating">
        <Stars rating={book.stars} isbn={book.isbn} onChange={onChange} />
      </motion.td>
    </motion.tr>
    )}
    </> 
  );
};

export default BookElement;
