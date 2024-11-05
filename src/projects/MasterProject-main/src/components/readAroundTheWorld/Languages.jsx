import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useData } from "../../DataProvider";
import { filter } from "../../utils/filter";
import { aggregate } from "../../utils/aggregate";
import CharacterStanding from "../../assets/images/character_standing.png";

/**
 * Languages component visualizes the distribution of books read
 * in different languages using a pie chart. It aggregates data 
 * from the provided dataset, calculates the number of books 
 * in each specified language, and displays the results along with 
 * a message encouraging users to explore more languages.
 *
 * - Fetches and processes book data filtered by "Read Status".
 * - Aggregates the number of books read in specified languages:
 *   German, English, French, and Spanish.
 * - Displays a pie chart representing the distribution of books 
 *   by language.
 * - Shows the number of books that could not be assigned a language.
 * - Includes a visual element (a character image) that encourages 
 *   users to read more.
 *
 * @returns {JSX.Element} The rendered Languages component.
 */

const Languages = () => {
  const width = 400;
  const height = 400;
  const svgRef = useRef(null);
  const { data } = useData();
  const [numberOfLanguages, setNumberOfLanguages] = useState(0);
  const [unknown, setUnknown] = useState(0);

  // Fetch and process the data
  useEffect(() => {
    if (data) {
      const readBooks = filter(data, "Read Status", "read");

      const languageCount = aggregate(readBooks, "Language");

      let finalLanguageCount = {
        German: 0,
        English: 0,
        French: 0,
        Spanish: 0,
      };
      finalLanguageCount["German"] = languageCount["German"] || 0;
      finalLanguageCount["English"] = languageCount["English"] || 0;
      finalLanguageCount["French"] = languageCount["French"] || 0;
      finalLanguageCount["Spanish"] = languageCount["Spanish"] || 0;

      const unknownLanguage =
        readBooks.length -
        (finalLanguageCount["German"] +
          finalLanguageCount["English"] +
          finalLanguageCount["Spanish"] +
          finalLanguageCount["French"]);

      setUnknown(unknownLanguage);
      setNumberOfLanguages(
        Object.values(finalLanguageCount).filter((count) => count > 0).length
      );

      createPieChart(finalLanguageCount);
    }
  }, [data]);

  // Draw the map and apply colors based on aggregatedData
  const createPieChart = (aggregatedData) => {
    const radius = Math.min(width, height) / 2 - 25;
    const svg = d3.select(svgRef.current);

    // Clear any existing content
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // set the color scale
    const color = d3.scaleOrdinal().range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    const pie = d3.pie().value((d) => d[1]);
    const data_ready = pie(Object.entries(aggregatedData));

    // shape helper to build arcs:
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // Build the pie chart:
    g.selectAll("path")
      .data(data_ready)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data[0]))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add the labels
    g.selectAll("text")
      .data(data_ready)
      .join("text")
      .text((d) => (d.data[1] > 0 ? d.data[0] : ""))
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 17);
  };

  return (
    <>
      {/* {numberOfLanguages > 0 && ( */}
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg ref={svgRef} width={width} height={height}></svg>
          <div className="comic-text top-right">Read books by language</div>
          {unknown ? (
            <div
              className="comic-text bottom-left"
              style={{ fontSize: "17px" }}
            >
              {unknown} {unknown > 1 ? "books" : "book"} could not be assigned a
              language.
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* )} */}
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 330 400"
            width="330"
            height="400"
            overflow="visible"
          >
            <image
              href={CharacterStanding}
              width="100%"
              height="340px"
              x="-125"
              y="75"
            />
            <foreignObject x="105" y="15" width="270" height="250">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">
                  There still are many countries left for you to explore.&nbsp;
                  {numberOfLanguages > 0 &&
                    "Reading books in " +
                      numberOfLanguages +
                      (numberOfLanguages > 1
                        ? " different languages different languages definitely helps reading books from all over the world!"
                        : "language is probably comfortable, but reading in another language might expand your horizons!")}
                  &nbsp;Keep reading!
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Languages;
