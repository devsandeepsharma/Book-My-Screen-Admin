import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Skeleton from "../ui/Skeleton";

import { AuthService } from "../../services/Authentication";
import { BookingService, CategoryService, MovieService } from "../../services/Admin";
import { authActions } from "../../store/authSlice";
import { categoriesActions } from "../../store/categoriesSlice";
import { moviesActions } from "../../store/moviesSlice";
import { bookingActions } from "../../store/bookingSlice";

const AuthLayout = ({ children }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const fetchAdminData = async () => {
        try {
            const [categories, movies, bookings] = await Promise.all([
                CategoryService.fetchAll(),
                MovieService.fetchAll(),
                BookingService.fetchAll()
            ]);
            console.log(categories);
            console.log(movies);
            console.log(bookings);
            dispatch(bookingActions.setBookings(bookings));
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

    if(loading) return <Skeleton />;

    return children;
}

export default AuthLayout;