import { useData } from "../../DataProvider";
import CharacterImage from "../../assets/images/character_cat_1.png"; 
import CharacterImage2 from "../../assets/images/character_standing.png";
const FactualOutro = () => {
  const { apiResponse } = useData();

  return (
    <>
    <div className="row" id="outro">
      <div className="col-md-auto">
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
          </svg>
          <div className="comic-text top-right ms-1">
            You have reached the end of this data comic. Hopefully, you enjoyed this format!
          </div>
        </div>
      </div>
      <div className="col-md-auto">
        <div className="comic-panel">
        <svg
            viewBox="0 0 400 300"
            width="400"
            height="300"
            overflow="visible"
          >
            <image
              href={CharacterImage2}
              width="100%"
              height="300px"
              x="-100"
              y="55"
            />
            <foreignObject x="155" y="15" width="300" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">
                  {apiResponse.factual_farewell}
                </div>
              </div>
            </foreignObject>
          </svg>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default FactualOutro;
