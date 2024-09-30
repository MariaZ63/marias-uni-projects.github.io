import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CatImage from "../../assets/images/cat_handstand.png";
import catImage2 from "../../assets/images/cat_standing.png";
import CharacterImage from "../../assets/images/character_bookstack.png";
import { useData } from "../../DataProvider";
import { aggregateByYear } from "../../utils/aggregate";
import { filter } from "../../utils/filter";
import YearDetail from "./YearDetail";
import { getReadingSpeed } from "../../utils/compute";

const BooksPerYear = () => {
  const svgRef = useRef();
  const { data } = useData();
  const [showYear, setShowYear] = useState(null);
  const [readingSpeed, setReadingSpeed] = useState(0);

  useEffect(() => {
    if (data) {
      createBarChart(data);

      const readBooks = filter(data, "Read Status", "read");
      const booksPerYear = aggregateByYear(readBooks);
      setReadingSpeed(getReadingSpeed(booksPerYear));
    }
  }, [data]);

  const createBarChart = (data) => {
    // Set the dimensions and margins of the graph
    const margin = { top: 30, right: 70, bottom: 35, left: 30 },
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
    const years = aggregateByYear(readBooks);

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
    const maxCount = d3.max(years, (d) => d.count) + 5;
    const y = d3.scaleLinear().domain([0, maxCount]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    //dynamically position image on last bar
    svg
      .append("image")
      .attr("href", CatImage)
      .attr("width", "100")
      .attr("height", "100")
      .attr("x", x(years[years.length - 1].year) + x.bandwidth() / 2 - 40)
      .attr("y", y(years[years.length - 1].count) - 75);

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

    //dynamically position speech bubble in relation to the cat
    svg
      .append("foreignObject")
      .attr("width", 110)
      .attr("height", 140)
      .attr("x", x(years[years.length - 1].year) + x.bandwidth() / 2 + 25)
      .attr("y", y(years[years.length - 1].count) - 130)
      .append("xhtml:div") // Use "xhtml:div" to make sure it's recognized as HTML
      .style("width", "100%")
      .style("height", "100%")
      .attr("class", "bubble")
      .style("font-size", "17px")
      .text("Click on the columns to reveal details of that year!");
  };

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg ref={svgRef} id="panel03"></svg>
          <div className="comic-text top-right">
            Overview of books read by year
          </div>
        </div>
      </div>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 310 400"
            width="310"
            height="400"
            overflow="visible"
          >
            <image
              href={CharacterImage}
              width="100%"
              height="340px"
              x="-80"
              y="110"
            />
            <foreignObject x="70" y="5" width="290" height="350">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">
                  {readingSpeed > 12 ? "Impressive! " : "Not bad! "}
                  On average, you read <b>{readingSpeed}</b> books per year.
                  This is{" "}
                  {readingSpeed < 12
                    ? "less than"
                    : readingSpeed > 12
                    ? "more than"
                    : "the same as"}{" "}
                  the average American, who reads 12 books per year.*
                </div>
              </div>
            </foreignObject>
          </svg>
          <div className="comic-text bottom-right" style={{ fontSize: "17px" }}>
            *click&nbsp;
            <a
              href="https://www.pewresearch.org/short-reads/2015/10/19/slightly-fewer-americans-are-reading-print-books-new-survey-finds/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            &nbsp;to see the source
          </div>
        </div>
      </div>
      {showYear ? (
        <YearDetail year={showYear} type="books" />
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
              x="-40"
              y="130"
            />
            <foreignObject x="100" y="75" width="300" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">Archie?</div>
              </div>
            </foreignObject>
          </svg>
        </div>
      )}
    </>
  );
};

export default BooksPerYear;
