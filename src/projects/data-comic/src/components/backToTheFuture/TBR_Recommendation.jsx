import { useState } from "react";
import { useData } from "../../DataProvider";
import BookRecommendation from "../BookRecommendation";
import CharacterImage from "../../assets/images/character_sitting.png"; 
import CatImage from "../../assets/images/cat_stretching.png";
import catImage2 from "../../assets/images/cat_belly_side.png";

const TBR_Recommendation = () => {
  const { apiResponse } = useData();
  const [showPanel, setShowPanel] = useState("");

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 500 400"
            width="500"
            height="400"
            overflow="visible"
          >
            <image
              href={CharacterImage}
              width="100%"
              height="330px"
              x="-100"
              y="120"
            />
            <image
              href={CatImage}
              width="100%"
              height="280px"
              x="-10"
              y="220"
            />
            <foreignObject x="200" y="35" width="300" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">
                  Would you rather get one more book recommendation, or advice how to
                  tackle the stack?
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowPanel("A")}
                    >
                      Recommendation
                    </button>{" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowPanel("B")}
                    >
                      Advice
                    </button>
                  </div>
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
      {showPanel === "A" && (
        <BookRecommendation
          recommendation={apiResponse.personalized_recommendation}
        />
      )}
      {showPanel === "B" && (
        <BookRecommendation recommendation={apiResponse.TBR_tip} />
      )}
      {showPanel === "" && <div className="col-md-auto">
          <svg
            viewBox="0 0 400 400"
            width="400"
            height="400"
            overflow="visible"
          >
            <image
              href={catImage2}
              width="100%"
              height="350px"
              x="-70"
              y="170"
            />
          </svg>
        </div>}
    </>
  );
};

export default TBR_Recommendation;
