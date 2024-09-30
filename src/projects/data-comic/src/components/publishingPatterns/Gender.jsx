import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useData } from "../../DataProvider";
import { filter } from "../../utils/filter";
import { aggregate } from "../../utils/aggregate";
import CatImage from "../../assets/images/cat_pointing_up.png";
import CatIamge2 from "../../assets/images/cat_belly_side.png";
import CharacterImage from "../../assets/images/character_sitting.png";

const Gender = () => {
  const width = 580;
  const height = 400;
  const svgRef = useRef(null);
  const [aggregatedData, setAggregatedData] = useState(null);
  const [unknown, setUnknown] = useState(0);
  const { data, apiResponse } = useData();

  // Fetch and process the data
  useEffect(() => {
    if (data) {
      const readBooks = filter(data, "Read Status", "read");

      const genderCount = aggregate(readBooks, "Gender");

      let finalGenderCount = {
        male: genderCount["male"] || 0,
        female: genderCount["female"] || 0,
        "non-binary": genderCount["non-binary"] || 0,
      };

      // Filter out zero values
      finalGenderCount = Object.fromEntries(
        Object.entries(finalGenderCount).filter(([key, value]) => value > 0)
      );

      const unknownGender =
        readBooks.length -
        (finalGenderCount["male"] +
          finalGenderCount["female"] +
          finalGenderCount["non-binary"] || 0);

      if (readBooks.length === unknownGender) {
        setUnknown(0);
      } else {
        setUnknown(unknownGender);
      }

      setAggregatedData(finalGenderCount);
    }
  }, [data]);

  // Draw the map and apply colors based on aggregatedData
  useEffect(() => {
    if (!aggregatedData) return;

    const radius = Math.min(width, height) / 2 - 60;
    const innerRadius = radius * 0.5;
    const oldSvg = d3.select(svgRef.current);
    oldSvg.selectAll("*").remove();

    const svg = oldSvg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal().range(d3.schemeDark2);

    const pie = d3.pie().value((d) => d[1]);
    const data_ready = pie(Object.entries(aggregatedData));

    const arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(radius);

    svg
      .selectAll("mySlices")
      .data(data_ready)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data[0]))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg
      .selectAll("mySlices")
      .data(data_ready)
      .join("polyline")
      .attr("points", (d) => {
        const posA = arcGenerator.centroid(d);
        const posB = arcGenerator.centroid(d);
        const posC = [...posB];
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posB[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1);
        posC[0] = radius * 1.3 * (midAngle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      })
      .style("fill", "none")
      .attr("stroke", "black")
      .style("stroke-width", "1px");

    svg
      .selectAll("mySlices")
      .data(data_ready)
      .join("text")
      .text((d) => (d.data[1] > 0 ? `${d.data[0]} (${d.data[1]})` : null))
      .attr("transform", (d) => {
        const pos = arcGenerator.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

        // Adjust x and y positions
        pos[0] = radius * 1.35 * (midAngle < Math.PI ? 1 : -1);
        pos[1] = pos[1] * 0.97; // Add an offset to the y-coordinate to align the text better

        return `translate(${pos})`;
      })
      .style("text-anchor", (d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midAngle < Math.PI ? "start" : "end";
      })
      .style("font-size", 15);
  }, [aggregatedData, width, height]);

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 610 400"
            width="610"
            height="400"
            overflow="visible"
          >
            <image
              href={CharacterImage}
              width="100%"
              height="350px"
              x="-180"
              y="100"
            />
            <image
              href={CatIamge2}
              width="100%"
              height="350px"
              x="70"
              y="170"
            />
            <foreignObject x="155" y="15" width="380" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">{apiResponse.gender_ratio}</div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg width={width} height={height}>
            <g ref={svgRef} width={width} height={height}></g>
            <image href={CatImage} width="100%" height="185px" x="10" y="130" />
          </svg>
          <div className="comic-text top-right">
            Read books by gender of the author
          </div>
          {unknown ? (
            <div
              className="comic-text bottom-left"
              style={{ fontSize: "17px" }}
            >
              {unknown} {unknown > 1 ? "books" : "book"} could not be assigned
              an author gender.
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Gender;
