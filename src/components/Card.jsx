import { Link } from "react-router-dom";

import datacomic from "../assets/datacomic.png";
import graph from "../assets/graph.png";
import iBooks from "../assets/scatterplot.png";
import scatterplot from "../assets/scatterplot.png"
import SPA from "../assets/SPA.png";

const images = {
  datacomic,
  graph,
  iBooks,
  scatterplot,
  SPA
};

const Card = (param) => {
  const imageName = param.content["name"];
  const image = images[imageName];

  return (
    <div className="col-md-4 col-sm-12 card-div">
      <div className="card h-100">
        <img
          src={image}
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

