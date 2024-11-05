import { useState } from "react";
import CharacterImage from "../../assets/images/character_sitting.png";
import Answer from "./Answer";

/**
 * Question component allows users to submit a question. It captures the user's input,
 * displays the submitted question back to the user, and renders an Answer component
 * with the submitted question.
 *
 * - Displays a character image and a bubble for interaction.
 * - Provides a text area for user input and a submit button.
 * - On submission, displays the entered question.
 * - Handles submission via both button click and "Enter" key press.
 *
 * @returns {JSX.Element} The rendered Question component.
 */
const Question = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer(true);
  };

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {  // Check if "Enter" is pressed and Shift is not
      e.preventDefault(); // Prevents adding a new line
      handleSubmit(e); // Manually trigger form submission
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-auto" id="question">
          <div className="comic-panel">
            <svg
              viewBox="0 0 400 400"
              width="400"
              height="400"
              overflow="visible"
            >
              <image
                href={CharacterImage}
                width="100%"
                height="300px"
                x="-100"
                y="145"
              />
              <foreignObject x="155" y="15" width="230" height="300">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  <div className="bubble">
                    {answer
                      ? `You asked: "${question}"`
                      : "Enter your question here:"}
                  </div>
                  {!answer && (
                    <>
                      <form onSubmit={handleSubmit}>
                        <textarea
                          className="form-control"
                          value={question}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown} 
                        ></textarea>
                        <button type="submit" className="btn btn-primary m-1">
                          Submit
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>
        {answer && <Answer question={question} />}
      </div>
    </>
  );
};
export default Question;
