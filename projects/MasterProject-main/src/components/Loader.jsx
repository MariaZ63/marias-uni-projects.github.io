import CatImage from "../assets/images/cat_sleeping_big.png";

/**
 * Loader component that displays a loading animation and an image
 * of a sleeping cat while content is being fetched.
 *
 * The component centers its content vertically and horizontally
 * and provides a visual indication that the application is loading.
 *
 * @returns {JSX.Element} The rendered Loader component.
 */
const Loader = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
      <img src={CatImage} alt="Sleeping Cat" style={{ width: "200px" }} />
      <div className="loader" style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default Loader;
