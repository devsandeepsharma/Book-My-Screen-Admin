import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../components/ui/Button";
import AddShowtime from "../components/forms/AddShowtime";

import { uiActions } from "../store/uiSlice";
import { moviesActions } from "../store/moviesSlice";
import { MovieService } from "../services/Admin";
import { filterMoviesByCategory } from "../utils/movieUtils";

const ShowTimeManagement = () => {

    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);
    const { movies } = useSelector((state) => state.movies);
    const { isModalOpen } = useSelector((state) => state.ui);
    
    const [selectedCategory, setSelectedCategory] = useState("");
    const [movie, setMovie] = useState("");

    const filteredMovies = filterMoviesByCategory(movies, selectedCategory);

    const openModal = (movie) => {
        setMovie(movie);
        dispatch(uiActions.openModal());
    }

    const removeTime = async (movieId, date, timeKey) => {
        try {
            const currentMovie = movies.find(m => m.id === movieId);
            if (!currentMovie) throw new Error("Movie not found");

            const updatedShowtime = JSON.parse(JSON.stringify(currentMovie.showtime || {}));

            if (updatedShowtime[date] && updatedShowtime[date][timeKey]) {
                delete updatedShowtime[date][timeKey];

                if (Object.keys(updatedShowtime[date]).length === 0) {
                    delete updatedShowtime[date];
                }

                await MovieService.update(movieId, { showtime: updatedShowtime });

                dispatch(moviesActions.updateMovie({
                    id: movieId,
                    updatedData: { showtime: updatedShowtime }
                }));
            }
        } catch (error) {
            console.error("Failed to remove showtime:", error);
        }
    };

    return (
        <section>
            {isModalOpen && <AddShowtime movie={movie} />}
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
                                className="bg-white border border-gray-100 rounded-lg py-4 px-6 shadow"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">{movie.name}</h2>
                                    <Button onClick={() => openModal(movie)}>Add Show</Button>
                                </div>
                                {
                                    movie.showtime && Object.keys(movie.showtime).length > 0 ? (
                                        <div className="space-y-4">
                                            {
                                                Object.entries(movie.showtime).map(([date, times]) => (
                                                    <div key={date}>
                                                        <p className="text-gray-700 font-medium mb-2">{date}</p>
                                                        <div className="flex flex-wrap gap-2">
                                                        {
                                                            Object.entries(times).map(([timeKey, timeValue]) => (
                                                            <span
                                                                key={timeKey}
                                                                className="flex items-center space-x-2 bg-gray-100 text-teal-900 rounded px-3 py-1 text-sm"
                                                            >
                                                                <span>{timeValue}</span>
                                                                <Button
                                                                    variant="link"
                                                                    onClick={() => removeTime(movie.id, date, timeKey)}
                                                                >
                                                                    delete
                                                                </Button>
                                                            </span>
                                                        ))}
                                                    </div>
                                            </div>
                                            ))}
                                        </div>
                                    ) : (
                                    <p className="text-gray-500 col-span-full italic">No showtimes yet</p>
                                )}
                            </li>
                        ))
                    )
                }
            </ul>
        </section>
    )
}

export default ShowTimeManagement;