import { useState } from "react";
import CharacterImage from "../../assets/images/character_sitting.png";
import Question from "./Question";
import Outro from "../outro/Outro";

/**
 * QuestionFeature component presents a prompt to users asking if they have 
 * any remaining questions. Depending on the user's response, it either 
 * displays a question component or an outro component.
 *
 * - Displays a character image along with a question bubble.
 * - Provides "Yes" and "No" buttons for user interaction.
 * - Smoothly scrolls to the relevant section based on user choice:
 *   - Clicking "Yes" shows the Question component.
 *   - Clicking "No" shows the Outro component.
 *
 * @returns {JSX.Element} The rendered QuestionFeature component.
 */
const QuestionFeature = () => {
  const [question, setQuestion] = useState(false);
  const [outro, setOutro] = useState(false);
  return (
    <>
      <div className="row">
        {!question && !outro && (
          <div className="col-md-auto" id="questionFeature">
            <div className="comic-panel">
              <svg
                viewBox="0 0 400 300"
                width="400"
                height="300"
                overflow="visible"
              >
                <image
                  href={CharacterImage}
                  width="100%"
                  height="300px"
                  x="-100"
                  y="55"
                />
                <foreignObject x="155" y="15" width="250" height="300">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div className="bubble">
                      Do you have any remaining questions?
                      <br />
                      <button
                        className="btn btn-primary m-1"
                        onClick={() => {
                          setQuestion(true);
                          setTimeout(() => {
                            const element = document.getElementById("question");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 0);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-primary m-1"
                        onClick={() => {
                          setOutro(true);
                          setTimeout(() => {
                            const element = document.getElementById("outro");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 0);
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </foreignObject>
              </svg>
            </div>
          </div>
        )}
        {question && <Question />}
        {outro && <Outro />}
      </div>
    </>
  );
};
export default QuestionFeature;
