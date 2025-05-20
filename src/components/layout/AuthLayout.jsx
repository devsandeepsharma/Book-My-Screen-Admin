import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AuthService } from "../../services/Authentication";
import { authActions } from "../../store/authSlice";

const AuthLayout = ({ children }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = AuthService.onAuthStateChanged((user) => {
            if(user) {
                dispatch(authActions.login(user));
            } else {
                dispatch(authActions.logout());
            }
            console.log("User changed:", user);
        });

        return () => unsubscribe();
    }, []);

    return children;
}

export default AuthLayout;