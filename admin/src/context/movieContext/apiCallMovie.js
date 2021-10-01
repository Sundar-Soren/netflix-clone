import axios from "axios";
import { addMovieFailure, addMovieStart, addMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMovieFailure, getMoviesFailure, getMoviesStart, getMoviesSuccess, getMovieStart, getMovieSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieAction";





//GET MOVIES LIST
export const getMoviesList = async (dispatch) => {

    const user = JSON.parse(localStorage.getItem('user'))

    dispatch(getMoviesStart())
    try {
        const res = await axios.get(`/movies/${user.user._id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch(getMoviesSuccess(res.data))
    } catch (error) {
        console.log(error);
        dispatch(getMoviesFailure())
    }
}

//ADD NEW MOVIE
export const addMovie = async (movie, dispatch) => {

    const user = JSON.parse(localStorage.getItem('user'))

    dispatch(addMovieStart())
    try {
        const res = await axios.post(`/movie/add/${user.user._id}`, movie, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch(addMovieSuccess(res.data))
    } catch (error) {
        console.log(error);
        dispatch(addMovieFailure())
    }
}

//UPDATE MOVIE

export const updateTheMovie = async (updateMovie, movieId, dispatch) => {

    const user = JSON.parse(localStorage.getItem('user'))

    dispatch(updateMovieStart())
    try {
        const res = await axios.put(`/movie/update/${movieId}/${user.user._id}`, updateMovie, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch(updateMovieSuccess(res.data))
    } catch (error) {
        console.log(error);
        dispatch(updateMovieFailure())
    }
}




//DELETE MOVIES
export const deleteMovie = async (id, dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'))
    dispatch(deleteMovieStart())

    try {
        await axios.delete(`/movie/delete/${id}/${user.user._id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch(deleteMovieSuccess(id))
    } catch (error) {
        dispatch(deleteMovieFailure())
    }
}