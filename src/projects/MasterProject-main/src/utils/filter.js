/**
 * Filters an array of objects based on a specified property and value.
 *
 * @param {Array<Object>} data - Array of objects to be filtered.
 * @param {string} property - The property name to filter by.
 * @param {*} value - The value to match for the specified property.
 * @returns {Array<Object>} Array of objects where the specified property matches the given value.
 */
export const filter = (data, property, value) => {
  return data.filter((d) => d[property] === value);
};

/**
 * Filters an array of book objects based on the year they were read.
 *
 * @param {Array<Object>} data - Array of book objects to filter.
 * @param {number} year - The year to filter books by.
 * @returns {Array<Object>} Array of books that were read in the specified year.
 */
export const filterByYear = (data, year) => {
  return data.filter(book => {
    const dateRead = book["Date Read"];
    if (dateRead) {
      const readYear = new Date(dateRead).getFullYear();
      return readYear === year;
    }
    return false;
  });
}

/**
 * Filters an array of book objects based on the specified country or countries of origin.
 *
 * @param {Array<Object>} data - Array of book objects to filter.
 * @param {string} country - The country to filter books by. Matches if the book's country list includes this country.
 * @returns {Array<Object>} Array of books that were read in or are associated with the specified country.
 */
export const filterByCountry = (data, country) => {
  return data.filter((d) => {
    const countries = d.Country ? d.Country.split(",").map(c => c.trim()) : [];
    return countries.includes(country);
  });
};

