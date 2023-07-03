//Sort array by director, then sort by number of movies, then select top 15 directors.
const filterData = (csvData) => {
  // Filter out movies without a director (otherwise the top director would be the empty string "")
  const filteredData = csvData.filter(function (movie) {
    return movie.Director !== "";
  });

  // Count the number of movies directed by each director
  const directorCounts = d3.rollup(
    filteredData,
    function (values) {
      return values.length;
    },
    function (movie) {
      return movie.Director;
    }
  );

  // Sort the array by the number of movies directed
  const sortedData = filteredData.sort(function (a, b) {
    const directorA = a.Director;
    const directorB = b.Director;
    const countA = directorCounts.get(directorA);
    const countB = directorCounts.get(directorB);
    return countB - countA; // Sort in descending order
  });

  // Get the top 15 directors and their movie counts
  const topDirectors = Array.from(directorCounts, ([director, count]) => ({
    director,
    count,
  }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Filter the dataset for movies directed by the top directors
  const topDirectorsData = sortedData.filter(function (movie) {
    return topDirectors.some(function (director) {
      return director.director === movie.Director;
    });
  });

  return { topDirectorsData, topDirectors };
};

//Sort array by the release dates
const dates = (filteredData) => {
  const datesArray = JSON.parse(JSON.stringify(filteredData));
  for (let i = 0; i < datesArray.length; i++) {
    datesArray[i]["Release Date"] = new Date(
      datesArray[i]["Release Date"]
    ).getTime();
  }
  datesArray.sort((a, b) => a["Release Date"] - b["Release Date"]);
  return datesArray;
};

window.onload = function () {
  const svgWidth = 1300,
    svgHeight = 650;

  d3.csv("movies.csv").then(function (csvData) {
    //get filtered data
    const { topDirectorsData, topDirectors } = filterData(csvData);

    const filteredData = topDirectorsData;
    const directors = topDirectors;

    const sortedByDates = dates(filteredData);

    const svg = d3
      .select("#visSvg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    //time scale
    const scale = d3
      .scaleTime()
      .domain([
        sortedByDates[0]["Release Date"],
        sortedByDates[sortedByDates.length - 1]["Release Date"],
      ])
      .range([0, 700]);

    //scale that associates directors with their corresponding height in the diagram
    const directorScale = d3
      .scaleOrdinal()
      .domain(filteredData.map((d) => d.Director))
      .range([
        50, 90, 130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570, 610,
      ]);

    //set that only contains the different genres
    const filteroutNoGenre = filteredData.filter(
      (movie) => movie["Major Genre"] !== ""
    );
    const genresArray = Array.from(
      new Set(filteroutNoGenre.map((movie) => movie["Major Genre"]))
    );

    //color scale that maps the different genres to colors
    let colorScale = d3
      .scaleOrdinal()
      .domain([genresArray[0], genresArray[genresArray.length - 1]])
      .range([
        "#6e40aa",
        "#bf3caf",
        "#fe4b83",
        "#ff7847",
        "#e2b72f",
        "#aff05b",
        "#52f667",
        "#1ddfa3",
        "#23abd8",
        "#4c6edb",
        "#6e40aa",
      ]);

    //sort the data by Worldwide Gross. Goal: Draw the bigger circles first so that bigger circles don't overlap the smaller ones  
    const sortByGross = JSON.parse(JSON.stringify(filteredData)).sort(
      (a, b) => b["Worldwide Gross"] - a["Worldwide Gross"]
    );

    //scale for the circle size (according to the Worldwide Gross/Production Budget)
    let sqrtScale = d3.scaleSqrt().domain([0, 1000000000]).range([5, 30]);

    //Draw the lines for the diagram (one line for each director)
    const line = svg
      .selectAll("line")
      .data(directors)
      .enter()
      .append("line")
      .attr("y1", (d, i) => i * 40 + 50)
      .attr("x1", 140)
      .attr("y2", (d, i) => i * 40 + 50)
      .attr("x2", 840)
      .attr("stroke", "grey")
      .attr("id", (d) => d["director"]);

    //names of the directors 
    const text = svg
      .selectAll("text")
      .data(directors)
      .enter()
      .append("text")
      .attr("x", 135)
      .attr("y", (d, i) => i * 40 + 52)
      .attr("text-anchor", "end")
      .attr("class", "small")
      .text((d) => d["director"] );

    //glyphs represent each film as one data point
    const glyph = svg.selectAll("g").data(sortByGross).enter().append("g");

    //glyph1 gets its size from the Worldwide Gross
    const glyph1 = glyph
      .append("circle")
      .attr("cx", (d) => {
        const date = new Date(d["Release Date"]).getTime();
        return scale(date) + 140;
      })
      .attr("cy", (d) => directorScale(d.Director))
      .attr("r", (d) => {
        if (d["Worldwide Gross"] === "") {
          return 5;
        }
        return sqrtScale(d["Worldwide Gross"]);
      })
      .style("opacity", 0.7)
      .attr("fill", (d) => {
        if (d["Major Genre"] === "") {
          return "grey";
        }
        return colorScale(d["Major Genre"]);
      })
      .attr("stroke", "white");

    //glyph2 gets its size from the Production Budget 
    const glyph2 = glyph
      .append("circle")
      .attr("cx", (d) => {
        const date = new Date(d["Release Date"]).getTime();
        return scale(date) + 140;
      })
      .attr("cy", (d) => directorScale(d.Director))
      .attr("r", (d) => {
        if (d["Production Budget"] === "") {
          return 0; // No inner circle if no production budget
        }
        return sqrtScale(d["Production Budget"]);
      })
      .attr("fill", "white")
      .attr("stroke", (d) => {
        if (d["Major Genre"] === "") {
          return "grey";
        }
        return colorScale(d["Major Genre"]);
      })
      .style("opacity", 0.7)
      .style("stroke-opacity", 0.7);

    //draw time axis
    const axis = d3.axisBottom(scale);

    d3.select("svg g").call(axis).attr("transform", "translate(140, 10)");

    //append color legend
    const colorLegend = svg
      .selectAll("mydots")
      .data(genresArray)
      .enter()
      .append("circle")
      .attr("cx", 870)
      .attr("cy", (d, i) => 50 + i * 25)
      .attr("r", 7)
      .style("fill", (d) => colorScale(d));

    const colorLegendTitle = svg
      .append("text")
      .attr("x", 870)
      .attr("y", 35)
      .text("Major Genres: ")
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold");

    const colorLabels = svg
      .selectAll("mylabels")
      .data(genresArray)
      .enter()
      .append("text")
      .attr("x", 890)
      .attr("y", (d, i) => 55 + i * 25)
      .text((d) => d)
      .style("alignment-baseline", "middle")
      .attr("class", "small");

    const sizeLegendTitle = svg
      .append("text")
      .attr("x", 870)
      .attr("y", 340)
      .text("Worldwide Gross/Production Budget: ")
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold");

    //append size legend
    const sizeLegend = svg.append("g").attr("transform", "translate(870, 350)");

    sizeLegend
      .append("circle")
      .attr("cx", 20)
      .attr("cy", 25)
      .attr("r", sqrtScale(1000000000))
      .style("fill", "grey")
      .attr("opacity", 0.7);

    sizeLegend
      .append("circle")
      .attr("cx", 20)
      .attr("cy", 85)
      .attr("r", sqrtScale(500000000))
      .style("fill", "grey")
      .attr("opacity", 0.7);

    sizeLegend
      .append("circle")
      .attr("cx", 20)
      .attr("cy", 130)
      .attr("r", sqrtScale(0))
      .style("fill", "grey")
      .attr("opacity", 0.7);

    sizeLegend
      .append("text")
      .attr("x", 50)
      .attr("y", 25)
      .text("1,000,000,000 USD")
      .attr("class", "small");

    sizeLegend
      .append("text")
      .attr("x", 50)
      .attr("y", 90)
      .text("500,000,000 USD")
      .attr("class", "small");

    sizeLegend
      .append("text")
      .attr("x", 50)
      .attr("y", 135)
      .text("0 USD")
      .attr("class", "small");

    //div for tooltip information
    const Tooltip = d3
      .select("#div_template")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")
      .style("font-family", "sans-serif");

    //Handling mouseover, mouseleave and click events
    let clickedGenre = null; // Track the clicked genre

    const mouseover = (event, d) => {
      const worldWideGross = parseInt(d["Worldwide Gross"]).toLocaleString('en-US');
      const productionBudget = parseInt(d["Production Budget"]).toLocaleString('en-US');
      Tooltip.style("opacity", 1)
        .html(
          `<b>Title:</b> ${d.Title}<br><b>Major Genre:</b> ${d["Major Genre"]} <br><b>Release Date:</b> ${d["Release Date"]} <br><b>Worldwide Gross:</b> ${worldWideGross} USD <br><b>Production Budget:</b> ${productionBudget} USD <br><b>IMDB Rating:</b> ${d["IMDB Rating"]}`
        )
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY + 10 + "px");

      glyph1.style("opacity", (data) => {
        if (
          data === d ||
          (clickedGenre && data["Major Genre"] === clickedGenre)
        ) {
          // Hovered circle or same genre as clicked, set opacity to 1
          return 1;
        } else {
          // Different genre or not hovered circle, lower opacity
          return 0.3;
        }
      });
    };

    const mouseleave = (event, d) => {
      Tooltip.style("opacity", 0);

      //glyph.selectAll("circle")
      glyph1.style("opacity", (data) => {
        if (clickedGenre && data["Major Genre"] === clickedGenre) {
          // Same genre as clicked, set opacity to 1
          return 1;
        } else if (clickedGenre && data["Major Genre"] !== clickedGenre) {
          //not the same genre as clicked, opacity remains 0.3
          return 0.3;
        } else {
          // Different genre or no click event active, reset opacity
          return 0.7;
        }
      });
    };

    const click = (event, d) => {
      if (clickedGenre && clickedGenre === d["Major Genre"]) {
        // Same genre, toggle off the click event
        clickedGenre = null;
        glyph1.style("opacity", 0.7); // Reset opacity for all glyphs
      } else {
        // Different genre or no click event active, toggle on the click event
        clickedGenre = d["Major Genre"];
        glyph1.style("opacity", (data) => {
          if (data["Major Genre"] === clickedGenre || data === d) {
            // Same genre or clicked circle, set opacity to 1
            return 1;
          } else {
            // Different genre, lower opacity
            return 0.3;
          }
        });
      }
    };

    const endClick = (event) => {
      if (!event.target.closest("circle")) {
        // Clicked outside of circles, reset the click event
        clickedGenre = null;
        glyph1.style("opacity", 0.7);
      }
    };

    document.addEventListener("click", endClick);

    glyph
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave)
      .on("click", click);
  });
};
