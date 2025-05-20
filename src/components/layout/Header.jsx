import { Link } from "react-router-dom";

import Logo from "../ui/Logo";
import Button from "../ui/Button";

const Header = () => {
    return (
        <header className="w-full">
            <div className="h-1 bg-teal-600"></div>
            <div className="px-6 py-4 bg-white border-b border-gray-200">
                <div className=" flex items-center justify-between">
                    <Link 
                        to="/landing" 
                        className="focus:outline-1 focus:outline-offset-4 focus:outline-dashed focus:outline-teal-600 rounded transition"
                    >
                        <Logo />
                    </Link>
                    <nav aria-label="primary navigation">
                        <Button
                          to="/login"
                          isLink
                        >
                          Login
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;