import { useState } from "react";
import CharacterImage from "../../assets/images/character_waving.png";
import CharacterImageWithCat from "../../assets/images/character_cat_2.png";
import CharacterImage2 from "../../assets/images/character_walking.png";

/**
 * FactualIntro component displays an introductory section of a data comic,
 * inviting users to engage with their reading data.
 *
 * @param {Object} props - Component properties.
 * @param {function} props.setContent - Function to toggle content visibility in the parent component.
 *
 * @returns {JSX.Element} The rendered component containing comic panels and character dialogues.
 */
const FactualIntro = ({ setContent }) => {
  const [showButton, setShowButton] = useState(true);

  return (
    <>
      <div className="row">
        <div className="col-md-auto">
          <div className="comic-panel">
            <svg
              viewBox="0 0 350 300"
              width="350"
              height="300"
              overflow="visible"
            >
              <image
                href={CharacterImage}
                width="100%"
                y="100"
                x="-20"
                height="230px"
              ></image>
            </svg>
            <div className="comic-text top-left me-2">
              Welcome! This data comic offers you a personalized insight into
              your reading data.
            </div>
          </div>
        </div>

        <div className="col-md-auto">
          <div className="comic-panel">
            <svg
              viewBox="0 0 490 300"
              width="490"
              height="300"
              overflow="visible"
            >
              <image
                href={CharacterImageWithCat}
                width="100%"
                height="300px"
                x="-10"
                y="75"
              />
              <foreignObject x="20" y="45" width="200" height="150">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  <div className="simpleBubble">
                    <b>Archie</b> is always up to mischief. But sometimes, he
                    has useful tips.
                  </div>
                </div>
              </foreignObject>
              <foreignObject x="320" y="145" width="200" height="150">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  <div className="simpleBubble">
                    <b>Rose</b> studied your data closely and will explain the
                    insights to you.
                  </div>
                </div>
              </foreignObject>
            </svg>
            <div className="comic-text top-left me-2">
              The two comic characters will lead you through the story.
            </div>
          </div>
        </div>
        <div className="col-md-auto">
          <div className="comic-panel">
            <svg
              viewBox="0 0 300 300"
              width="300"
              height="300"
              overflow="visible"
            >
              <image
                  href={CharacterImage2}
                  width="100%"
                  height="300px"
                  x="-110"
                  y="28"
                  transform="scale(-1 1) translate(-130 -4)"
                />
              <foreignObject x="115" y="55" width="220" height="200">
                <div className="bubble">
                  Are you ready to start?
                </div>
                {showButton && (
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => {
                      setContent(true);
                      setShowButton(false);
                    }}
                  >
                    Start
                  </button>
                )}
              </foreignObject>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default FactualIntro;
