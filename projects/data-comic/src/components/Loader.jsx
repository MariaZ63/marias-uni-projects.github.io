import CatImage from "../assets/images/cat_sleeping_big.png";

const Loader = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
      <img src={CatImage} alt="Sleeping Cat" style={{ width: "200px" }} />
      <div className="loader" style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default Loader;
