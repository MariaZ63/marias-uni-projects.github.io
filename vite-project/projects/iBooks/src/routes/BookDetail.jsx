import BookManager from "../model/BookManager";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../Component_Spinner/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "../assets/css/ReactToastify.css";

/**
 * Component for rendering the detail page for a book with its information
 * (when the data is getting fetched a loading spinner is displayed)
 * @returns {JSX.Element} - Detail component or spinner.
 */
const BookDetail = () => {
  /**
   * location object with value (a book object) if created by 'navigate' from books route
   * @type {object}
   */
  const location = useLocation();

  /**
   * Isbn extracted from URL
   * @type {string}
   */
  const { isbn } = useParams();

  /**
   * State to deliver a fetched book object
   * @type {object}
   */
  const [details, setDetails] = useState(null);

  /**
   * State to check loading status
   * @type {boolean}
   */
  const [loading, setLoading] = useState(true);

  /**
   * State to check error status
   * @type {boolean}
   */
  const [error, setError] = useState(false);

  /**
   * UseEffect Hook checks after every render if there is a value in the location object.
   * If not, it asks the BookManager to get the book with the above given isbn.
   * If the request succeeds the details are updated,
   * otherwise, if no details are returned, an error message is displayed.
   */
  useEffect(() => {
    if (!location?.state?.key) {
      const fetchData = async () => {
        try {
          const bookDetails = await BookManager.getBook(isbn);

          setDetails(bookDetails);
          setLoading(false);
        } catch (error) {
          setError(true);
          setLoading(false);
          toast.error("There is no book saved under this ISBN!", {
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
      fetchData();
    }
  });

  /**
   * Checking for a value in the location object, which can be used to get the data for the page.
   */
  if (location?.state?.key) {
    return (
      <div className="container mt-4">
        <div className="card mx-auto" style={{ maxWidth: "25rem" }}>
          <i
            className="fas fa-book-reader text-primary mt-4 mx-auto"
            style={{ fontSize: "70px" }}
          ></i>
          <div className="card-body">
            <div className="text-center">
              Author: {location.state.key.author}
            </div>
            <div className="text-center">Title: {location.state.key.title}</div>
            <div className="text-center">ISBN: {location.state.key.isbn}</div>

            <hr />
            <div>{location.state.key.description}</div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * If the data is fetching, the loading spinner is displayed.
   */
  if (loading) {
    return <Spinner />;
  }

  /**
   * If an error occurred during fetching, an error message is displayed.
   */
  if (error) {
    return (
      <>
        <ToastContainer />;
        <div className="container mt-4 text-center">
          This book does not exist.
        </div>
      </>
    );
  }

  /**
   * Returning the detail component with the fetched data.
   */
  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: "25rem" }}>
        <i
          className="fas fa-book-reader text-primary mt-4 mx-auto"
          style={{ fontSize: "70px" }}
        ></i>
        <div className="card-body">
          <div className="text-center">Author: {details.author}</div>
          <div className="text-center">Title: {details.title}</div>
          <div className="text-center">ISBN: {details.isbn}</div>

          <hr />
          <div>{details.description}</div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
