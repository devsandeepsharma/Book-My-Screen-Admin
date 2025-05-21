import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AuthService } from "../../services/Authentication";
import { CategoryService, MovieService } from "../../services/Admin";
import { authActions } from "../../store/authSlice";
import { categoriesActions } from "../../store/categoriesSlice";
import { moviesActions } from "../../store/moviesSlice";

const AuthLayout = ({ children }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const fetchAdminData = async () => {
        try {
            const [categories, movies] = await Promise.all([
                CategoryService.fetchAll(),
                MovieService.fetchAll(),
            ]);
            console.log(categories);
            console.log(movies);
            dispatch(categoriesActions.setCategories(categories));
            dispatch(moviesActions.setMovies(movies));
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