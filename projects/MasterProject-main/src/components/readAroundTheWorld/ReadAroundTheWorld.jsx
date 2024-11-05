import Languages from "./Languages";
import WorldMap from "./WorldMap";
import Logo from "../../assets/images/ReadAroundTheWorld_Logo.png";

/**
 * ReadAroundTheWorld component serves as the main container for the
 * "Read Around the World" feature of the application. It displays a 
 * title with a logo and includes two main components: 
 * `WorldMap` for visualizing books read by country and `Languages` 
 * for displaying available languages.
 *
 * - Displays a logo and title for the feature.
 * - Integrates the `WorldMap` component, which visualizes data about 
 *   books read from different countries.
 * - Integrates the `Languages` component, likely providing language 
 *   options or information relevant to the reading data.
 *
 * @returns {JSX.Element} The rendered ReadAroundTheWorld component.
 */
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
