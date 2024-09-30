import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import worldData from "../../assets/data/world.geo.json";
import { filter } from "../../utils/filter";
import { aggregateCountries } from "../../utils/aggregate";
import WorldMapExplanation from "./WorldMapExplanation";
import { useData } from "../../DataProvider";
import CatImage from "../../assets/images/cat_pointing_up_2.png";
import catImage2 from "../../assets/images/cat_standing.png";
import BookStack from "../BookStack";
import Tooltip from "../Tooltip";
import BookRecommendation from "../BookRecommendation";
import { recommendations } from "../../assets/data/countryRecommendations";
import { apiRequest } from "../../utils/apiRequest";

const WorldMap = () => {
  const width = 580;
  const height = 400;
  const svgRef = useRef(null);
  const [aggregatedData, setAggregatedData] = useState(null);
  const [rec, setRec] = useState("");
  const [country, setCountry] = useState("");
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { data } = useData();

  // Fetch and process the data
  useEffect(() => {
    if (data) {
      const readBooks = filter(data, "Read Status", "read");

      const countryCount = aggregateCountries(readBooks, "Country");

      setAggregatedData(countryCount);
    }
  }, [data]);

  // Draw the map and apply colors based on aggregatedData
  useEffect(() => {
    if (!aggregatedData) return; // Do nothing if data is not available yet

    const svg = d3.select(svgRef.current);

    // Define the projection and path generator
    const projection = d3.geoMercator().fitSize([width, height], worldData);

    const path = d3.geoPath().projection(projection);

    // Extract values excluding "unknown"
    const values = Object.entries(aggregatedData)
      .filter(([country]) => country !== "unknown")
      .map(([_, count]) => count);

    // Define a color scale based on the aggregated data
    const colorScale = d3
      .scaleQuantize()
      .domain([1, d3.max(values)])
      .range(d3.schemeYlGnBu[5]);

    // Clear previous map paths (if any)
    svg.selectAll("path").remove();

    // Append the map to the SVG and color it based on aggregated data
    svg
      .selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        const countryName = d.properties.name;
        const count = aggregatedData[countryName];
        if (count) {
          return colorScale(count);
        }
        return "#C0C0C0";
      })
      .attr("stroke", "#333")
      .attr("class", "interactive")
      .on("mouseover", (event, d) => {
        const countryName = d.properties.name;
        const count = aggregatedData[countryName] || 0;
        setTooltipContent(
          `${countryName}: ${count || 0} ${count === 1 ? "book" : "books"}`
        );
        setTooltipVisible(true);
      })
      .on("mousemove", (event) => {
        setTooltipPosition({ x: event.pageX, y: event.pageY });
      })
      .on("mouseout", () => {
        setTooltipVisible(false);
      })
      .on("click", async (event, d) => {
        const countryName = d.properties.name;
        const count = aggregatedData[countryName] || 0;
        if (!count) {
          setCountry("");
          const countryRecommendation = recommendations.find(
            (item) => item[countryName]
          );

          /* if (!countryRecommendation) {
            setRec(
              `I'm sorry, but I can't think of any book from ${countryName} to recommend.`
            );
          } else { */
          /* const title = countryRecommendation[countryName]["Title"];
            const author = countryRecommendation[countryName]["Authors"]; */
          setRec("loading");
          const message = `Give the reader a personalized recommendation for a book that is from the following country: ${countryName}. Don't use markup. Keep your answer brief in about 3 sentences. Start like this: "If you want to read a book from ..."`;
          const recommendation = await apiRequest(message, data);
          //countryRecommendation[countryName]["Recommendation"];

          setRec(recommendation);
          /* } */
          return;
        }
        setRec("");
        setCountry(countryName);
      });

    // Add a legend (optional but recommended)
    /* const legendWidth = 200;
    const legendHeight = 20;
    const legendX = width - legendWidth - 20;
    const legendY = height - legendHeight - 20;

    const legend = svg
      .append("g")
      .attr("transform", `translate(${legendX}, ${legendY})`);

    const legendScale = d3
      .scaleLinear()
      .domain([0, d3.max(values)])
      .range([0, legendWidth]);

    legend
      .selectAll("rect")
      .data(
        colorScale.range().map((color) => {
          const [start, end] = colorScale.invertExtent(color);
          return { color, start, end };
        })
      )
      .enter()
      .append("rect")
      .attr("x", (d) => legendScale(d.start))
      .attr("width", (d) => legendScale(d.end) - legendScale(d.start))
      .attr("height", legendHeight)
      .attr("fill", (d) => d.color);

    legend
      .append("text")
      .attr("x", legendWidth)
      .attr("y", legendHeight / 2)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text("Count"); */
    // Add a legend (updated to include numbers)
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = width - legendWidth - 20;
    const legendY = height - legendHeight - 20;

    const legend = svg
      .append("g")
      .attr("transform", `translate(${legendX}, ${legendY})`);

    // Define the scale for the legend and the ticks (for numbers)
    const legendScale = d3
      .scaleLinear()
      .domain(colorScale.domain()) // Use the same domain as the color scale
      .range([0, legendWidth]);

    // Add color blocks to the legend
    legend
      .selectAll("rect")
      .data(
        colorScale.range().map((color) => {
          const [start, end] = colorScale.invertExtent(color);
          return { color, start, end };
        })
      )
      .enter()
      .append("rect")
      .attr("x", (d) => legendScale(d.start))
      .attr("width", (d) => legendScale(d.end) - legendScale(d.start))
      .attr("height", legendHeight)
      .attr("fill", (d) => d.color);

    // Add ticks (numbers) to the legend
    const legendAxis = d3
      .axisBottom(legendScale)
      .tickSize(legendHeight)
      .tickValues(colorScale.thresholds()); // Use the thresholds from the color scale

    legend.append("g").call(legendAxis).select(".domain").remove(); // Remove the axis line
  }, [aggregatedData, width, height]);

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg ref={svgRef} width={width} height={height}>
            <image
              href={CatImage}
              width="100%"
              height="90px"
              x="-260"
              y="335"
            />
            <foreignObject x="55" y="260" width="120" height="200">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%", fontSize: "17px" }}
              >
                <div className="bubble">
                  Hover over a country or click on it for details.
                </div>
              </div>
            </foreignObject>
          </svg>
          <div className="comic-text top-right">
            Overview of books read by country
          </div>
        </div>
      </div>

      {rec && <BookRecommendation recommendation={rec} />}
      {country && <BookStack property="Country" value={country} />}
      {!(rec || country) && (
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
              y="150"
            />
            <foreignObject x="100" y="75" width="300" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">
                  I think Archie's gone out to chase raindrops again...
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
      {aggregatedData && <WorldMapExplanation data={aggregatedData} />}
    </>
  );
};

export default WorldMap;
