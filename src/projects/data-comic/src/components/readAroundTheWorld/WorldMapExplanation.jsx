import CharacterImage from "../../assets/images/character_pointing.png";

const WorldMapExplanation = ({ data }) => {

  const getTopThree = (data) => {
    const filteredData = Object.entries(data).filter(
      ([key]) => key !== "unknown"
    );

    // Step 2: Sort the entries by their values in descending order
    const sortedData = filteredData.sort(
      ([, valueA], [, valueB]) => valueB - valueA
    );
    // Step 3: Select the top three entries
    const topThree = sortedData.slice(0, 3);

    return topThree;
  };

  const topThreePairs = getTopThree(data);

  return (
    <>
    <div className="col-md-auto">
      <div className="comic-panel">
        <svg viewBox="0 0 420 400" width="420" height="400" overflow="visible">
          <image
            href={CharacterImage}
            width="100%"
            height="380px"
            x="-120"
            y="55"
          />
          <foreignObject x="155" y="15" width="300" height="300">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ width: "100%", height: "100%" }}
            >
                <div className="bubble">
                    It looks like your top three countries are <b>{topThreePairs[0][0]}</b> with <b>{topThreePairs[0][1]}</b> books, <b>{topThreePairs[1][0]}</b> with <b>{topThreePairs[1][1]}</b> books and <b>{topThreePairs[2][0]}</b> with <b>{topThreePairs[2][1]}</b> books. <br/>
                    {data["unknown"] || 0} books could not be assigned to a country.  
                </div>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>    
    </>
  );
};

export default WorldMapExplanation;
