import { Link } from "react-router-dom"
const NotFound = () => {
    return (
        <div className="justify-content-center m-4">
            <h1>404- Not found</h1>
            <div>
                The page you are looking for does not exist.
                <Link to="/">Return to Home page</Link>
            </div>
        </div>
    )
}
export default NotFound;