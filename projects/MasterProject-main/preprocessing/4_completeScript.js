const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const publishersFile = 'JA_enrichedData.csv';  // Replace with your publishers CSV file name
const genresFile = 'JA_genreData.csv';  // Replace with your genres CSV file name
const outputFile = 'JA_completedData.csv';  // Desired output CSV file name

const publishersData = [];
const genresData = [];

// Read the publishers CSV file
fs.createReadStream(publishersFile)
  .pipe(csv())
  .on('data', (row) => {
    publishersData.push(row);
  })
  .on('end', () => {
    console.log('Publishers CSV file successfully processed.');
    mergeData();
  });

// Read the genres CSV file
fs.createReadStream(genresFile)
  .pipe(csv())
  .on('data', (row) => {
    genresData.push(row);
  })
  .on('end', () => {
    console.log('Genres CSV file successfully processed.');
    mergeData();
  });

function mergeData() {
  if (publishersData.length === 0 || genresData.length === 0) {
    return;
  }

  const mergedData = publishersData.map(pubRow => {
    const genreRow = genresData.find(genRow => genRow.ISBN === pubRow.ISBN);
    if (genreRow) {
      return {
        ...pubRow,
        Genre: genreRow.Genre
      };
    }
    return pubRow;
  });

  const csvWriter = createCsvWriter({
    path: outputFile,
    header: Object.keys(mergedData[0]).map(field => ({ id: field, title: field }))
  });

  csvWriter.writeRecords(mergedData)
    .then(() => {
      console.log('Merged CSV file successfully written.');
    });
}
