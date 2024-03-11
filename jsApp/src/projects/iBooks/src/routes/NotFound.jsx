import { Link } from "react-router-dom";

/**
 * Component for rendering a "404-Page" (undefined paths)
 * @returns {JSX:Element} - NotFound component.
 */
const NotFound = () => {
  
  return (
    <div id="error-page" className="container text-center mt-5">
      <h3 className="display-3">404 - Not Found</h3>
      <Link to={`books`}> 
        <i className="fas fa-link"></i>
        Back to book list
      </Link>
    </div>
  )
};

export default NotFound;