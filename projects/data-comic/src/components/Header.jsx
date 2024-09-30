import BookstackImage from "../assets/images/bookstack.png";

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-end m-3">
      <div
        id="custom-header"
        className="col-12 m-3 text-left custom-header px-4"
      >
        <img src={BookstackImage} width="170" style={{float: "left", padding: "10px"}}></img>
        <h1 id="header-text">READ YOUR DATA</h1>
        <h3>Prototype</h3>
        <p>
          Interactive Data Comic <br /> Created at University of Bamberg
        </p>
      </div>
    </header>
  );
};

export default Header;
