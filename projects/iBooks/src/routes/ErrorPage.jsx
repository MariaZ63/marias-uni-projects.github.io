import { useRouteError } from "react-router-dom";

/**
 * Component for rendering a general error page.
 * If given, with specific error text.
 * @returns {JSX.Element} - ErrorPage Component.
 */
const ErrorPage = () => {
  const error = useRouteError();

  if (!error.status) {
    return (
      <div id="error-page" className="container text-center mt-5">
        <p>Sorry, an error occurred!</p>
      </div>
    );
  }
  return (
    <div id="error-page" className="container text-center mt-5">
      <h3 className="display-3">
        {error.status} - {error.statusText}
      </h3>
    </div>
  );
};

export default ErrorPage;
