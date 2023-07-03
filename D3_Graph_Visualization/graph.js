window.onload = () => {
  d3.json("publications.json").then((data) => {

    //Problem:obj.keywords.includes(x) führt bei speech recognition und speech zu Problemen
    //daher in allen Fällen ändern!
    //const keywordsArray = obj.keywords.split(',').map(keyword => keyword.trim());
    //if (keywordsArray.includes(keyword))

    const publicationsShareKeywords = (keyword1, keyword2, data) =>
      Object.values(data).some(
        (obj) =>
          obj.keywords.includes(keyword1) && obj.keywords.includes(keyword2)
      );

    const calculateWeight = (keyword1, keyword2, data) => {
      let count = 0;
      Object.values(data).forEach((obj) => {
        if (
          obj.keywords.includes(keyword1) &&
          obj.keywords.includes(keyword2)
        ) {
          count++;
        }
      });
      return count;
    };

      const keywordsSet = new Set();
      const publicationsByKeyword = {};

      // Collect unique keywords and count publications for each keyword
      Object.values(data).forEach((obj) => {
        obj.keywords.split(", ").forEach((keyword) => {
          keywordsSet.add(keyword);
          if (publicationsByKeyword[keyword]) {
            publicationsByKeyword[keyword]++;
          } else {
            publicationsByKeyword[keyword] = 1;
          }
        });
      });

      // Create nodes
      //const nodes = Array.from(keywordsSet).map((keyword) => ({ id: keyword }));
      const nodes = Array.from(keywordsSet).map((keyword) => {
        const publicationsCount = Object.values(data).reduce((count, obj) => {
          const keywordsArray = obj.keywords.split(',').map(keyword => keyword.trim());
          if (keywordsArray.includes(keyword)){
        //if (obj.keywords.includes(keyword)) {
            count++;
          }
          return count;
        }, 0);
      
        return {
          id: keyword,
          weight: publicationsCount,
        };
      });

      // Create links
      /* const links = [];
      Object.keys(publicationsByKeyword).forEach((keyword1, index) => {
        Object.keys(publicationsByKeyword).forEach((keyword2, jndex) => {
          if (
            index < jndex &&
            publicationsShareKeywords(keyword1, keyword2, data)
          ) {
            const weight = calculateWeight(keyword1, keyword2, data);
            links.push({ source: keyword1, target: keyword2, weight });
          }
        });
      }); */

      const links = [];

      const graph = { nodes, links };

      Object.keys(publicationsByKeyword).forEach((keyword1, index) => {
        Object.keys(publicationsByKeyword).forEach((keyword2, jndex) => {
          if (
            index < jndex &&
            publicationsShareKeywords(keyword1, keyword2, data)
          ) {
            const weight = calculateWeight(keyword1, keyword2, data) / Math.min(graph.nodes.find(node => node.id === keyword1).weight, graph.nodes.find(node => node.id === keyword2).weight);
            links.push({ source: keyword1, target: keyword2, weight });
          }
        });
      });

      
      console.log(graph.links);
      console.log(graph.nodes);

      // Find maximum and minimum node weights
/*       const nodeWeights = nodes.map(node => node.weight);
      const maxWeight = Math.max(...nodeWeights);
      const minWeight = Math.min(...nodeWeights);

      console.log("Maximum node weight:", maxWeight);
      console.log("Minimum node weight:", minWeight); */

    const nodeScale = d3.scaleSqrt().domain([1, 50]).range([5, 20]);

    const ticked = () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    };

    const dragstarted = (d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    /* const graph = {
      nodes: [{ id: "a" }, { id: "b" }],
      links: [{ source: "a", target: "b" }],
    }; */

    /* Force-directed graph layout based on D3js example (see sources) */
    const linkColor = d3.scaleLinear().domain([0, 1]).range(["#eee", "#000"]);

    const svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-70))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links.filter(d => {
        const sourceNode = graph.nodes.find(node => node.id === d.source);
        const targetNode = graph.nodes.find(node => node.id === d.target);
        return sourceNode.weight >= 3 && targetNode.weight >= 3 && d.weight >= 0.5;
      }))
      .enter()
      .append("line")
      .attr("stroke", d => linkColor(d.weight));

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes.filter(d => d.weight >= 3))
      .enter()
      .append("circle")
      .attr("r", (d) => { 
        return nodeScale(d.weight)})
      .attr("opacity", .7)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    node.append("title").text((d) => d.id);

    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation.force("link").links(graph.links);

    const sizeLegend = svg.append("g").attr("transform", "translate(10, 430)");

    sizeLegend
      .append("circle")
      .attr("cx", 20)
      .attr("cy", 25)
      .attr("r", nodeScale(50))
      .style("fill", "grey")
      .attr("opacity", 0.7);

    sizeLegend
      .append("circle")
      .attr("cx", 20)
      .attr("cy", 85)
      .attr("r", nodeScale(25))
      .style("fill", "grey")
      .attr("opacity", 0.7);

    sizeLegend
      .append("circle")
      .attr("cx", 20)
      .attr("cy", 130)
      .attr("r", nodeScale(1))
      .style("fill", "grey")
      .attr("opacity", 0.7);

    sizeLegend
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .text("number of publications")
      .attr("class", "small");

    sizeLegend
      .append("text")
      .attr("x", 50)
      .attr("y", 25)
      .text("50")
      .attr("class", "small");

    sizeLegend
      .append("text")
      .attr("x", 50)
      .attr("y", 90)
      .text("25")
      .attr("class", "small");

    sizeLegend
      .append("text")
      .attr("x", 50)
      .attr("y", 135)
      .text("1")
      .attr("class", "small");
    

    const selection_details = d3.select("#selection_details");

    const click = (event, d) => { 

      selection_details.html("");
      selection_details.append("h1").text(`Selected keyword: ${d.id}`);
      selection_details.append("h2").text(`Number of associated publications: ${d.weight}`);
      Object.values(data).forEach((obj) => {
        const keywordsArray = obj.keywords.split(',').map(keyword => keyword.trim());
        if (keywordsArray.includes(d.id)){
          selection_details.append("p").text(`${obj.author}: ${obj.title} (${obj.year}).`);
          //console.log(obj.title + " " + obj.keywords);
        }
      });
      node.style("opacity", (nodeData) => {
        return nodeData.id === d.id ? 1 : 0.7; 
      });
      //console.log(d.id);
    }

    node.on("click", click);

  });
};
