import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import Skeleton from "../ui/Skeleton";

const ProtectedRoute = ({children}) => {

    const { isLoggedIn, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return <Skeleton />; 
    }

    return isLoggedIn ? children : <Navigate to="/landing" replace />
}

export default ProtectedRoute;