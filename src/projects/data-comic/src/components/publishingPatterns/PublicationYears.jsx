import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useData } from "../../DataProvider";
import { filter } from "../../utils/filter";
import CharacterImage from "../../assets/images/character_cat_2.png";
import BookRecommendation from "../BookRecommendation";

const PublicationYears = () => {
  const width = 390;
  const height = 320;
  const margin = { top: 50, right: 30, bottom: 30, left: 160 };
  const svgRef = useRef(null);
  const { data, apiResponse } = useData();
  const [aggregatedData, setAggregatedData] = useState([]);

  //console.log(apiResponse.distribution_of_years);

  const transformToArray = (data) => {
    return data
      .map((d) => d["Original Publication Year"] || d["Year Published"])
      .filter((d) => d);
  };

  useEffect(() => {
    if (data) {
      const readBooks = filter(data, "Read Status", "read");
      const years = transformToArray(readBooks);
      setAggregatedData(years);
    }
  }, [data]);

  useEffect(() => {
    if (aggregatedData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .domain([d3.min(aggregatedData), d3.max(aggregatedData)])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    const histogram = d3.bin().domain(x.domain()).thresholds(x.ticks(20)); // Adjust the number of bins as needed

    const bins = histogram(aggregatedData);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data(bins)
      .join("rect")
      .attr("x", (d) => x(d.x0))
      .attr("transform", (d) => `translate(0, ${y(d.length)})`)
      .attr("width", (d) => {
        //console.log(d, x(d.x1), x(d.x0), x(d.x1) - x(d.x0) - 1);
        return x(d.x1) - x(d.x0) - 1;
      })
      .attr("height", (d) => height - y(d.length))
      .style("fill", "#69b3a2");
  }, [aggregatedData]);

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
          >
            <g
              ref={svgRef}
              transform={`translate(${margin.left},${margin.top})`}
            />
            <image
              href={CharacterImage}
              width="100%"
              height="300px"
              transform="scale(-1 1) translate(-350 170)"
            />
            <foreignObject x="170" y="55" width="330" height="370">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div
                  className="bubble"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                >
                  {apiResponse.distribution_of_years}
                </div>
              </div>
            </foreignObject>
          </svg>
          <div className="comic-text top-right">
            Distribution of publication years
          </div>
        </div>
      </div>
      <BookRecommendation
        recommendation={apiResponse.time_period_recommendation}
      />
    </>
  );
};

export default PublicationYears;
