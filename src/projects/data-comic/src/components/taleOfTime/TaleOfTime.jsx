import ChooseTimeView from "./ChooseTimeView";
import Logo from "../../assets/images/TaleOfTime_Logo.png";

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
