const express = require('express')
const { isLogin, isAdmin, isAuthenticated } = require('../controllers/auth')
const { addNewMovie, getMovieById, updateMovie, deleteMovie, getMovie, getRandomMovie, getAllMovies, getRandomRelatedMovie } = require('../controllers/movie')
const { getUserById } = require('../controllers/user')
const router = express.Router()


router.param("userId", getUserById)
router.param("movieId", getMovieById)

//Add Movie
router.post('/movie/add/:userId', isLogin, isAuthenticated, isAdmin, addNewMovie)
//Update Movie
router.put('/movie/update/:movieId/:userId', isLogin, isAuthenticated, isAdmin, updateMovie)
//Delete Movie
router.delete('/movie/delete/:movieId/:userId', isLogin, isAuthenticated, isAdmin, deleteMovie)
//Get Movie
router.get('/movie/:movieId/:userId', isLogin, isAuthenticated, getMovie)

//Get Random Movie
router.get('/movie/random', getRandomMovie)
router.get('/movie/related', getRandomRelatedMovie)

//Get All Movies
router.get('/movies/:userId', isLogin, isAuthenticated, isAdmin, getAllMovies)





module.exports = router