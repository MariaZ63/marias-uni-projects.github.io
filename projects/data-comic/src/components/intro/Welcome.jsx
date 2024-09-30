import { useState } from "react";
import CharacterImage from "../../assets/images/character_waving.png";

const Welcome = ({ data, setContent }) => {
  const [showButton, setShowButton] = useState(true);

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 440 300"
            width="440"
            height="300"
            overflow="visible"
          >
            <image
              href={CharacterImage}
              width="100%"
              y="100"
              x="-140"
              height="230px"
            ></image>
            <foreignObject x="120" y="15" width="300" height="250">
              <div className="bubble">
                Welcome
                {data && `, ${data}`}! We received your reading data and
                analyzed it thouroughly. We found some interesting insights, do
                you want to dive in?
              </div>
            </foreignObject>
            <foreignObject x="140" y="175" width="90" height="50">
              {showButton && (
                <button
                  className="btn btn-primary m-1"
                  onClick={() => {
                    setContent(true);
                    setShowButton(false);
                    setTimeout(() => {
                      const element = document.getElementById("navigation");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 0);
                  }}
                >
                  Start
                </button>
              )}
            </foreignObject>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Welcome;
