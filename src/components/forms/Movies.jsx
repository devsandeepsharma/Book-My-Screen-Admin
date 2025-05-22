import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import { uiActions } from "../../store/uiSlice";
import { MovieService } from "../../services/Admin";
import { moviesActions } from "../../store/moviesSlice";
import { formatDate } from "../../utils/dateUtils";

const Movies = ({ editMovie }) => {

    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);

    const [error, setError] = useState(false);

    const moviesSchema = Yup.object({
        name: Yup.string()
            .required("Movie name is required"),
        poster: Yup.string()
            .required("Poster image is required"),
        heroImageUrl: Yup.string()
            .required("Hero section image is required"),
        description: Yup.string()
            .min(10, "Description should be at least 10 characters")
            .required("Description is required"),
        director: Yup.string()
            .required("Director name is required"),
        category: Yup.string()
            .required("Category is required"),
        releaseDate: Yup.date()
            .required("Release date is required")
            .typeError("Please enter a valid date"),
        language: Yup.string()
            .required("Language is required"),
        imdbRating: Yup.number()
            .min(0, "IMDB rating can't be less than 0")
            .max(10, "IMDB rating can't be more than 10")
            .required("IMDB rating is required"),
        trailer: Yup.string()
            .matches(
                /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/,
                "Trailer must be a valid YouTube embed URL (e.g. https://www.youtube.com/embed/xyz123)"
            )
            .required("Trailer link is required"),
    });

    const closeModal = () => {
        dispatch(uiActions.closeModal());
    }

    const handleSubmit = async (values, actions) => {
        setError("");
        try {
            if (editMovie) {
                await MovieService.update(editMovie.id, { ...values });
                const releaseDate = formatDate(values.releaseDate);
                dispatch(moviesActions.updateMovie({ 
                    id: editMovie.id,
                    updatedData: {
                        ...values,
                        releaseDate: releaseDate,
                    }
                }));
            } else {
                const movie = await MovieService.create({ ...values });
                const releaseDate = formatDate(values.releaseDate);
                const movieData = {
                    id: movie.key, 
                    ...values,
                    releaseDate: releaseDate,
                    createdAt: Date.now(),
                };

                dispatch(moviesActions.addMovie(movieData));
            }
            
            dispatch(uiActions.closeModal());
        } catch (error) {
            setError("Failed to add movies. Please try again."); 
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Modal>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {editMovie ? "Edit Movie" : "Add Movie"}
            </h1>

            <Formik
                initialValues={{
                    name: editMovie?.name || "",
                    poster: editMovie?.poster || "",
                    heroImageUrl: editMovie?.heroImageUrl || "",
                    description: editMovie?.description || "",
                    director: editMovie?.director || "",
                    category: editMovie?.category || "",
                    releaseDate: editMovie?.releaseDate || "",
                    language: editMovie?.language || "",
                    imdbRating: editMovie?.imdbRating || "",
                    trailer: editMovie?.trailer || "",
                }}
                validationSchema={moviesSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="h-[70vh] flex flex-col gap-3 mt-5">
                        <div className="flex flex-col gap-3 overflow-y-auto hide-scrollbar">
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-900">Movie Name</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Enter movie name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                    />
                                    <p className="text-xs font-medium text-red-600">
                                        <ErrorMessage name="name" />
                                        {error && error}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-900">Poster URL</label>
                                    <Field
                                        name="poster"
                                        type="text"
                                        placeholder="Enter poster image URL"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                    />
                                    <p className="text-xs font-medium text-red-600">
                                        <ErrorMessage name="poster" />
                                        {error && error}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-900">Hero Section Image URL</label>
                                    <Field
                                        name="heroImageUrl"
                                        type="text"
                                        placeholder="Enter hero section image URL"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                    />
                                    <p className="text-xs font-medium text-red-600">
                                        <ErrorMessage name="heroImageUrl" />
                                        {error && error}
                                    </p>
                                 </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-900">Director Name</label>
                                    <Field
                                        name="director"
                                        type="text"
                                        placeholder="Enter director's name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                    />
                                    <p className="text-xs font-medium text-red-600">
                                        <ErrorMessage name="director" />
                                        {error && error}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-900">Category</label>
                                    <Field
                                        name="category"
                                        as="select"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((cat) => (
                                        <option key={cat.id} value={cat.category}>
                                            {cat.category}
                                        </option>
                                        ))}
                                    </Field>
                                    <p className="text-xs font-medium text-red-600">
                                        <ErrorMessage name="category" />
                                        {error && error}
                                    </p>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-900">Release Date</label>
                                    <Field
                                        name="releaseDate"
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                    />
                                    <p className="text-xs font-medium text-red-600">
                                        <ErrorMessage name="releaseDate" />
                                        {error && error}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-900">Language</label>
                                    <Field
                                        name="language"
                                        type="text"
                                        placeholder="e.g. English, Hindi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                    />
                                    <p className="text-xs font-medium text-red-600">
                                        <ErrorMessage name="language" />
                                        {error && error}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-900">IMDB Rating</label>
                                    <Field
                                        name="imdbRating"
                                        type="number"
                                        step="0.1"
                                        placeholder="Enter IMDB rating"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                    />
                                    <p className="text-xs font-medium text-red-600">
                                        <ErrorMessage name="imdbRating" />
                                        {error && error}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-900">Trailer Embed URL</label>
                                <Field
                                    name="trailer"
                                    type="text"
                                    placeholder="https://www.youtube.com/embed/xyz123"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                />
                                <p className="text-xs font-medium text-red-600">
                                    <ErrorMessage name="trailer" />
                                    {error && error}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-900">Description</label>
                                <Field
                                    name="description"
                                    as="textarea"
                                    rows={4}
                                    placeholder="Enter movie description"
                                    className="resize-none w-full px-4 py-2 border border-gray-300 rounded-md outline-0 border-2 focus:border-teal-500"
                                />
                                <p className="text-xs font-medium text-red-600">
                                    <ErrorMessage name="description" />
                                    {error && error}
                                </p>
                            </div>
                        </div>
                        <div className="mt-auto pt-4 flex justify-end gap-3 border-t border-gray-300">
                            <Button 
                                type="button"
                                variant="outline" 
                                onClick={closeModal}
                            >
                                Close
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {
                                    isSubmitting ? editMovie
                                        ? "Saving..."
                                        : "Adding..."
                                    : editMovie
                                        ? "Save Changes"
                                        : "Add Movie"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default Movies;