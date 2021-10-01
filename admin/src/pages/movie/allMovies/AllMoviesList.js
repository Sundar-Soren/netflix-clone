import React, { useContext, useEffect } from 'react'
import './allMovieslist.scss'
import { DeleteOutline } from '@material-ui/icons'
import { deleteMovie, getMoviesList } from '../../../context/movieContext/apiCallMovie'
import { MovieContext } from '../../../context/movieContext/MovieContext'
import { Link } from 'react-router-dom'

const AllMoviesList = () => {

    const { movies, dispatch } = useContext(MovieContext)

    useEffect(() => {
        console.log("useEffect");
        getMoviesList(dispatch)
    }, [])


    const handleDelete = (movieId) => {
        deleteMovie(movieId, dispatch)
    }

    console.log("MOVIES:", movies);
    return (
        <div className="movies-list">

            {movies && movies.map(movie => (
                <div className="container">
                    <div className="movie-id all-movie-list">{movie._id}</div>
                    <div className="image all-movie-list">
                        <img src={movie.imgThumb} alt="Movie thumb" />
                    </div>
                    <div className="title all-movie-list">{movie.title}</div>
                    <div className="genre all-movie-list">{movie.genre}</div>
                    <div className="limit all-movie-list">{movie.limit}</div>
                    <div className="year all-movie-list">{movie.year}</div>
                    <dir className="operation-btn">
                        <Link to={{ pathname: "/movie/update", state: movie }} className="link" >
                            <span className="update-btn">Update</span>
                        </Link>
                        <span onClick={() => handleDelete(movie._id)}><DeleteOutline /></span>
                    </dir>
                </div>
            ))}
        </div>
    )
}

export default AllMoviesList
