import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { uiActions } from "../../store/uiSlice";

const Modal = ({ children }) => {

    const dispatch = useDispatch();

    const portalElement = document.getElementById("portal");

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
          dispatch(uiActions.closeModal());
        }
    };

    return createPortal(
        <div 
            className="fixed inset-0 bg-white-100 bg-opacity-20-sm z-[150] p-6 flex items-center justify-center"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-white border border-teal-600 p-6 rounded-lg shadow-lg max-w-lg w-full"
            >
                {children}
            </div>
        </div>,
        portalElement
    );
};

export default Modal;