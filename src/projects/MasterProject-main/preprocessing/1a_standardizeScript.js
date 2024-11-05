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
async function mergeCsvFiles(file, outputFile) {
  try {
    const data = await readCsv(file);

    // Map the data to the required format
    const finalData = data.map(item => ({
      Title: item["Title"],
      Authors: item["Author"].replace(/\s+/g, ' '),
      Contributors: item["Additional Authors"] || "",
      Publisher: item["Publisher"] || "",
      ISBN: item["ISBN13"] ? item["ISBN13"].replace(/=\"|\"/g, '') : item["ISBN"].replace(/=\"|\"/g, ''),
      "Goodreads Id": item["Book Id"] || "",
      Format: item["Binding"] ? (item["Binding"].toLowerCase() === "kindle edition" ? "digital" : item["Binding"].toLowerCase()) : "",
      "Read Status": item["Read Count"] === "0" ? "to-read" : "read",
      "Date Read": item["Date Read"] || "",
      "Star Rating": item["My Rating"] || "",
      Review: item["My Review"] || "",
      Owned: item["Owned Copies"] === "0" ? "No" : "Yes",
      "Number of Pages": item["Number of Pages"] || "",
      "Year Published": item["Year Published"] || "",
      "Original Publication Year": item["Original Publication Year"] || "",
      "Average Rating": item["Average Rating"] || ""
    }));

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
        { id: "Average Rating", title: "Average Rating" }
      ]
    });

    // Write the mapped data to a new CSV file
    await csvWriter.writeRecords(finalData);
    console.log(`Data merged and written to ${outputFile}`);
  } catch (error) {
    console.error("Error merging CSV files:", error);
  }
}

// Replace 'file.csv' and 'outputFile.csv' with your actual file paths
mergeCsvFiles("S_goodreads_library_export.csv", "S_mergedData.csv");
