import { useData } from "../../DataProvider";
import CharacterImage from "../../assets/images/character_cat_1.png";
import HouseImage from "../../assets/images/house_after_rain.png";
import RainbowImage from "../../assets/images/rainbow.png";

const FictionalOutro = () => {
  const { apiResponse } = useData();
  return (
    <>
      <div className="col-md-auto" id="outro">
        <div className="comic-panel">
          <svg
            viewBox="0 0 450 300"
            width="450"
            height="300"
            overflow="visible"
          >
            <image
              href={CharacterImage}
              width="100%"
              height="300px"
              x="-100"
              y="35"
            />
            <foreignObject x="195" y="15" width="300" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">
                  It looks like the rain has passed.{" "}
                  {apiResponse.factual_farewell} Feel free to come back any
                  time.
                </div>
              </div>
            </foreignObject>
          </svg>
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
            <image href={HouseImage} height="100%" />
          </svg>
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
            <image href={RainbowImage} width="100%" />
          </svg>
          <div className="comic-text bottom-right">The end.</div>
        </div>
      </div>
    </>
  );
};

export default FictionalOutro;
