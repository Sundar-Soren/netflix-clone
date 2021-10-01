//GET A MOVIE
export const getMovieStart = () => ({
    type: "GET_MOVIE_START"
})
export const getMovieSuccess = (movie) => ({
    type: "GET_MOVIE_SUCCESS",
    payload: movie
})
export const getMovieFailure = () => ({
    type: "GET_MOVIE_FAILURE"
})

//GET MOVIES LIST
export const getMoviesStart = () => ({
    type: "GET_MOVIES_START"
})
export const getMoviesSuccess = (movies) => ({
    type: "GET_MOVIES_SUCCESS",
    payload: movies
})
export const getMoviesFailure = () => ({
    type: "GET_MOVIES_FAILURE"
})

//ADD NEW MOVIES
export const addMovieStart = () => ({
    type: "ADD_MOVIE_START"
})
export const addMovieSuccess = (movie) => ({
    type: "ADD_MOVIE_SUCCESS",
    payload: movie
})
export const addMovieFailure = () => ({
    type: "ADD_MOVIE_FAILURE"
})

//UPDATE MOVIE
export const updateMovieStart = () => ({
    type: "UPDATE_MOVIE_START"
})
export const updateMovieSuccess = (movie) => ({
    type: "UPDATE_MOVIE_SUCCESS",
    payload: movie
})
export const updateMovieFailure = () => ({
    type: "UPDATE_MOVIE_FAILURE"
})


//DELETE MOVIES

export const deleteMovieStart = () => ({
    type: "DELETE_MOVIE_START"
})
export const deleteMovieSuccess = (id) => ({
    type: "DELETE_MOVIE_SUCCESS",
    payload: id
})
export const deleteMovieFailure = () => ({
    type: "DELETE_MOVIE_FAILURE"
})