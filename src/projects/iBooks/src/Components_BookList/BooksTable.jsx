import BookElement from "./BookElement";
/**
 * 
 * @param {object} props -Component props.
 * @param {array} props.books - Array of book Objects
 * @param {function} props.onChange - Callback function that updates the local books with the remote DB 
 * @returns {JSX.Element} - BooksTable with selected books
 */
const BooksTable = ( { books, onChange }) => {
     
    return ( 
        <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Detail</th>
                            <th>Delete</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody id="book-list">
                       {books.map(book =>
                        <BookElement key={book.isbn} book={book} onChange = {onChange}/>
                        )}  
                    </tbody>
                </table>
     );
}
 
export default BooksTable;