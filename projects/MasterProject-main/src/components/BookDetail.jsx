import { useEffect, useState } from "react";
import BookImage from "../assets/images/book.png"; // Default fallback image
import CatImage from "../assets/images/cat_sitting.png";
import Loader from "./Loader";

/**
 * BookDetail component displays detailed information about a specific book.
 * It shows the book's cover image, title, authors, genre, page count,
 * language, origin country, publication year, and ratings. 
 * It also provides a link to the book's Goodreads page if available.
 * A loading indicator is shown while the cover image is being fetched.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.book - The book object containing details about the book.
 * @param {Function} props.setDetail - Function to set the detail state (for closing the detail view).
 * @returns {JSX.Element} The rendered BookDetail component with book information or a loading indicator.
 */
const BookDetail = ({ book, setDetail }) => {
  const [coverImage, setCoverImage] = useState(null); // Store the cover image URL
  const [loading, setLoading] = useState(true); // Track the loading state

  // Use ISBN to construct cover image URL
  const coverLink = `https://covers.openlibrary.org/b/isbn/${book.ISBN}-M.jpg?default=false`;

  useEffect(() => {
    // Start loading process
    setLoading(true);

    // Create an image element to check if the image URL is valid
    const img = new Image();
    img.src = coverLink;

    // Set up event listeners to handle image load and error
    img.onload = () => {
      setCoverImage(coverLink); // Image found
      setLoading(false); // Set loading to false when the image is loaded
    };
    img.onerror = () => {
      setCoverImage(BookImage); // Image not found, use fallback
      setLoading(false); // Set loading to false even if the fallback is used
    };
  }, [coverLink]);

  const ref = `https://www.goodreads.com/book/show/${book["Goodreads Id"]}`;

  return (
    <div className="col-md-auto">
      <div className="comic-panel">
        <svg viewBox="0 0 400 400" width="400" height="400" overflow="visible">
          {loading ? (
            <foreignObject x="0" y="0" width="400" height="400">
              <Loader />
            </foreignObject>
          ) : (
            <>
              <image
                href={coverImage}
                width="100%"
                height="150px"
                x="-140"
                y="50"
              />

              <image
                href={CatImage}
                width="100%"
                height="100px"
                x="-80"
                y="300"
              />
              {book["Goodreads Id"] ? (
                <foreignObject x="-20" y="230" width="125" height="200">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      width: "100%",
                      height: "100%",
                      fontSize: "17px",
                    }}
                  >
                    <div className="bubble-right">
                      You can visit the&nbsp;
                      <a href={ref} target="_blank" rel="noopener noreferrer">
                        Goodreads page
                      </a>{" "}
                      of this book!
                    </div>
                  </div>
                </foreignObject>
              ) : (
                <foreignObject x="-20" y="290" width="125" height="60">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      width: "100%",
                      height: "100%",
                      fontSize: "17px",
                    }}
                  >
                    <div className="bubble-right">
                      Meow!
                    </div>
                  </div>
                </foreignObject>
              )}

              <foreignObject x="130" y="15" width="250" height="375">
                <h3>{book.Title}</h3>
                <ul>
                  <li>
                    <b>Author(s)</b>: {book.Authors}
                  </li>
                  <li>
                    <b>Genre:</b> {book.Genre}
                  </li>
                  <li>
                    <b>Number of Pages:</b>{" "}
                    {book["Number of Pages"] || "unknown"}
                  </li>
                  <li>
                    <b>Language:</b> {book.Language}
                  </li>
                  <li>
                    <b>Origin Country:</b> {book.Country || "unknown"}
                  </li>
                  <li>
                    <b>Original Publication Year:</b>{" "}
                    {book["Original Publication Year"] ||
                      book["Year Published"] ||
                      "unknown"}
                  </li>
                  {book["Read Status"] === "read" && (
                    <>
                      <li>
                        <b>Read on:</b> {book["Date Read"] || "no read date"}
                      </li>
                      <li>
                        <b>Your Rating:</b>{" "}
                        {book["Star Rating"]
                          ? book["Star Rating"] > 1
                            ? `${book["Star Rating"]} stars`
                            : `${book["Star Rating"]} star`
                          : "not rated"}
                      </li>
                    </>
                  )}
                  <li>
                    <b>Average Rating:</b> {book["Average Rating"] || "unknown"}{" "}
                    stars
                  </li>
                </ul>
              </foreignObject>
            </>
          )}
        </svg>
        <div className="position-absolute top-0 end-0 mb-1 me-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
            onClick={() => setDetail(null)} // Set to null to close the detail view
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
        <div className="comic-text top-left">Book Details</div>
      </div>
    </div>
  );
};

export default BookDetail;
