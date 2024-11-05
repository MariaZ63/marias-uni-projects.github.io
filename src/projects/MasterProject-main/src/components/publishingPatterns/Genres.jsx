import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { useData } from "../../DataProvider";
import CatImage from "../../assets/images/cat_belly.png";
import catImage2 from "../../assets/images/cat_handstand.png";
import CharacterImage from "../../assets/images/character_standing.png";
import { aggregate } from "../../utils/aggregate";
import { filter } from "../../utils/filter";
import Tooltip from "../Tooltip";
import BookStack from "../BookStack";

/**
 * Genres component visualizes the reading genres of the user through a word cloud.
 * It displays the frequency of each genre based on the books the user has read
 * and provides interaction through tooltips and click events to explore specific genres.
 *
 * - Creates a word cloud representation of reading genres using D3.js and d3-cloud.
 * - Allows users to hover over or click genres for more information.
 * - Displays additional information about genres that could not be assigned.
 * - Integrates visual elements like character images to enhance user experience.
 *
 * @returns {JSX.Element} The rendered Genres component.
 */

const Genres = () => {
  const width = 400;
  const height = 250;
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const svgRef = useRef(null);
  const { data } = useData();
  const [aggregatedData, setAggregatedData] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (data) {
      const books = filter(data, "Read Status", "read");
      const aggregateByGenre = aggregate(books, "Genre");
      setAggregatedData(aggregateByGenre);
    }
  }, [data]);

  useEffect(() => {
    if (aggregatedData) {
      const words = Object.keys(aggregatedData)
        .filter((genre) => genre !== "N/A")
        .map((genre) => ({
          text: genre,
          size: aggregatedData[genre],
        }));

      const draw = (words) => {
        // Clear any existing elements before drawing
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3
          .select(svgRef.current)
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);

        svg
          .selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-family", "YourCustomFont")
          .style(
            "fill",
            () => d3.schemeCategory10[Math.floor(Math.random() * 10)]
          )
          .attr("text-anchor", "middle")
          .attr(
            "transform",
            (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`
          )
          .style("font-size", (d) => d.size + "px")
          .text((d) => d.text)
          .attr("class", "interactive")
          .on("mouseover", (event, d) => {
            setTooltipContent(`${d.text}: ${aggregatedData[d.text]}`);
            setTooltipVisible(true);
          })
          .on("mousemove", (event) => {
            setTooltipPosition({ x: event.pageX, y: event.pageY });
          })
          .on("mouseout", () => {
            setTooltipVisible(false);
          })
          .on("click", (event, d) => {
            setGenre("");
            setGenre(d.text);
          });
        //.on("mouseover", (event, d) => console.log(d, words));
      };

      const layout = cloud()
        .size([width, height])
        .words(words)
        .padding(5)
        .rotate(() => 0 /* ~~(Math.random() * 2) * 90 */)
        .font("Impact")
        .fontSize((d) => Math.log(d.size + 1.5) * 16) // Adjust the multiplier to scale font sizes
        .on("end", draw);

      layout.start();
    }
  }, [aggregatedData]);

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 580 400"
            width="580"
            height="400"
            overflow="visible"
          >
            <image
              href={CharacterImage}
              width="100%"
              height="350px"
              x="-240"
              y="100"
            />
            <image
              href={CatImage}
              width="70%"
              x="-25"
              y="240"
              transform="rotate(-15)"
            ></image>
            <foreignObject x="400" y="320" width="180" height="150">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%", fontSize: "17px" }}
              >
                <div className="bubble">
                  Hover over a genre or click on it for details.
                </div>
              </div>
            </foreignObject>
            <foreignObject x="110" y="10" width="560" height="300">
              <div
                className="bubble mr-2"
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <svg
                  width={width + margin.left + margin.right}
                  height={height + margin.top + margin.bottom}
                >
                  <g
                    ref={svgRef}
                    transform={`translate(${margin.left},${margin.top})`}
                  />
                </svg>
              </div>
            </foreignObject>
          </svg>

          <div className="comic-text top-left">Read genres</div>
          {aggregatedData ? (
            <div
              className="comic-text bottom-left"
              style={{ fontSize: "17px" }}
            >
              {aggregatedData["N/A"]}{" "}
              {aggregatedData["N/A"] > 1 ? "books" : "book"} could not be
              assigned a genre.
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {genre ? (
        <BookStack property="Genre" value={genre} />
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
                <div className="bubble">Where is Archie sauntering off to?</div>
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

export default Genres;
