import { useDispatch, useSelector } from "react-redux";

import Button from "../components/ui/Button";
import AddCategory from "../components/forms/AddCategory";

import { uiActions } from "../store/uiSlice";

const Categories = () => {

    const dispatch = useDispatch();

    const { isModalOpen } = useSelector((state) => state.ui);

    const openModal = () => {
        dispatch(uiActions.openModal());
    }

    return (
        <section>
            {isModalOpen && <AddCategory />}
            <div className="w-full px-6 py-4 md:py-6 flex items-center justify-between md:border-b md:border-gray-200">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Categories</h2>
                <Button
                    onClick={openModal}
                >
                    Add Category
                </Button>
            </div>
        </section>
    )
}

export default Categories;