import Gender from "./Gender";
import Genres from "./Genres";
import PublicationYears from "./PublicationYears";
import Logo from "../../assets/images/PublishingPatterns_Logo.png"

/**
 * PublishingPatterns component is responsible for displaying various 
 * publishing statistics related to reading behavior. It includes sections 
 * for gender representation, genre preferences, and publication years of books.
 *
 * - Displays a header with a logo and title.
 * - Integrates child components: 
 *   - `Gender`: Displays statistics related to gender representation in reading.
 *   - `Genres`: Presents genre preferences among readers.
 *   - `PublicationYears`: Shows the publication years of books read.
 *
 * @returns {JSX.Element} The rendered PublishingPatterns component.
 */
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
