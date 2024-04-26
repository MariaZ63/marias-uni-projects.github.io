import { useEffect, useState } from "react";
import * as d3 from "d3";
import NotImplemented from "./NotImplemented";

const Panel02 = ({ data }) => {
  const [country, setCountry] = useState(""); // State for form entry
  const [lifeExpectancy, setLifeExpectancy] = useState(null); // State for life expectancy
  const [nextPanel, setNextPanel] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await d3.csv("life-expectancy.csv");
        const worldData = csvData.filter((row) => row.Entity === "World");
        const yearData = worldData.find((row) => row.Year == data);
        if (yearData) {
          const lifeExpectancy =
            yearData["Period life expectancy at birth - Sex: all - Age: 0"];
          setLifeExpectancy(lifeExpectancy);
        } else {
          setLifeExpectancy(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (data) {
      fetchData();
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted country:", country);
    setNextPanel(true);
  };

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <>
      <svg viewBox="0 0 400 850" width="400" height="850" overflow="visible">
        <foreignObject x="10" y="10" width="400" height="850">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ width: "100%", height: "100%" }}
          >
            <div>
              The worldwide average life expectancy for people that were born in{" "}
              <b>{data}</b> is <b>{lifeExpectancy}</b> years.
              <iframe
                src="https://ourworldindata.org/grapher/life-expectancy?country=~OWID_WRL&tab=chart"
                loading="lazy"
                style={{ width: "100%", height: "600px", border: "0px none" }}
              ></iframe>
              <br />
              However, life expectancy depends greatly of the country you are
              living in. Where do you live?
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Country"
                className="form-control m-1"
                value={country}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary m-1">
                Submit
              </button>
            </form>
          </div>
        </foreignObject>
      </svg>
      {nextPanel ? <NotImplemented data={country} /> : <></>}
    </>
  );
};

export default Panel02;
