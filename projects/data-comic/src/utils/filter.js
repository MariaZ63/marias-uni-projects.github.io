// filter books for a certain property

export const filter = (data, property, value) => {
  return data.filter((d) => d[property] === value);
};

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

export const filterByCountry = (data, country) => {
  return data.filter((d) => {
    const countries = d.Country ? d.Country.split(",").map(c => c.trim()) : [];
    return countries.includes(country);
  });
};

