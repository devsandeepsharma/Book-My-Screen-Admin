import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/ui/Button";
import Movies from "../components/forms/Movies";

import { uiActions } from "../store/uiSlice";
import { moviesActions } from "../store/moviesSlice";
import { MovieService } from "../services/Admin";
import { filterMoviesByCategory } from "../utils/movieUtils";

const AddMovies = () => {

    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);
    const { movies } = useSelector((state) => state.movies);
    const { isModalOpen } = useSelector((state) => state.ui);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [editMovie, setEditMovie] = useState(false);

    const filteredMovies = filterMoviesByCategory(movies, selectedCategory);

    const openModal = () => {
        setEditMovie(false);
        dispatch(uiActions.openModal());
    }

    const openEditModal = (movie) => {
        setEditMovie(movie);
        dispatch(uiActions.openModal());
    }

    const handleDeleteMovie = async (id) => {
        try {
            await MovieService.delete(id);
            dispatch(moviesActions.removeMovie(id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            {isModalOpen && <Movies editMovie={editMovie} />}
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
            <ul className="grid md:grid-cols-2 gap-4 px-6 py-2 md:py-6">
                {
                    (!filteredMovies || filteredMovies.length === 0) ? (
                        <p className="text-center text-gray-500 mt-6 col-span-full">No movies added yet.</p>
                    ) : (
                        filteredMovies.map(movie => (
                            <li
                                key={movie.id}
                                className="bg-white border border-gray-100 rounded-lg p-4 shadow flex items-center gap-4"
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.name}
                                    className="w-20 h-28 object-cover rounded-md border border-gray-200"
                                />

                                <div className="flex flex-col h-full">
                                    <h2 className="text-lg font-semibold text-gray-900">{movie.name}</h2>
                                    <p className="text-sm text-gray-600">{movie.language} • {movie.director}</p>
                                    <p className="text-xs text-gray-500 mt-1">IMDB: ⭐ {movie.imdbRating} | Release: {movie.releaseDate}</p>
                                    <div className="flex gap-3 mt-auto">
                                        <Button variant="link" onClick={() => openEditModal(movie)}>
                                            Edit
                                        </Button>
                                        <Button variant="link" onClick={() => handleDeleteMovie(movie.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))
                    )
                }
            </ul>
        </section>
    )
}

export default AddMovies;