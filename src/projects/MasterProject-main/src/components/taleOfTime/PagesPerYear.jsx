import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CatImage from "../../assets/images/cat_standing.png";
import catImage2 from "../../assets/images/cat_stretching.png";
import { useData } from "../../DataProvider";
import { aggregatePagesByYear } from "../../utils/aggregate";
import { filter } from "../../utils/filter";
import PagesPerYearExplanation from "./PagesPerYearExplanation";
import YearDetail from "./YearDetail";

/**
 * PagesPerYear component visualizes the number of pages read over multiple 
 * years using a bar chart. It retrieves data from a global data provider, 
 * calculates the number of books without page counts, and displays 
 * relevant information in a visually engaging way.
 *
 * - The component creates a bar chart where each bar represents the total 
 *   pages read in a specific year.
 * - Clicking on a bar reveals more detailed information about that year's 
 *   pages.
 * - It also includes an explanation of total pages read and time spent 
 *   reading through the PagesPerYearExplanation component.
 *
 * @returns {JSX.Element} The rendered PagesPerYear component.
 */
const PagesPerYear = () => {
  const svgRef = useRef();
  const { data } = useData();
  const [showYear, setShowYear] = useState(null);

  const [BooksWithoutPages, setBooksWithoutPages] = useState(0);
  const [pageData, setPageData] = useState(null);

  const getNumberOfBooksWithoutPages = (data) => {
    const readBooks = filter(data, "Read Status", "read");
    const readBooksWithoutPages = filter(readBooks, "Number of Pages", "");
    return readBooksWithoutPages.length;
  };

  useEffect(() => {
    if (data) {
      createBarChart(data);
      setBooksWithoutPages(getNumberOfBooksWithoutPages(data));
    }
  }, [data]);

  const createBarChart = (data) => {
    // Set the dimensions and margins of the graph
    const margin = { top: 30, right: 70, bottom: 70, left: 60 },
      width = 480 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Append the svg object to the ref element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const readBooks = filter(data, "Read Status", "read");
    const years = aggregatePagesByYear(readBooks);
    setPageData(years);

    // Ensure years are sorted
    years.sort((a, b) => a.year - b.year);

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(years.map((d) => d.year))
      .padding(0.2);

    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    xAxis
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const maxCount = d3.max(years, (d) => d.count) + 300;
    const y = d3.scaleLinear().domain([0, maxCount]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // append image
    svg
      .append("image")
      .attr("href", CatImage)
      .attr("width", "100") // Adjust the width to fit your design
      .attr("height", "100") // Adjust the height to fit your design
      .attr("x", x(years[years.length - 1].year) + x.bandwidth() / 2 - 40) // Center image on the last bar
      .attr("y", y(years[years.length - 1].count) - 75); // Position image on top of the last bar

    // Bars
    svg
      .selectAll("rect")
      .data(years)
      .join("rect")
      .attr("x", (d) => x(d.year))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "#c767a6")
      .attr("class", "interactive")
      .on("click", (event, d) => setShowYear(d.year));

    svg
      .selectAll("text.label")
      .data(years)
      .enter()
      .append("text")
      .attr("class", "label")
      .text((d) => d.count)
      .attr("x", (d) => x(d.year) + x.bandwidth() / 2)
      .attr("y", (d) => {
        if (d.year === 2024) {
          return y(d.count) + 12;
        }
        return y(d.count) - 5;
      }) // Adjust position above the bar
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", (d) => {
        if (d.year === 2024) {
          return "white";
        }
        return "grey";
      })
      .attr("text-anchor", "middle");

    svg
      .append("foreignObject")
      .attr("width", 110)
      .attr("height", 120)
      .attr("x", x(years[years.length - 1].year) + x.bandwidth() / 2 + 25)
      .attr("y", y(years[years.length - 1].count) - 35)
      .append("xhtml:div") // Use "xhtml:div" to make sure it's recognized as HTML
      .style("width", "100%")
      .style("height", "100%")
      .attr("class", "bubble-top-left")
      .style("font-size", "17px")
      .text("Click on the columns to reveal details of that year!");
  };

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg ref={svgRef} id="panel03"></svg>
          <div className="comic-text top-right">
            Overview of pages read by year
          </div>
          {BooksWithoutPages ? (
            <div
              className="comic-text bottom-left"
              style={{ fontSize: "17px" }}
            >
              {BooksWithoutPages} {BooksWithoutPages > 1 ? "books" : "book"} had
              no page count. A generic 100 pages was assumed.
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {pageData && <PagesPerYearExplanation pageData={pageData} />}
      {showYear ? (
        <YearDetail year={showYear} type="pages" />
      ) : (
        <div className="col-md-auto">
          <svg
            viewBox="0 0 400 400"
            width="400"
            height="400"
            overflow="visible"
          >
            <image
              href={catImage2}
              width="100%"
              height="350px"
              x="-50"
              y="150"
            />
            <foreignObject x="100" y="75" width="300" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">What is Archie up to again?</div>
              </div>
            </foreignObject>
          </svg>
        </div>
      )}
    </>
  );
};

export default PagesPerYear;
