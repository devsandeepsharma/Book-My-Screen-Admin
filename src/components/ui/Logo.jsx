import cameraIcon from "../../assets/camera-icon.svg";

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-10 md:w-10 md:h-12 rounded bg-teal-600 flex items-center justify-center">
                <img src={cameraIcon} alt="Camera Icon" />
            </div>
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-teal-600">
                bookmyscreen
            </span>
        </div>
    );
};

export default Logo;