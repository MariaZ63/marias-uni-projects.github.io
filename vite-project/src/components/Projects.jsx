import { descriptions } from "../descriptions";
import Project from "./Project";

const Projects = () => {
  return (
    <>
      {descriptions.map((elem, i) => {
        if (i < descriptions.length - 1) {
          return (
            <>
              <Project key={i} content={elem} />
              <hr />
            </>
          );
        }
        return <Project key={i} content={elem} />;
      })}
    </>
  );
};
export default Projects;
