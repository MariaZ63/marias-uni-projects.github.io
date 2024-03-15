/**
 * Function to filter an array of books based on the given search input.
 * @param {Array} books - The array of books to be filtered.
 * @param {Object} searchInput - The search input containing search option and text.
 * @param {string} searchInput.searchOption - The property of the book to search (e.g., 'title', 'author').
 * @param {string} searchInput.searchText - The text to search for in the specified property.
 * @returns {Array} - The filtered array of books.
 */
const filterBooksBySearch = (books, searchInput) => {
  const filteredBooks = books.filter((book) => {
    const { searchOption, searchText } = searchInput;
    if (book[searchOption].includes(searchText)) {
      return true;
    }
    return false;
  });

  return filteredBooks;
};

export default filterBooksBySearch;
