import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useData } from "../../DataProvider";
import CharacterImage from "../../assets/images/character_bookstack.png";
import catImage from "../../assets/images/cat_standing.png";
import catImage2 from "../../assets/images/cat_walking.png";
import { filter } from "../../utils/filter";
import { aggregateByYear } from "../../utils/aggregate";
import BookDetail from "../BookDetail";
import { getReadingSpeed } from "../../utils/compute";
import Tooltip from "../Tooltip";

function formatTime(years) {
  const wholeYears = Math.floor(years); // Get the whole number of years
  const months = Math.round((years - wholeYears) * 12); // Convert the decimal part to months

  // Handle the case where the year value is 0
  if (wholeYears === 0 && months > 0) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }

  // Construct the final output based on the values
  let result =
    wholeYears > 0 ? `${wholeYears} year${wholeYears !== 1 ? "s" : ""}` : "";
  if (months > 0) {
    result += `${wholeYears > 0 ? " and " : ""}${months} month${
      months !== 1 ? "s" : ""
    }`;
  }

  return result || "0 months"; // Handle case where both years and months are 0
}

/**
 * TBR component visualizes the user's "To Be Read" (TBR) book stack 
 * using D3.js to create an interactive chart.
 *
 * @returns {JSX.Element} The rendered component displaying the TBR stack, 
 *                       character dialogues, feedback on reading speed, 
 *                       and a tooltip for book details.
 */
const TBR = () => {
  const width = 360;
  const height = 340;
  const margin = { top: 30, right: 30, bottom: 30, left: 60 };
  const svgRef = useRef(null);
  const { data } = useData();
  const [aggregatedData, setAggregatedData] = useState(null);
  const [readingSpeed, setReadingSpeed] = useState(0);
  const [detail, setDetail] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Fetch and process the data
  useEffect(() => {
    if (data) {
      const toReadBooks = filter(data, "Read Status", "to-read");
      setAggregatedData(toReadBooks);

      const readBooks = filter(data, "Read Status", "read");
      const booksPerYear = aggregateByYear(readBooks);
      setReadingSpeed(getReadingSpeed(booksPerYear));
    }
  }, [data]);

  // Draw the map and apply colors based on aggregatedData
  useEffect(() => {
    if (!aggregatedData) return; // Do nothing if data is not available yet
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
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

    // Add title for tooltip
    //rects.append("title").text((d) => d.Title);
  }, [aggregatedData, width, height]);

  const Feedback = () => {
    return (
      <svg
        viewBox="0 0 450 400"
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        overflow="visible"
      >
        <foreignObject x="155" y="25" width="280" height="220">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ width: "100%", height: "100%" }}
          >
            <div className="bubble">
              On average, you read <b>{readingSpeed}</b> books per year. If you
              only read the books on your TBR, it would take you around{" "}
              <b>{formatTime(aggregatedData.length / readingSpeed)}</b> to
              finish.
            </div>
          </div>
        </foreignObject>
        <image
          href={catImage}
          width="90%"
          y="100"
          transform="scale(-1 1) translate(-400 0)"
        ></image>
      </svg>
    );
  };

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 300 400"
            width="300"
            height="400"
            overflow="visible"
          >
            <image
              href={CharacterImage}
              width="100%"
              height="390px"
              x="-70"
              y="90"
            />
            <foreignObject x="100" y="75" width="300" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">I found your TBR* stack!</div>
              </div>
            </foreignObject>
          </svg>
          <div className="comic-text bottom-right" style={{ fontSize: "17px" }}>
            * TBR = to be read
          </div>
        </div>
      </div>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
          >
            {aggregatedData ? <Feedback /> : <></>}
            <svg ref={svgRef} width={width} height={height}></svg>
          </svg>
          <div className="comic-text top-right">TBR stack</div>
          <div className="comic-text bottom-right" style={{ fontSize: "17px" }}>
            Click on a book to reveal a detail view!
          </div>
        </div>
      </div>
      <Tooltip
        content={tooltipContent}
        position={tooltipPosition}
        isVisible={tooltipVisible}
      />
      {detail ? (
        <BookDetail book={detail} setDetail={setDetail} />
      ) : (
        <>
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
                <div className="bubble">Archie! Where are you going?</div>
              </div>
            </foreignObject>
            </svg>
          </div>
        </>
      )}
    </>
  );
};

export default TBR;
