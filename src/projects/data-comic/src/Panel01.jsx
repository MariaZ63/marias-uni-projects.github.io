import { useState } from "react";
import CharacterImage from "./assets/Character.png";
import Panel02 from "./Panel02";

const Panel01 = () => {
  const [birthYear, setBirthYear] = useState(""); // State for form entry
  const [nextPanel, setNextPanel] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted birth year:", birthYear);
    setNextPanel(true);
  };

  const handleChange = (e) => {
    setBirthYear(e.target.value);
  };

  return (
    <>
      <svg viewBox="0 0 400 300" width="400" height="300" overflow="visible">
        <image href={CharacterImage} width="100%" height="300px" />
        <foreignObject x="220" y="35" width="150" height="200">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ width: "100%", height: "100%" }}
          >
            <div>When were you born?</div>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                min="1950"
                placeholder="Your birthyear"
                max="2024"
                className="form-control m-1"
                value={birthYear}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary m-1">
                Submit
              </button>
            </form>
          </div>
        </foreignObject>
      </svg>
      {nextPanel ? <Panel02 data={birthYear} /> : <></>}
    </>
  );
};

export default Panel01;
