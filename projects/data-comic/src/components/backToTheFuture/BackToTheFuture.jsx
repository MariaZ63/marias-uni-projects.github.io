import TBR from "./TBR";
import TBR_Recommendation from "./TBR_Recommendation";
import Logo from "../../assets/images/BackToTheFuture_Logo.png";

const BackToTheFuture = () => {
  return (
    <>
      <div
        className="row pb-2 mt-3 rounded"
        id="backToTheFuture"
        style={{ backgroundColor: "#F58142" }}
      >
        <div
          className="mt-2 ml-2"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={Logo} height="50px" />
          <h3 style={{ marginLeft: "10px" }}>
            <b>Back to the Future</b>
          </h3>
        </div>

        <div className="row">
          <TBR />
          <TBR_Recommendation />
        </div>
      </div>
    </>
  );
};
export default BackToTheFuture;
