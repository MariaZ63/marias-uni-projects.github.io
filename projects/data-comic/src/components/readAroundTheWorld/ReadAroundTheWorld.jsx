import Languages from "./Languages";
import WorldMap from "./WorldMap";
import Logo from "../../assets/images/ReadAroundTheWorld_Logo.png";

const ReadAroundTheWorld = () => {
  return (
    <>
      <div
        className="row pb-2 mt-3 rounded"
        id="readAroundTheWorld"
        style={{ backgroundColor: "#368C6A" }}
      >
        <div
          className="mt-2 ml-2"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={Logo} height="50px" />
          <h3 style={{ marginLeft: "10px" }}>
            <b>Read around the World</b>
          </h3>
        </div>
        <div className="row">
          <WorldMap />
          <Languages />
        </div>
      </div>
    </>
  );
};

export default ReadAroundTheWorld;
