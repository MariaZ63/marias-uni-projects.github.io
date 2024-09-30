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