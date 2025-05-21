export const filterMoviesByCategory = (movies, category) => {
    if (!category) return movies;
    return movies.filter(movie => movie.category === category);
}