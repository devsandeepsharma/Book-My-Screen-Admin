import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Button from "./Button";
import Logo from "./Logo";

import { AuthService } from "../../services/Authentication";

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(prev => !prev);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    const navLinks = [
        { path: "/", label: "Dashboard" },
        { path: "/categories", label: "Add Categories" },
        { path: "/add-movies", label: "Add Movies" },
        { path: "/showtime", label: "Manage Showtime" },
    ]

    const logoutAdmin = () => {
        AuthService.logout();
    }

    return (
        <>
            <header className="w-full md:hidden">
                <div className="h-1 bg-teal-600"></div>
                <div className="px-6 py-4 bg-white border-b border-gray-200">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <Link 
                            to="/" 
                            className="focus:outline-1 focus:outline-offset-4 focus:outline-dashed focus:outline-teal-600 rounded transition"
                        >
                            <Logo />
                        </Link>
                        <nav className="m-0!" aria-label="primary navigation">
                            <Button
                                onClick={toggle}
                                className="p-2! flex! flex-col gap-1 relative z-100"
                                aria-label="Toggle menu"
                            >
                                <span
                                    className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                                    isOpen ? "rotate-45 translate-y-1.5" : ""
                                    }`}
                                ></span>
                                <span
                                    className={`block h-0.5 w-6 bg-white rounded transition duration-300 ease-in-out top-4 ${
                                    isOpen ? "opacity-0" : "opacity-100"
                                    }`}
                                ></span>
                                <span
                                    className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                                    isOpen ? "-rotate-45 -translate-y-1.5" : ""
                                    }`}
                                ></span>
                            </Button>
                            {isOpen && (
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={toggle}
                                ></div>
                            )}
                            <ul
                                className={`fixed top-0 right-0 h-full w-64 pt-20 bg-white shadow-lg border-l-4 border-teal-600 z-50 p-6 flex flex-col gap-4 transform transition-transform duration-300 ease-in-out
                                    ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
                                    }`}
                            >
                                {
                                    navLinks.map(({ path, label }) => (
                                        <li key={path}>
                                            <NavLink
                                                to={path}
                                                className={({ isActive }) =>
                                                    `block px-4 py-2 text-gray-900 hover:bg-teal-700 hover:text-white rounded
                                                    focus:outline-1 focus:outline-offset-4 focus:outline-dashed focus:outline-teal-600 
                                                    ${isActive ? "bg-teal-600 text-white font-semibold" : ""}`
                                                }
                                                onClick={toggle}
                                            >
                                                {label}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                                <li className="mt-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={logoutAdmin}
                                    >
                                        Logout
                                    </Button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <aside className="hidden fixed min-h-screen md:flex md:flex-col w-64 bg-white shadow-lg border-r-4 border-teal-600 z-50 p-6 flex flex-col gap-4">
                <Link 
                    to="/" 
                    className="focus:outline-1 focus:outline-offset-4 focus:outline-dashed focus:outline-teal-600 rounded transition"
                >
                    <Logo />
                </Link>
                <ul
                    className="flex min-h-[calc(100vh-8rem)] flex-col gap-4 h-full pt-5"
                >
                    {
                        navLinks.map(({ path, label }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        `block px-4 py-2 text-gray-900 hover:bg-teal-700 hover:text-white rounded
                                        focus:outline-1 focus:outline-offset-4 focus:outline-dashed focus:outline-teal-600 
                                        ${isActive ? "bg-teal-600 text-white font-semibold" : ""}`
                                    }
                                    onClick={toggle}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))
                    }
                    <li className="mt-auto">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={logoutAdmin}
                        >
                            Logout
                        </Button>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;