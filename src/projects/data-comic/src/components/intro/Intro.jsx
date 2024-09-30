import { useData } from "../../DataProvider";
import FactualIntro from "./FactualIntro";
import FictionalIntro from "./FictionalIntro";

const Intro = ({ setContent }) => {
  const { apiResponse, error } = useData();

  if (apiResponse) {
    if (apiResponse.categorization === "fictional") {
      return <FictionalIntro setContent={setContent} />;
    } else if (apiResponse.categorization === "factual") {
      console.log("rendering factual intro");
      return <FactualIntro setContent={setContent} />;
    } else {
      return (
        <>
          <svg
            viewBox="0 0 400 300"
            width="400"
            height="300"
            overflow="visible"
          >
            <foreignObject x="30" y="30" width="400" height="200">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="alert alert-danger">
                  Sorry, an error ocurred! Please try reloading the page.
                </div>
              </div>
            </foreignObject>
          </svg>
        </>
      );
    }
  } else if (error) {
    return (
      <>
        <svg viewBox="0 0 400 300" width="400" height="300" overflow="visible">
          <foreignObject x="30" y="30" width="400" height="200">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ width: "100%", height: "100%" }}
            >
              <div className="alert alert-danger">
                Sorry, an error ocurred! Please try reloading the page.
              </div>
            </div>
          </foreignObject>
        </svg>
      </>
    );
  }
};

export default Intro;
