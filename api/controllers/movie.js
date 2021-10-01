const Movie = require('../models/Movies')

exports.getMovieById = (req, res, next, id) => {
    Movie.findById(id).exec((err, movie) => {
        if (err) {
            console.log(err.message);
            return res.status(401).json({
                error: "Faied to Get the Movie"
            })
        }
        req.movie = movie
        next()
    })
}



exports.addNewMovie = async (req, res) => {
    const newMovie = new Movie(req.body)
    try {
        const savedMovie = await newMovie.save()
        res.json(savedMovie)
    } catch (error) {
        res.status(401).json({
            error: "Faied To add New Movie"
        })
    }

}


exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            { _id: req.movie._id },
            { $set: req.body },
            { new: true }
        )
        res.json(updatedMovie)
    } catch (error) {
        res.status(401).json({
            error: "Faied To update the Movie"
        })
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.movie._id)
        res.json({
            message: "Movie has deleted successfully"
        })
    } catch (error) {
        res.status(401).json({
            error: "Faied To Delete this Movie"
        })
    }
}
exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.movie._id)
        res.json(movie)
    } catch (error) {
        res.status(401).json({
            error: "Faied To Get the Movie"
        })
    }
}

//Get Random MOVIE || SERIES

exports.getRandomMovie = async (req, res) => {
    const type = req.query.type
    let movie
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        }
        res.json(movie)

    } catch (error) {
        res.status(401).json({
            error: "Unable to Get the random MOVIE or SERIES"
        })
    }
}

//Related Movie Suggestion
exports.getRandomRelatedMovie = async (req, res) => {
    const type = req.query.type
    let movie
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 8 } }
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 8 } }
            ])
        }
        res.json(movie)

    } catch (error) {
        res.status(401).json({
            error: "Unable to Get the random MOVIE or SERIES"
        })
    }
}


//Get All Movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies.reverse())
    } catch (error) {
        res.status(401).json({
            error: "Faied To Get All the Movies"
        })
    }
}
