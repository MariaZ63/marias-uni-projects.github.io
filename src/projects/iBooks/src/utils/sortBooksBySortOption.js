/**
 * Global object of different sorting options
 */
const SORT_OPTIONS = {
  NO_SORTING: "no-sorting",
  TITLE_ASCENDING: "title-ascending",
  TITLE_DESCENDING: "title-descending",
  AUTHOR_ASCENDING: "author-ascending",
  AUTHOR_DESCENDING: "author-descending",
  STARS_ASCENDING: "stars-ascending",
  STARS_DESCENDING: "stars-descending",
};

/**
 * Function to sort an array of books ascending by a property.
 * @function
 * @param {Array} books - The array of books to be sorted.
 * @param {string} bookProperty - The property by which the books are sorted.
 * @returns {Array} - the sorted array of books
 */
const sortBooksAscending = (books, bookProperty) => {
  books.sort((a, b) => {
    if (a[bookProperty] < b[bookProperty]) {
      return -1;
    }
    if (a[bookProperty] > b[bookProperty]) {
      return 1;
    }

    return 0;
  });

  return books;
};

/**
 * Function to sort an array of books descending by a property.
 * @param {Array} books - The array of books to be sorted.
 * @param {string} bookProperty - The property by which the books are sorted.
 * @returns {Array} - the sorted array of books
 */
const sortBooksDescending = (books, bookProperty) => {
  books.sort((a, b) => {
    if (a[bookProperty] < b[bookProperty]) {
      return 1;
    }
    if (a[bookProperty] > b[bookProperty]) {
      return -1;
    }

    return 0;
  });

  return books;
};

/**
 * Function to sort an array of books by a sort option.
 * @param {Array} books - The array of books to be sorted.
 * @param {string} sortOption - The sort option by which the books are sorted.
 * @returns {Array} - the sorted array of books
 */
const sortBooksBySortOption = (books, sortOption) => {
  if (sortOption === SORT_OPTIONS.NO_SORTING) {
    return books;
  }

  if (sortOption === SORT_OPTIONS.TITLE_ASCENDING) {
    return sortBooksAscending(books, "title");
  }

  if (sortOption === SORT_OPTIONS.TITLE_DESCENDING) {
    return sortBooksDescending(books, "title");
  }

  if (sortOption === SORT_OPTIONS.AUTHOR_ASCENDING) {
    return sortBooksAscending(books, "author");
  }

  if (sortOption === SORT_OPTIONS.AUTHOR_DESCENDING) {
    return sortBooksDescending(books, "author");
  }
  if (sortOption === SORT_OPTIONS.STARS_ASCENDING) {
    return sortBooksAscending(books, "stars");
  }
  if (sortOption === SORT_OPTIONS.STARS_DESCENDING) {
    return sortBooksDescending(books, "stars");
  }

  return books;
};

export { SORT_OPTIONS, sortBooksBySortOption };
