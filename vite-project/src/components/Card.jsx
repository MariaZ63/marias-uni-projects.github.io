import { Link } from "react-router-dom";

const Card = (param) => {
  console.log(`${param.content["link"]}`);
  return (
    <div className="col-md-4 col-sm-12 card-div">
      <div className="card h-100">
        <img
          src={`../../assets/${param.content["name"]}.png`}
          className="card-img-top"
          alt={`${param.content["image"]} image`}
        />
        <div className="card-body">
          <h5 className="card-title">{param.content["title"]}</h5>
          <p className="card-text">{param.content["Short description"]}</p>
          <Link to={`projects#${param.content["name"]}`} className="btn btn-primary">Details</Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
