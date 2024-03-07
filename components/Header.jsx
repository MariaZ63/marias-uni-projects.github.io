import { NavLink } from "react-router-dom";
import Zieglmeier from "../assets/Zieglmeier.png"

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-end py-3 mb-4 border-bottom">
      <div id="custom-header" className="col-12 m-3 text-left custom-header">
        <img
          id="custom-image" 
          className="responsive-img custom-image"
          height="200px"
          src={Zieglmeier}
          alt="Headshot of Maria"
        />
        <h1 id="header-text">MARIA ZIEGLMEIER</h1>
        <h3>UNI-PROJECTS</h3>
        <p>
          Portfolio of my web development projects <br /> Created at University
          of Bamberg
        </p>
      </div>
      <nav>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink className="nav-link" to={"/"}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/projects"}>
              Projects
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/about"}>
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
