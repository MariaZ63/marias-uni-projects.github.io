import { useState } from "react";
import CharacterImage from "../../assets/images/character_book.png";
import CharacterImageWithCat from "../../assets/images/character_cat_2.png";
import RainImage from "../../assets/images/rain.jpg";
import LightningImage from "../../assets/images/lightning.jpg";
import HouseImage from "../../assets/images/house.jpg";
import LibraryImage from "../../assets/images/library.jpg";
import Welcome from "./Welcome";

const FictionalIntro = ({ setContent }) => {
  const [name, setName] = useState(""); // State for form entry
  const [nextPanel, setNextPanel] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNextPanel(true);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-auto">
          <div className="comic-panel">
            <svg
              viewBox="0 0 250 250"
              width="250"
              height="250"
              overflow="visible"
            >
              <image href={RainImage} width="100%"></image>
            </svg>

            <div className="comic-text top-left">
              Somewhere, on a rainy summer day ...
            </div>
          </div>
        </div>
        <div className="col-md-auto">
          <div className="comic-panel">
          <svg
              viewBox="0 0 250 250"
              width="250"
              height="250"
              overflow="visible"
            >
              <image href={LightningImage} width="100%"></image>
            </svg>

          </div>
        </div>
        <div className="col-md-auto">
          <div className="comic-panel"
          >
            <svg
              viewBox="0 0 350 250"
              width="350"
              height="250"
              overflow="visible"
            >
              <image href={HouseImage} width="100%"></image>
            </svg>


          </div>
        </div>
        <div className="col-md-auto">
          <div className="comic-panel">
          <svg
              viewBox="0 0 250 250"
              width="250"
              height="250"
              overflow="visible"
            >
              <image href={LibraryImage} width="100%"></image>
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
              <image
                href={CharacterImage}
                width="100%"
                height="300px"
                x="-50"
                y="75"
              />
              <foreignObject x="120" y="35" width="160" height="200">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  <div className="bubble">Hello! I didn't see you there.</div>
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
              <image
                href={CharacterImageWithCat}
                width="100%"
                height="300px"
                x="-100"
                y="75"
              />
              <foreignObject x="150" y="35" width="170" height="150">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  <div className="bubble">
                    I'm Rose and this is Archie. What&apos;s your name?
                  </div>
                </div>
              </foreignObject>
              <foreignObject x="150" y="150" width="100" height="250">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width: "100%", height: "100%" }}
                >
                  {!nextPanel && (
                    <form onSubmit={handleSubmit} style={{ padding: "5px" }}>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="form-control m-1"
                        value={name}
                        onChange={handleChange}
                      />
                      <button type="submit" className="btn btn-primary m-1">
                        Submit
                      </button>
                    </form>
                  )}
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

        {nextPanel && <Welcome data={name} setContent={setContent} />}
      </div>
    </>
  );
};

export default FictionalIntro;
