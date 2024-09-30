import Gender from "./Gender";
import Genres from "./Genres";
import PublicationYears from "./PublicationYears";
import Logo from "../../assets/images/PublishingPatterns_Logo.png"

const PublishingPatterns = () => {
  return (
    <>
      <div
        className="row pb-2 mt-3 rounded"
        id="publishingPatterns"
        style={{ backgroundColor: "#5A7C7D" }}
      >
        <div
          className="mt-2 ml-2"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={Logo} height="50px" />
          <h3 style={{ marginLeft: "10px" }}>
            <b>Publishing Patterns</b>
          </h3>
        </div>
        <div className="row">
          <Gender />
          <Genres />
          <PublicationYears />
        </div>
      </div>
    </>
  );
};

export default PublishingPatterns;
