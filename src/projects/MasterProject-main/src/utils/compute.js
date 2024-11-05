/**
 * Calculates the average reading speed in terms of books read per year, excluding data for the current year.
 *
 * @param {Array<Object>} booksPerYear - Array of objects representing the number of books read per year.
 * Each object should contain a `year` (number) and `count` (number of books read in that year).
 * @returns {number} The average number of books read per year, rounded to the nearest integer.
 */
export const getReadingSpeed = (booksPerYear) => {
    let yearCount = 0;
    let bookCount = 0;
    booksPerYear.forEach((d) => {
      if (d.year !== 2024) {
        yearCount++;
        bookCount += d.count;
      }
    });
    const averageBooksPerYear = bookCount / yearCount;
    return Math.round(averageBooksPerYear);
  };