
/**
 * Component for rendering a loading spinner.
 * @returns {JSX.Element} - Spinner component.
 */

const Spinner = () => {
  return (
    <div className="container text-center"  >
      <div className="spinner-grow m-5 text-primary" role="status"></div>
      <div>Loading...</div>
    </div>
  );
};

export default Spinner;
