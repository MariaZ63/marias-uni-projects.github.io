const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const _ = require("lodash");

// Function to read CSV and return a promise that resolves to the data
function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

// Main function to merge CSV files and write the result to a new file
async function mergeCsvFiles(file1, file2, outputFile) {
  try {
    const [data1, data2] = await Promise.all([readCsv(file1), readCsv(file2)]);

    // Select and rename the required columns
    const data2ByISBN = _.keyBy(data2, 'ISBN13');
    const data2ByTitle = _.keyBy(data2, 'Title');

    // Merge the two datasets based on ISBN, falling back to Title if ISBN does not match
    const finalData = data1.map(item => {
      let matchingItem = data2ByISBN[`="${item["ISBN/UID"]}"`];

      if (!matchingItem) {
        matchingItem = data2ByTitle[item["Title"]];
      }

      return {
        Title: item["Title"],
        Authors: item["Authors"],
        Contributors: item["Contributors"],
        Publisher: matchingItem ? matchingItem["Publisher"] : "",
        ISBN: item["ISBN/UID"],
        "Goodreads Id": matchingItem ? matchingItem["Book Id"] : "",
        Format: item["Format"],
        "Read Status": item["Read Status"],
        "Date Read": item["Last Date Read"],
        "Star Rating": item["Star Rating"],
        Review: item["Review"],
        Owned: item["Owned?"],
        "Number of Pages": matchingItem ? matchingItem["Number of Pages"] : "",
        "Year Published": matchingItem ? matchingItem["Year Published"] : "",
        "Original Publication Year": matchingItem ? matchingItem["Original Publication Year"] : "",
        "Average Rating": matchingItem ? matchingItem["Average Rating"] : "",
      };
    });


    //console.log(finalData);

    // Define the CSV writer
    const csvWriter = createCsvWriter({
      path: outputFile,
      header: [
        { id: "Title", title: "Title" },
        { id: "Authors", title: "Authors" },
        { id: "Contributors", title: "Contributors" },
        { id: "Publisher", title: "Publisher" },
        { id: "ISBN", title: "ISBN" },
        { id: "Goodreads Id", title: "Goodreads Id"},
        { id: "Format", title: "Format" },
        { id: "Read Status", title: "Read Status" },
        { id: "Date Read", title: "Date Read" },
        { id: "Star Rating", title: "Star Rating" },
        { id: "Review", title: "Review" },
        { id: "Owned", title: "Owned" },
        { id: "Number of Pages", title: "Number of Pages" },
        { id: "Year Published", title: "Year Published" },
        { id: "Original Publication Year", title: "Original Publication Year" },
        { id: "Average Rating", title: "Average Rating" },
      ],
    });

    // Write the merged data to a new CSV file
    await csvWriter.writeRecords(finalData);
    console.log(`Data merged and written to ${outputFile}`);
  } catch (error) {
    console.error("Error merging CSV files:", error);
  }
}

// Replace 'file1.csv', 'file2.csv', and 'merged_books.csv' with your actual file paths
mergeCsvFiles(
  "JA_StoryGraphData.csv",
  "JA_goodreads_library_export.csv",
  "JA_mergedData.csv"
);
