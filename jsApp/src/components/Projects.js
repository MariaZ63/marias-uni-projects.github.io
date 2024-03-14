import descriptions from "../descriptions";
import Project from "./Project";

const Projects = () => `
      ${descriptions.map((elem, i) => {
    if (i < descriptions.length - 1) {
      return `
              ${Project(elem)}
              <hr />
            `;
    }
    return Project(elem);
  }).join("")}
    `;
export default Projects;
