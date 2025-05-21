import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../ui/Sidebar";

const Layout = () => {

    const { isLoggedIn } = useSelector((state) => state.auth);

    return (
        <>
            {isLoggedIn ? (
                <div className="flex flex-col md:flex-row min-h-screen">
                    <Sidebar />
                    <main className="md:w-[calc(100%-256px)] md:ml-auto">
                        <Outlet />
                    </main>
                </div>
            ) : (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            )}
        </>
    );
};

export default Layout;