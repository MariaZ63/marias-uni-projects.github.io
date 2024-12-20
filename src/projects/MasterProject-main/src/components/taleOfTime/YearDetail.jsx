import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { useData } from "../../DataProvider";
import { filterByYear } from "../../utils/filter";
import { aggregatePagesByMonth } from "../../utils/aggregate";
import BookDetail from "../BookDetail";
import CatImage from "../../assets/images/cat_walking.png";
import catImage2 from "../../assets/images/cat_resting.png";
import Tooltip from "../Tooltip";

/**
 * YearDetail component visualizes reading data for a specified year,
 * displaying either the number of books read or total pages read per month.
 * It utilizes D3.js for charts and supports interactions like tooltips
 * and detail views for clicked books.
 *
 * @param {Object} props - The properties object.
 * @param {number} props.year - The year for displaying reading data.
 * @param {string} props.type - The type of data to display; either "books" or "pages".
 * @returns {JSX.Element} The rendered YearDetail component.
 */

const YearDetail = ({ year, type }) => {
  const [detail, setDetail] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const { data } = useData();
  const svgRef = useRef();

  const width = 600;
  const height = 280;
  const margin = { top: 20, right: 30, bottom: 100, left: 60 };

  const sortByMonth = (data) => {
    const booksByMonth = {};
    data.forEach((d) => {
      if (d["Last Date Read"] || d["Date Read"]) {
        const month = new Date(
          d["Last Date Read"] || d["Date Read"]
        ).getMonth();
        if (!booksByMonth[month]) {
          booksByMonth[month] = [];
        }
        booksByMonth[month].push(d);
      }
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const sortedData = monthNames.map((month, i) => ({
      month,
      books: booksByMonth[i] || [],
    }));

    return sortedData;
  };

  const createBooksPerMonth = () => {
    const monthsData = sortByMonth(filterByYear(data, year));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const chartArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(monthsData.map((d) => d.month))
      .padding(0.2);

    const xAxis = chartArea
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d, i) => d)); // Add month names

    xAxis
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const maxCount = d3.max(monthsData, (d) => d.books.length);
    const y = d3.scaleLinear().domain([0, maxCount]).range([height, 0]);

    chartArea.append("g").call(
      d3
        .axisLeft(y)
        .ticks(maxCount) // Set number of ticks equal to max count
        .tickFormat(d3.format("d")) // Format ticks as integers
    );

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Stacked bars
    monthsData.forEach((monthData) => {
      const stack = chartArea
        .selectAll(`.stack-${monthData.month}`)
        .data(monthData.books)
        .join("rect")
        .attr("class", `stack-${monthData.month}`)
        .attr("x", x(monthData.month))
        .attr("y", (d, i) => y(i + 1))
        .attr("width", x.bandwidth())
        .attr("height", y(0) - y(1)) // Adjust the height for each book
        .attr("fill", (d, i) => color(i))
        .attr("class", "interactive")
        //.attr("fill", (d, i) => color(Math.floor(Math.random() * 12 )))
        .on("mouseover", (event, d) => {
          setTooltipContent(`${d.Authors}: ${d.Title}`);
          setTooltipVisible(true);
        })
        .on("mousemove", (event) => {
          setTooltipPosition({ x: event.pageX, y: event.pageY });
        })
        .on("mouseout", () => {
          setTooltipVisible(false);
        })
        .on("click", (event, d) => setDetail(d));

      // Add title for tooltip or interaction
      //stack.append("title").text((d) => d["Title"]);
    });
  };

  const createPagesPerMonth = (aggregatedPagesByMonth) => {
    const monthsData = sortByMonth(filterByYear(data, year));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const chartArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(monthsData.map((d) => d.month))
      .padding(0.2);

    const xAxis = chartArea
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d, i) => d)); // Add month names

    xAxis
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const maxCount = d3.max(aggregatedPagesByMonth, (d) => d.count);
    const y = d3.scaleLinear().domain([0, maxCount]).range([height, 0]);

    chartArea.append("g").call(d3.axisLeft(y));

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Stacked bars
    monthsData.forEach((monthData) => {
      let cumulativeHeight = 0;

      monthData.books.forEach((book, i) => {
        const pages = book["Number of Pages"] ? +book["Number of Pages"] : 100;
        const barHeight = y(cumulativeHeight) - y(cumulativeHeight + pages);

        const stack = chartArea
          .append("rect")
          .attr("class", `stack-${monthData.month}`)
          .attr("x", x(monthData.month))
          .attr("y", y(cumulativeHeight + pages)) // Starting from the top of the previous bar
          .attr("width", x.bandwidth())
          .attr("height", barHeight)
          .attr("fill", color(i))
          //.attr("fill", color(Math.floor(Math.random() * 12 )))
          .on("mouseover", (event, d) => {
            setTooltipContent(`${book.Authors}: ${book.Title}`);
            setTooltipVisible(true);
          })
          .on("mousemove", (event) => {
            setTooltipPosition({ x: event.pageX, y: event.pageY });
          })
          .on("mouseout", () => {
            setTooltipVisible(false);
          })
          .on("click", (event) => setDetail(book));

        // Update cumulative height for the next book in the stack
        cumulativeHeight += pages;
      });
    });
  };

  const addInfo = () => {
    const svg = d3.select(svgRef.current);

    svg
      .append("image")
      .attr("href", CatImage)
      .attr("width", "100%")
      .attr("height", "100px")
      .attr("x", "-220")
      .attr("y", "330");

    svg
      .append("foreignObject")
      .attr("width", 350)
      .attr("height", 50)
      .attr("x", "170")
      .attr("y", "345")
      .append("xhtml:div") // Use "xhtml:div" to make sure it's recognized as HTML
      .style("width", "100%")
      .style("height", "100%")
      .attr("class", "bubble")
      .style("font-size", "17px")
      .text("Click on a block to see more about the book!");
  };

  useEffect(() => {
    if (data) {
      setDetail(null);
      if (type === "books") {
        createBooksPerMonth(); // Pass the aggregated data
      } else if (type === "pages") {
        const booksOfYear = filterByYear(data, year);
        const aggregatedPagesByMonth = aggregatePagesByMonth(booksOfYear);
        createPagesPerMonth(aggregatedPagesByMonth);
      }
      addInfo();
    }
  }, [data, year, type]);

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            ref={svgRef}
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
          ></svg>
          <div className="comic-text top-right">
            {type === "books" ? "Books" : "Pages"} read in {year}
          </div>
        </div>
      </div>

      {detail ? (
        <BookDetail book={detail} setDetail={setDetail} />
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
              x="-70"
              y="170"
            />
            <foreignObject x="100" y="75" width="300" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">
                  Archie, you little bugger! What are you up to?
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      )}
      <Tooltip
        content={tooltipContent}
        position={tooltipPosition}
        isVisible={tooltipVisible}
      />
    </>
  );
};

export default YearDetail;
