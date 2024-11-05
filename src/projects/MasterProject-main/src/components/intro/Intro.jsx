import { useData } from "../../DataProvider";
import FactualIntro from "./FactualIntro";
import FictionalIntro from "./FictionalIntro";

/**
 * Intro component displays an introductory section based on the data categorization.
 *
 * The component checks the categorization of the API response and renders
 * an appropriate introductory component (`FictionalIntro` or `FactualIntro`).
 * If an error occurs or if the categorization is not recognized, an error message is displayed.
 * 
 * @param {Object} props - The component props.
 * @param {function} props.setContent - Function to set content in the parent component.
 * @returns {JSX.Element} The rendered Intro component.
 */

const Intro = ({ setContent }) => {
  const { apiResponse, error } = useData();

  if (apiResponse) {
    if (apiResponse.categorization === "fictional") {
      return <FictionalIntro setContent={setContent} />;
    } else if (apiResponse.categorization === "factual") {
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
