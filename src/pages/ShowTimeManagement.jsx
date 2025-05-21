import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../components/ui/Button";
import AddShowtime from "../components/forms/AddShowtime";

import { uiActions } from "../store/uiSlice";
import { filterMoviesByCategory } from "../utils/movieUtils";

const ShowTimeManagement = () => {

    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);
    const { movies } = useSelector((state) => state.movies);
    const { isModalOpen } = useSelector((state) => state.ui);
    
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredMovies = filterMoviesByCategory(movies, selectedCategory);

    const openModal = () => {
        dispatch(uiActions.openModal());
    }

    return (
        <section>
            {isModalOpen && <AddShowtime />}
            <div className="w-full px-6 py-4 md:py-6 flex flex-wrap items-center justify-between gap-3 md:border-b md:border-gray-200">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Show Time</h2>
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
            </div>
            <ul className="flex flex-col gap-3 px-6 py-2 md:py-6">
                {
                    filteredMovies.length === 0 ? (
                        <p className="text-center text-gray-500 mt-6 col-span-full">No movies found for this category.</p>
                    ) : (
                        filteredMovies.map((movie) => (
                            <li 
                                key={movie.id} 
                                className="bg-white border border-gray-100 rounded-lg p-4 shadow"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">{movie.name}</h2>
                                    <Button
                                        onClick={openModal}
                                    >
                                        Add Show
                                    </Button>
                                </div>
                            </li>
                        ))
                    )
                }
            </ul>
        </section>
    )
}

export default ShowTimeManagement;