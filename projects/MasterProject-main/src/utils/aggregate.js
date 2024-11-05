/**
 * Aggregates data by counting occurrences of a specific property value.
 *
 * @param {Array<Object>} data - Array of data objects to aggregate.
 * @param {string} property - The property name to count occurrences of.
 * @returns {Object} An object mapping each unique property value to its count.
 */
export const aggregate = (data, property) => {
  const propertyCount = {};

  data.forEach((d) => {
    const key = d[property];
    if (key) {
      if (propertyCount[key]) {
        propertyCount[key]++;
      } else {
        propertyCount[key] = 1;
      }
    }
  });

  return propertyCount;
};

/**
 * Aggregates data by counting entries per year based on "Date Read".
 *
 * @param {Array<Object>} data - Array of book data objects to aggregate.
 * @returns {Array<Object>} Array of objects with `year` and `count` properties, for each year books were read.
 */
export const aggregateByYear = (data) => {
  const yearCount = {};
  data.forEach((d) => {
    if (d["Date Read"]) {
      const year = new Date(d["Date Read"]).getFullYear();
      if (yearCount[year]) {
        yearCount[year]++;
      } else {
        yearCount[year] = 1;
      }
    }
  });

  // Convert the yearCount object into an array for D3
  const yearData = Object.keys(yearCount).map((year) => ({
    year: parseInt(year), // Ensure years are integers
    count: yearCount[year],
  }));

  return yearData;
};

/**
 * Aggregates total pages read per month based on "Date Read" and "Number of Pages".
 *
 * @param {Array<Object>} data - Array of book data objects to aggregate.
 * @returns {Array<Object>} Array of objects with `month` and `count` properties, indicating pages read per month.
 */
export const aggregateByMonth = (data) => {

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthCount = Array(12).fill(0);

  data.forEach((d) => {
    if (d["Date Read"]) {
      const month = new Date(d["Date Read"]).getMonth();
      monthCount[month]++;
    }
  });

  const monthData = monthNames.map((month, index) => ({
    month, 
    count: monthCount[index], 
  }));

  return monthData;
};

/**
 * Aggregates data by counting occurrences of specified countries.
 *
 * @param {Array<Object>} data - Array of data objects to aggregate.
 * @param {string} property - The property name to count country occurrences of.
 * @returns {Object} An object mapping each country to its count, with "unknown" for entries with no country specified.
 */
export const aggregatePagesByYear = (data) => {
  const yearCount = {};
  data.forEach((d) => {
    if (d["Date Read"]) {
      const year = new Date(d["Date Read"]).getFullYear();
      if (yearCount[year]) {
        yearCount[year] += parseInt(d["Number of Pages"]) || 100;
      } else {
        yearCount[year] = parseInt(d["Number of Pages"])  || 100;
      }
    }
  });

  // Convert the yearCount object into an array for D3
  const yearData = Object.keys(yearCount).map((year) => ({
    year: parseInt(year), // Ensure years are integers
    count: yearCount[year],
  }));

  return yearData;
};

/**
 * Aggregates total pages read per month based on "Date Read" and "Number of Pages".
 *
 * @param {Array<Object>} data - Array of book data objects to aggregate.
 * @returns {Array<Object>} Array of objects with `month` and `count` properties, indicating pages read per month.
 */
export const aggregatePagesByMonth = (data) => {
  // Array of month names for easy lookup
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Initialize an array with count 0 for all months
  const monthCount = Array(12).fill(0);

  // Populate the monthCount array with page data
  data.forEach((d) => {
    if (d["Date Read"]) {
      const month = new Date(d["Date Read"]).getMonth();
      const pages = parseInt(d["Number of Pages"]) || 100; // Default to 100 if not provided
      monthCount[month] += pages;
    }
  });

  // Convert into the desired format with month names
  const monthData = monthNames.map((month, index) => ({
    month, // Use the month name
    count: monthCount[index], // Get the count from the array
  }));

  return monthData;
};

/**
 * Aggregates data by counting occurrences of specified countries.
 *
 * @param {Array<Object>} data - Array of data objects to aggregate.
 * @param {string} property - The property name to count country occurrences of.
 * @returns {Object} An object mapping each country to its count, with "unknown" for entries with no country specified.
 */
export const aggregateCountries = (data, property) => {
  const countryCount = {};

  data.forEach((d) => {
    // If the property is not present or empty, treat it as "unknown"
    if (!d[property] || d[property].trim() === "") {
      if (countryCount["unknown"]) {
        countryCount["unknown"]++;
      } else {
        countryCount["unknown"] = 1;
      }
    } else {
      // Otherwise, process the listed countries
      const countries = d[property].split(",");
      countries.forEach((country) => {
        const trimmedCountry = country.trim();
        if (trimmedCountry) {
          if (countryCount[trimmedCountry]) {
            countryCount[trimmedCountry]++;
          } else {
            countryCount[trimmedCountry] = 1;
          }
        }
      });
    }
  });

  return countryCount;
};
