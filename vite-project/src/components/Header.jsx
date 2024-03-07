const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-end py-3 mb-4 border-bottom">
      <div id="custom-header" className="col-12 text-left custom-header">
        <img
          id="custom-image"
          className="responsive-img custom-image"
          height="200px"
          src="../../assets/images/Zieglmeier.JPG"
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
            <a
              href="index.html"
              className="nav-link active"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="projects.html" className="nav-link">
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a href="about.html" className="nav-link">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
