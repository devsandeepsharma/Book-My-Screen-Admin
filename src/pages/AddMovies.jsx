import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/ui/Button";
import Movies from "../components/forms/Movies";

import { uiActions } from "../store/uiSlice";

const AddMovies = () => {

    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);
    const { isModalOpen } = useSelector((state) => state.ui);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [editCategory, setEditCategory] = useState(false);

    const openModal = () => {
        setEditCategory(false);
        dispatch(uiActions.openModal());
    }

    return (
        <section>
            {isModalOpen && <Movies editCategory={editCategory} />}
            <div className="w-full px-6 py-4 md:py-6 flex flex-wrap items-center justify-between gap-3 md:border-b md:border-gray-200">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Movies</h2>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="ml-auto px-4 py-2 border rounded-md text-gray-900"
                >
                    <option value="">All Categories</option>
                    {categories?.map((cat) => (
                        <option key={cat.id} value={cat.category}>
                            {cat.category}
                        </option>
                    ))}
                    </select>
                <Button
                    className="w-full sm:w-auto"
                    onClick={openModal}
                >
                    Add Movies
                </Button>
            </div>
        </section>
    )
}

export default AddMovies;