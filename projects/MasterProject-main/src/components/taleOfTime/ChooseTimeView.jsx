import { useState } from "react";
import CharacterImage from "../../assets/images/character_squatting.png";
import BooksPerYear from "./BooksPerYear";
import PagesPerYear from "./PagesPerYear";

/**
 * ChooseTimeView component provides an interactive interface for users to 
 * select between viewing their reading statistics in terms of books or 
 * pages read per year. It uses state management to toggle between two 
 * panels: BooksPerYear and PagesPerYear.
 *
 * - The component displays a character image and prompts the user to choose 
 *   their preferred overview.
 * - Users can switch views by clicking on the corresponding buttons, which 
 *   update the displayed component.
 *
 * @returns {JSX.Element} The rendered ChooseTimeView component.
 */
const ChooseTimeView = () => {
  const [showPanel, setShowPanel] = useState("A");

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 360 400"
            width="360"
            height="400"
            overflow="visible"
          >
            <image
              href={CharacterImage}
              width="100%"
              height="300px"
              x="-100"
              y="120"
            />
            <foreignObject x="125" y="15" width="280" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">
                  Let&apos;s take a look at your reading stats. You can switch
                  between an overview of the books or the pages read:
                  <div>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => setShowPanel("A")}
                    >
                      Books/year
                    </button>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => setShowPanel("B")}
                    >
                      Pages/year
                    </button>
                  </div>
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
      {showPanel === "A" && <BooksPerYear />}
      {showPanel === "B" && <PagesPerYear />}
    </>
  );
};

export default ChooseTimeView;
