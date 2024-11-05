import CharacterImage from "../../assets/images/character_standing.png";

/**
 * PagesPerYearExplanation component displays a visual explanation of the 
 * total number of pages read and the estimated time spent reading based 
 * on the provided page data. It calculates the total pages and time spent 
 * using average reading metrics, presenting the information in a visually 
 * appealing format with an accompanying character image.
 *
 * @param {Object} pageData - The data containing page count information.
 * @returns {JSX.Element} The rendered PagesPerYearExplanation component.
 */
const PagesPerYearExplanation = ({ pageData }) => {
  const getTotalNumberOfPages = (data) => {
    let result = 0;
    data.forEach((d) => {
      result += d.count;
    });
    return result;
  };
  const totalNumberOfPages = getTotalNumberOfPages(pageData);

  const getTotalTimeSpent = (pages) => {
    const minutes = pages * 3.2;
    const hours = Math.round(minutes / 60);
    return hours;
  };

  const totalTimeSpent = getTotalTimeSpent(totalNumberOfPages);

  return (
    <>
      <div className="col-md-auto">
        <div className="comic-panel">
          <svg
            viewBox="0 0 310 400"
            width="310"
            height="400"
            overflow="visible"
          >
            <image
              href={CharacterImage}
              width="100%"
              height="305px"
              x="-130"
              y="150"
            />
            <foreignObject x="70" y="5" width="290" height="350">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ width: "100%", height: "100%" }}
              >
                <div className="bubble">
                  In total, you read <b>{totalNumberOfPages}</b> pages. The
                  average reader can read 250 words per minute and the average
                  book has approximately 800 words per page. Therefore, it would
                  take 3 minutes and 12 seconds to read one page.* <br />
                  This means that you spent roughly <b>{totalTimeSpent}</b>{" "}
                  hours reading!
                </div>
              </div>
            </foreignObject>
          </svg>
          <div className="comic-text bottom-right" style={{ fontSize: "17px" }}>
            *click&nbsp;
            <a
              href="https://catalog.shepherd.edu/mime/media/12/913/SU+Credit+Hour+Policy+Appendix+B.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            &nbsp;to see the source
          </div>
        </div>
      </div>
    </>
  );
};

export default PagesPerYearExplanation;
