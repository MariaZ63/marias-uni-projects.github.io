const Project = (param) => `
        <div id=${param.name}>
            <h3>${param.title}</h3>
            <div>${param["Long description"]}</div>
            <div><b>Acquired skills:</b> ${param["Acquired skills"].map((e, i) => {
    if (i < param["Acquired skills"].length - 1) {
      return `${e} · `;
    }
    return `${e} `;
  }).join("")}
            </div>
            <div><b>Timeframe:</b> ${param.timeframe}</div>
            <a href="projects/${param.link}" class="btn btn-primary m-1">View the project</a>
        </div>
    `;
export default Project;
