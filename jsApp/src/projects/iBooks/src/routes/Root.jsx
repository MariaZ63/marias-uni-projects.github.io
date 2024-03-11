import { Outlet, NavLink, } from 'react-router-dom';

/**
 * Component for rendering the main page skeleton which includes the heading and navbar
 * @returns {JSX.Element} - Root Component.
 */
const Root = () => {

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-3">
          <i className="fas fa-bookmark text-primary" id="jumbotron-icon"></i>{" "}
          iBooks
        </h1>
        <p className="lead">Your Personal Bookshelf</p>
      </div>
      <ul id="navigation" className="nav nav-tabs nav-fill">
        <li className="nav-item">
          <NavLink className="nav-link" to={`books`}>
            Book List
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`addBooks`}>
            Add Book
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`details`}>
            Book Details
          </NavLink>
        </li>
      </ul>
      <div id="input">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
