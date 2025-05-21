import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AuthService } from "../../services/Authentication";
import { AdminService } from "../../services/Admin";
import { authActions } from "../../store/authSlice";
import { categoriesActions } from "../../store/categoriesSlice";

const AuthLayout = ({ children }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const fetchAdminData = async () => {
        try {
            const [categories] = await Promise.all([
                AdminService.fetchCategories()
            ]);
            console.log(categories);
            dispatch(categoriesActions.setCategories(categories));
        } catch (error) {
            console.log("Error while fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const unsubscribe = AuthService.onAuthStateChanged( async (user) => {
            if(user) {
                dispatch(authActions.login(user));
                fetchAdminData();
            } else {
                dispatch(authActions.logout());
                setLoading(false);
            }
            console.log("User changed:", user);
        });

        return () => unsubscribe();
    }, []);

    if(loading) return <h1>Loading</h1>;

    return children;
}

export default AuthLayout;