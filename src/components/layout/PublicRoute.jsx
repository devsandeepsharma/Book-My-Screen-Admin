import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import Skeleton from "../ui/Skeleton";

const PublicRoute = ({ children }) => {
    const { isLoggedIn, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return <Skeleton />; 
    }

    return isLoggedIn ? <Navigate to="/" replace /> : children;
}

export default PublicRoute;