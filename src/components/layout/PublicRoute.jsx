import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
    const { isLoggedIn, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return <h1>Loading...</h1>; 
    }

    return isLoggedIn ? <Navigate to="/" replace /> : children;
}

export default PublicRoute;