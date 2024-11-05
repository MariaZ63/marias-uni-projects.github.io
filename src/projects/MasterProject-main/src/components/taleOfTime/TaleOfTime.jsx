import ChooseTimeView from "./ChooseTimeView";
import Logo from "../../assets/images/TaleOfTime_Logo.png";

/**
 * TaleOfTime component serves as the main entry point for the application,
 * featuring a title and logo along with the ChooseTimeView component.
 * It provides a styled container that encapsulates the logo and the 
 * time selection interface, enhancing the visual aspect of the application.
 *
 * @returns {JSX.Element} The rendered TaleOfTime component.
 */
const TaleOfTime = () => {
  return (
    <>
      <div className="row pb-2 mt-3 rounded" id="taleOfTime" style={{ backgroundColor: "#3160C7" }}>
      <div
          className="mt-2 ml-2"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={Logo} height="50px" />
          <h3 style={{ marginLeft: "10px" }}>
            <b>The Tale of Time</b>
          </h3>
        </div>
        <div className="row">
          <ChooseTimeView />
        </div>
      </div>
    </>
  );
};

export default TaleOfTime;
