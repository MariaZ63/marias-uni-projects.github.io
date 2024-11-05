import { useData } from "../DataProvider";
import CharacterStanding from "../assets/images/character_standing.png";
import CatImage from "../assets/images/cat_playing.png";
import CatImage_1 from "../assets/images/cat_resting.png";
import book_BackToTheFuture from "../assets/images/book_BackToTheFuture.png";
import book_PublishingPatterns from "../assets/images/book_PublishingPatterns.png";
import book_ReadAroundTheWorld from "../assets/images/book_ReadAroundTheWorld.png";
import book_TaleOfTime from "../assets/images/book_TaleOfTime.png";
import { useState } from "react";

/**
 * Navigation component for selecting books and displaying related content.
 *
 * @param {Object} props - The props for the Navigation component.
 * @param {number} props.index - The current chapter index.
 * @param {Array<string>} props.config - An array of components currently configured.
 * @param {Function} props.setConfig - Function to update the configured components.
 * @param {Function} props.setShowQuestion - Function to control the visibility of the question feature.
 *
 * @returns {JSX.Element} The rendered Navigation component.
 */
const Navigation = ({ index, config, setConfig, setShowQuestion }) => {
  const { apiResponse } = useData();
  const [visibility, setVisibility] = useState(true);

  /**
   * Adds a component to the configuration if not already included.
   *
   * @param {string} componentName - The name of the component to add.
   */
  const addComponent = (componentName) => {
    if (!config.includes(componentName)) {
      setConfig([...config, componentName]);
      setVisibility(false);
    }
  };

  /**
   * Renders the initial navigation based on chapter count.
   *
   * @param {Object} props - The props for the initial navigation.
   * @param {Object} props.apiResponse - The API response containing assessment information.
   * @param {number} props.chapterCount - The count of chapters explored.
   * @returns {JSX.Element|null} The rendered initial navigation or null if no content is to be displayed.
   */
  const InitialNav = ({ apiResponse, chapterCount }) => {
    if ((apiResponse && chapterCount === 0) || chapterCount === 4) {
      return (
        <>
          <div className="col-md-auto">
            <div className="comic-panel">
              <svg width="470" height="400">
                <image
                  href={CharacterStanding}
                  width="100%"
                  height="340px"
                  x="-190"
                  y="65"
                />
                <image
                  href={CatImage}
                  width="100%"
                  height="270px"
                  x="130"
                  y="210"
                />
                <foreignObject x="105" y="15" width="430" height="400">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div className="bubble">
                      {chapterCount === 0 && (
                        <>
                          {apiResponse.assessment} <br />
                          {visibility && (
                            <>
                              But let's take a closer look.&nbsp;
                              <b>
                                Select one of the books to explore different
                                aspects of your reading data.
                              </b>
                            </>
                          )}
                        </>
                      )}
                      {chapterCount === 4 && (
                        <>
                          <b>
                            Congrats, you explored all books on your reading
                            data!
                          </b>
                          <br />
                          {visibility && (
                            <>
                              Click the button to finish.
                              <br />
                              <div>
                                <button
                                  className="btn btn-primary m-1"
                                  onClick={() => {
                                    setVisibility(false);
                                    setShowQuestion(true);
                                    setTimeout(() => {
                                      const element = document.getElementById("questionFeature");
                                      if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                      }
                                    }, 0);
                                  }}
                                >
                                  Finish
                                </button>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </foreignObject>
              </svg>
            </div>
          </div>
        </>
      );
    }
    if (chapterCount >= 1 && chapterCount <= 3 && visibility) {
      return (
        <>
          <div className="col-md-auto">
            <div className="comic-panel">
              <svg width="500" height="400">
                <image
                  href={CharacterStanding}
                  width="100%"
                  height="340px"
                  x="-190"
                  y="65"
                />
                <image
                  href={CatImage_1}
                  width="100%"
                  height="270px"
                  x="130"
                  y="210"
                />
                <foreignObject x="125" y="15" width="430" height="400">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div className="bubble">
                      <b>You explored {chapterCount} out of 4 books.</b> <br />
                      Select another book if you want to continue, or click the
                      button to finish. <br />
                      <button
                        className="btn btn-primary m-1"
                        onClick={() => {
                          setVisibility(false);
                          setShowQuestion(true);
                        }}
                      >
                        Finish
                      </button>
                    </div>
                  </div>
                </foreignObject>
              </svg>
            </div>
          </div>
        </>
      );
    }
    return null;
  };


  /**
   * Renders the book selection interface.
   *
   * @returns {JSX.Element} The rendered book selection interface.
   */
  const SelectBook = () => {
    return (
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg width="710" height="400">
            <g opacity={config.includes("BackToTheFuture") ? "50%" : "100%"}>
              <image
                href={book_BackToTheFuture}
                width="100%"
                height="250px"
                x="-270"
                y="0"
              />

              <foreignObject x="150" y="40" width="200" height="300">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  <b>Back to the Future</b>
                  <br />
                  Peek into your reading future with a look at your reading wishlist, and more recommendations.
                </div>
              </foreignObject>
            </g>
            <g opacity={config.includes("PublishingPatterns") ? "50%" : "100%"}>
              <image
                href={book_PublishingPatterns}
                width="100%"
                height="220px"
                x="60"
                y="15"
              />

              <foreignObject x="480" y="40" width="200" height="300">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  <b>Publishing Patterns</b>
                  <br />
                  Uncover hidden trends in your reading history, like author gender, genres or publication years.
                </div>
              </foreignObject>
            </g>
            <g opacity={config.includes("ReadAroundTheWorld") ? "50%" : "100%"}>
              <image
                href={book_ReadAroundTheWorld}
                width="100%"
                height="240px"
                x="-260"
                y="195"
              />

              <foreignObject x="155" y="230" width="190" height="300">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  <b>Read around the World</b>
                  <br />
                  Find out where your reading adventures have taken you and find new destinations.
                </div>
              </foreignObject>
            </g>
            <g opacity={config.includes("TaleOfTime") ? "50%" : "100%"}>
              <image
                href={book_TaleOfTime}
                width="100%"
                height="270px"
                x="50"
                y="175"
              />

              <foreignObject x="480" y="230" width="200" height="300">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  <b>Tale of Time</b>
                  <br />
                  Travel through time with an interactive timeline of your reading adventures.
                </div>
              </foreignObject>
            </g>
            {/* Interactive elements for navigation */}
            <rect
              opacity="0"
              x="20"
              y="40"
              width="320"
              height="150"
              onClick={() => {
                addComponent("BackToTheFuture");
                setTimeout(() => {
                  const element = document.getElementById("backToTheFuture");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 0);
              }}
              className="interactive"
            ></rect>
            <rect
              opacity="0"
              x="350"
              y="40"
              width="340"
              height="160"
              onClick={() => {
                addComponent("PublishingPatterns");
                setTimeout(() => {
                  const element = document.getElementById("publishingPatterns");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 0);
              }}
              className="interactive"
            ></rect>
            <rect
              opacity="0"
              x="20"
              y="230"
              width="320"
              height="150"
              onClick={() => {
                addComponent("ReadAroundTheWorld");
                setTimeout(() => {
                  const element = document.getElementById("readAroundTheWorld");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 0);
              }}
              className="interactive"
            ></rect>
            <rect
              opacity="0"
              x="350"
              y="230"
              width="320"
              height="150"
              onClick={() => {
                addComponent("TaleOfTime");
                setTimeout(() => {
                  const element = document.getElementById("taleOfTime");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 0);
              }}
              className="interactive"
            ></rect>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="row" id="navigation">
        <InitialNav apiResponse={apiResponse} chapterCount={index} />

        {visibility && index <= 3 && <SelectBook />}
      </div>
    </>
  );
};

export default Navigation;
