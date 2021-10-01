const MovieReducer = (state, action) => {
    switch (action.type) {

        //GET A MOVIE
        case "GET_MOVIE_START":
            return {
                movie: [],
                isFetching: true,
                error: false
            }

        case "GET_MOVIE_SUCCESS":
            return {
                movie: action.payload,
                isFetching: false,
                error: false
            }

        case "GET_MOVIE_FAILURE":
            return {
                movie: [],
                isFetching: false,
                error: true
            }

        //GET ALL MOVIES
        case "GET_MOVIES_START":
            return {
                movies: [],
                isFetching: true,
                error: false
            }

        case "GET_MOVIES_SUCCESS":
            return {
                movies: action.payload,
                isFetching: false,
                error: false
            }

        case "GET_MOVIES_FAILURE":
            return {
                movies: [],
                isFetching: false,
                error: true
            }

        //ADD NEW MOVIES
        case "ADD_MOVIE_START":
            return {
                ...state,
                isFetching: true,
                error: false
            }

        case "ADD_MOVIE_SUCCESS":
            return {
                movies: [...state.movies, action.payload],
                isFetching: false,
                error: false
            }

        case "ADD_MOVIE_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true
            }

        //UPDATE MOVIE
        case "UPDATE_MOVIE_START":
            return {
                ...state,
                isFetching: true,
                error: false
            }

        case "UPDATE_MOVIE_SUCCESS":
            return {
                movies: state.movies && (state.movies.map(movie => movie._id === action.payload._id && action.payload)),
                isFetching: false,
                error: false
            }

        case "UPDATE_MOVIE_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true
            }

        //DELETE MOVIE 
        case "DELETE_MOVIE_START":
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case "DELETE_MOVIE_SUCCESS":
            return {
                movies: state.movies.filter(movie => movie._id !== action.payload),
                isFetching: false,
                error: false
            }
        case "DELETE_MOVIE_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return { ...state }
    }
}

export default MovieReducer