import CharacterImage from "../assets/images/character_book.png";
import Loader from "./Loader";
const BookRecommendation = ({ recommendation }) => {
  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 610 400"
            width="610"
            height="400"
            overflow="visible"
          >
            {recommendation === "loading" ? (
              <foreignObject x="0" y="0" width="500" height="400">
                <Loader />
              </foreignObject>
            ) : (
              <>
                <image
                  href={CharacterImage}
                  width="100%"
                  height="320px"
                  x="-200"
                  y="165"
                />
                <foreignObject x="140" y="15" width="450" height="350">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div className="bubble">{recommendation}</div>
                  </div>
                </foreignObject>
              </>
            )}
          </svg>
        </div>
      </div>
    </>
  );
};
export default BookRecommendation;
