import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({children}) => {

    const { isLoggedIn, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return <h1>Loading...</h1>; 
    }

    return isLoggedIn ? children : <Navigate to="/landing" replace />
}

export default ProtectedRoute;