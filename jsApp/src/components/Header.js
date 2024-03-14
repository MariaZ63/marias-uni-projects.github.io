const Header = () => `
    <div class="d-flex flex-wrap justify-content-end py-3 mb-4 border-bottom">
      <div id="custom-header" className="col-12 m-3 text-left custom-header">
        <img
          id="custom-image" 
          class="responsive-img custom-image"
          height="200px"
          src="./assets/Zieglmeier.png"
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
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link" href="/">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/#projects">
              Projects
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/#about">
              About
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `;
export default Header;
