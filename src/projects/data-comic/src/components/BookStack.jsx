import { useEffect, useRef, useState } from "react";
import { useData } from "../DataProvider";
import * as d3 from "d3";
import BookDetail from "./BookDetail";
import { filter, filterByCountry } from "../utils/filter";
import Tooltip from "./Tooltip";
import catImage2 from "../assets/images/cat_resting.png";

const BookStack = ({ property, value }) => {
  const width = 80;
  const height = 250;
  const margin = { top: 50, right: 30, bottom: 50, left: 60 };
  const svgRef = useRef(null);
  const { data } = useData();
  const [detail, setDetail] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setDetail(null);
      const readBooks = filter(data, "Read Status", "read");
      if (property === "Country") {
        const filteredBooks = filterByCountry(readBooks, value);
        console.log(filteredBooks);
        createStack(filteredBooks);
      } else {
        const filteredBooks = filter(readBooks, property, value);
        createStack(filteredBooks);
      }
    }
  }, [property, value]);

  const createStack = (aggregatedData) => {
    const oldSvg = d3.select(svgRef.current);
    oldSvg.selectAll("*").remove();

    const svg = oldSvg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Y axis
    const maxCount = aggregatedData.length;
    const y = d3.scaleLinear().domain([0, maxCount]).range([height, 0]);
    if (maxCount > 10) {
      svg.append("g").call(d3.axisLeft(y));
    } else {
      svg.append("g").call(
        d3
          .axisLeft(y)
          .ticks(maxCount) // Set number of ticks equal to max count
          .tickFormat(d3.format("d")) // Format ticks as integers
      );
    }

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const rects = svg
      .selectAll("rect")
      .data(aggregatedData)
      .enter()
      .append("rect")
      .attr("x", 30) // Position based on index
      .attr("y", (d) => y(aggregatedData.length - aggregatedData.indexOf(d))) // Reverse the y positioning for top-down
      .attr("width", 45) // Width of each rectangle
      .attr("height", height / aggregatedData.length) // Height of each rectangle
      .attr("fill", (d, i) => color(i)) // Color based on index
      .attr("class", "interactive")
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
  };

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel py-4">
          <svg
            ref={svgRef}
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
          >
            {/* <svg ref={svgRef} width={width} height={height}></svg> */}
          </svg>
          <div className="comic-text top-right">{value} stack</div>
          <div
            className="comic-text bottom-right ms-2"
            style={{ fontSize: "17px" }}
          >
            Click on a book to reveal a detail view!
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
export default BookStack;
