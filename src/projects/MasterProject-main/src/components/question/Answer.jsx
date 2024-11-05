import { useState, useEffect } from "react";
import CharacterImage from "../../assets/images/character_walking.png";
import Question from "./Question";
import Outro from "../outro/Outro";
import { useData } from "../../DataProvider";
import Loader from "../Loader";
import { apiRequest } from "../../utils/apiRequest";

/**
 * Answer component receives a user's question and fetches a relevant response
 * from an API based on their reading data and behavior. It can also manage
 * user interactions, allowing them to ask another question or finish the process.
 *
 * - Displays the user's question and API response.
 * - Allows users to ask another question or finish the interaction.
 * - Maintains a chat history of previous questions and responses.
 * - Uses a loading indicator while waiting for the API response.
 *
 * @param {Object} props - The component props.
 * @param {string} props.question - The user's question to be answered.
 * @returns {JSX.Element} The rendered Answer component.
 */
const Answer = ({ question }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [outro, setOutro] = useState(false);
  const { data } = useData();
  const [apiResponse, setApiResponse] = useState(null);
  const [chatHistory, setChatHistory] = useState([]); // New state to store history

  useEffect(() => {
    const fetchData = async () => {
      try {
        const message = `Please provide an answer to this reader question about their reading data and behavior: "${question}"\n
        Please keep all the answer brief (1-2 sentences). Respond in plain text without any markup.
        ${
          chatHistory &&
          `Don't forget the content from the previous chat history when you reply: ${chatHistory}`
        }`;

        const responseContent = await apiRequest(message, data);
        //console.log(responseContent);

        // Update the chat history with the latest question and answer
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "user", content: question },
          { role: "assistant", content: responseContent },
        ]);
        //const responseContent = "Question feature is disabled for now, sorry.";

        setApiResponse(responseContent);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [question]); // Trigger fetchData on new question

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          {!apiResponse ? (
            <Loader />
          ) : (
            <>
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
                  x="-140"
                  y="125"
                  transform="scale(-1 1) translate(-130 -4)"
                />
                <foreignObject x="105" y="15" width="390" height="370">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div className="bubble">
                      {apiResponse}
                      <br />
                      {!showQuestion && !outro && (
                        <>
                          <button
                            className="btn btn-primary m-1"
                            onClick={() => {
                              setShowQuestion(true);
                              setTimeout(() => {
                                const element = document.getElementById(
                                  "question"
                                );
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }, 0);
                            }}
                          >
                            Ask another question
                          </button>
                          <button
                            className="btn btn-primary m-1"
                            onClick={() => {
                              setOutro(true);
                              setTimeout(() => {
                                const element = document.getElementById(
                                  "outro"
                                );
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }, 0);
                            }}
                          >
                            Finish
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </foreignObject>
              </svg>
            </>
          )}
        </div>
      </div>
      {showQuestion && <Question />}
      {outro && <Outro />}
    </>
  );
};

export default Answer;
