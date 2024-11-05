const fs = require('fs');
const axios = require('axios');
const csv = require('fast-csv');
const path = require('path');

// Paths to your CSV files
const inputCsvPath = path.join(__dirname, 'JA_mergedData.csv');
const outputCsvPath = path.join(__dirname, 'JA_enrichedData.csv');

// Function to generate the SPARQL query
function generateSparqlQuery(authors) {
    const authorFilters = authors.map(author => `"${author}"@en`).join(' ');
    return `
    SELECT DISTINCT ?person ?personLabel (GROUP_CONCAT(DISTINCT ?countryOfCitizenshipLabel; separator=", ") AS ?countriesOfCitizenship) ?genderLabel (GROUP_CONCAT(DISTINCT ?countryLabel; separator=", ") AS ?countriesOfBirth) WHERE {
      VALUES ?authorName { ${authorFilters} }
      ?person wdt:P31 wd:Q5;              # The person is a human
              rdfs:label ?authorName.
      OPTIONAL {
        ?person wdt:P27 ?countryOfCitizenship.
        ?countryOfCitizenship rdfs:label ?countryOfCitizenshipLabel .
        FILTER(LANG(?countryOfCitizenshipLabel) = "en")
      }
      OPTIONAL {
        ?person wdt:P21 ?gender.
        ?gender rdfs:label ?genderLabel .
        FILTER(LANG(?genderLabel) = "en")
      }
      OPTIONAL {
        ?person wdt:P19 ?placeOfBirth .
        ?placeOfBirth wdt:P17 ?country .
        ?country rdfs:label ?countryLabel .
        FILTER(LANG(?countryLabel) = "en")
      }
      ?person rdfs:label ?personLabel .
      FILTER(LANG(?personLabel) = "en")
    } 
    GROUP BY ?person ?personLabel ?genderLabel
    ORDER BY ?personLabel
    `;
}

// Function to query Wikidata for author metadata
async function getAuthorsMetadata(authors) {
    const query = generateSparqlQuery(authors);

    const url = 'https://query.wikidata.org/sparql';
    try {
        const response = await axios.post(url, query, {
            headers: { 
                'Content-Type': 'application/sparql-query',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        // Log the raw response data
        //console.log('Raw SPARQL response:', JSON.stringify(response.data, null, 2));

        const results = response.data.results.bindings;
        const metadata = {};

        results.forEach(result => {
            const author = result.personLabel.value;
            metadata[author] = {
                countriesOfCitizenship: result.countriesOfCitizenship ? result.countriesOfCitizenship.value : '',
                gender: result.genderLabel ? result.genderLabel.value : '',
                countriesOfBirth: result.countriesOfBirth ? result.countriesOfBirth.value : ''
            };
        });

        return metadata;
    } catch (error) {
        console.error('Error querying Wikidata:', error);
        return {};
    }
}

// Function to get language from ISBN
const getLanguage = (isbn) => {
    const numbers = isbn.split("");
    let checkDigit;
    if (isbn.length === 13) {
        checkDigit = numbers[3];
    } else if (isbn.length === 10) {
        checkDigit = numbers[0];
    } else {
        return "unknown";
    }
    checkDigit = parseInt(checkDigit);
    let result = "";

    if (checkDigit === 0 || checkDigit === 1) {
        result = "English";
    } else if (checkDigit === 2) {
        result = "French";
    } else if (checkDigit === 3) {
        result = "German";
    } else {
        result = "other";
    }
    return result;
};

// Read the CSV file, enrich it, and write the result to a new CSV file
async function enrichBooks() {
    const authorsSet = new Set();
    const enrichedData = [];

    // Read authors and gather unique names
    fs.createReadStream(inputCsvPath)
        .pipe(csv.parse({ headers: true }))
        .on('data', row => {
            const authors = row.Authors.split(',').map(a => a.trim()).filter(a => a);
            authors.forEach(author => authorsSet.add(author));
        })
        .on('end', async () => {
            const authors = Array.from(authorsSet);
            const authorMetadata = await getAuthorsMetadata(authors);

            // Process the CSV file again to enrich it
            fs.createReadStream(inputCsvPath)
                .pipe(csv.parse({ headers: true }))
                .on('data', row => {
                    const authors = row.Authors.split(',').map(a => a.trim()).filter(a => a);
                    const authorData = authors.map(author => authorMetadata[author] || { countriesOfCitizenship: '', gender: '', countriesOfBirth: '' });

                    // Handle the country of citizenship and birth logic
                    let countriesOfCitizenship = [...new Set(authorData.map(data => data.countriesOfCitizenship).filter(c => c))];
                    let countriesOfBirth = [...new Set(authorData.map(data => data.countriesOfBirth).filter(c => c))];

                    let finalCountry = '';
                    if (countriesOfCitizenship.length >= 1 && countriesOfCitizenship.includes(countriesOfBirth[0])) {
                        finalCountry = countriesOfBirth[0];
                    } if (countriesOfCitizenship.length >= 1 && countriesOfBirth.length > 0 && !countriesOfCitizenship.includes(countriesOfBirth[0])) {
                        finalCountry = countriesOfCitizenship.join('; ') + `, ${countriesOfBirth[0]}`;
                    } else if (countriesOfCitizenship.length > 1) {
                        finalCountry = countriesOfCitizenship.join('; ');
                    } else if (countriesOfCitizenship.length === 1) {
                        finalCountry = countriesOfCitizenship[0];
                    } else if (countriesOfCitizenship.length === 0 && countriesOfBirth.length > 0) {
                        finalCountry = countriesOfBirth.join('; ');
                    }

                    let countriesArray = finalCountry.split(",").map(country => country.trim());
                    let uniqueCountries = new Set(countriesArray);
                    let uniqueCountriesArray = Array.from(uniqueCountries);
                    let resultCountries = uniqueCountriesArray.join(", ");

                    const genders = [...new Set(authorData.map(data => data.gender).filter(g => g))].join('; ');

                    const language = getLanguage(row.ISBN);

                    enrichedData.push({
                        ...row,
                        'Country': resultCountries,
                        'Gender': genders,
                        'Language': language // Add the language to the enriched data
                    });
                })
                .on('end', () => {
                    // Write to new CSV file
                    const writeStream = fs.createWriteStream(outputCsvPath);
                    csv.write(enrichedData, { headers: true }).pipe(writeStream);
                    console.log('CSV file enriched and saved');
                });
        });
}

enrichBooks();
