import { Link } from "react-router-dom";

const Button = ( { 
    variant="primary", 
    isLink=false, 
    children, 
    disabled = false, 
    className="", 
    ...props 
}) => {

    const baseStyles = "inline-flex items-center justify-center rounded md:rounded-md font-medium cursor-pointer transition-colors focus:outline-1 focus:outline-offset-4 focus:outline-dashed";

    const variants = {
        primary: "px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 focus:outline-teal-600",
        secondary: "px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-gray-400",
        outline: "px-4 py-2 border border-teal-600 text-teal-500 hover:bg-teal-100 focus:outline-teal-600",
        danger: "px-4 py-2 bg-red-600 text-white hover:bg-red-700 focus:outline-red-600",
        ghost: "px-4 py-2 bg-transparent text-teal-600 hover:bg-teal-100 focus:outline-teal-600",
        link: "px-0 py-0 text-teal-600 underline hover:text-teal-700 focus:outline-teal-600"
    };

    const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none select-none";

    const Element = isLink ? Link : "button";

    return (
        <Element 
            className={`${baseStyles} ${variants[variant]} ${
                disabled ? disabledStyles : ""} ${className}`} 
            {...props}
        >
            {children}
        </Element>
    )
}

export default Button;