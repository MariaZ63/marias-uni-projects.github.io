import { useState } from "react";
import BookManager from "../model/BookManager";

/**
 * Component for rendering star ratings and handling user interaction to update ratings.
 * @param {object} props - Component props.
 * @param {number} props.rating - Current rating value.
 * @param {string} props.isbn - ISBN of the book associated with the rating.
 * @param {function} props.onChange - Callback function that triggers a reload of the books from the updated database.
 * @returns {JSX.Element} - Stars component.
 */
const Stars = ({ rating, isbn, onChange }) => {
    //State to manage the current star rating.
    const [starRating, setRating] = useState(rating);

    /**
     * Handles click event on a star.
     * Updates the rating and sends the updated rating to the BookManager to update the book's rating.
     * @param {number} index - Index of the clicked star.
     */
    const handleStarClick = (index) => {
        const newRating = index + 1; 
        setRating(newRating);
        BookManager.updateBook(isbn, newRating);
        onChange();
    }

    return (
        <>
            {[...Array(5)].map((_, index) => (
                <i key={index} className={`fa fa-star ${index < starRating ? 'checked' : ''}`} 
                onClick={() => handleStarClick(index)}/>
            ))}
        </>
    );
};

export default Stars;