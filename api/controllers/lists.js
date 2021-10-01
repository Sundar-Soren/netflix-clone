const List = require('../models/Lists')


exports.getListById = (req, res, next, id) => {
    List.findById(id).exec((err, list) => {
        if (err) {
            return res.status(401).json({
                error: "Failed to fetch the List"
            })
        }
        req.list = list
        next()
    })
}

exports.createList = async (req, res) => {
    const newList = new List(req.body)
    try {
        const savedList = await newList.save()
        res.json(savedList)
    } catch (error) {
        res.status(401).json({
            error: "Failed to create List"
        })

    }
}

exports.deleteList = async (req, res) => {
    try {
        await List.findByIdAndDelete(req.list._id)
        res.json({
            message: "List has deleted successfully"
        })
    } catch (error) {
        res.status(401).json({
            error: "Failed to delete the List"
        })

    }
}

exports.getAllLists = async (req, res) => {
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } }
                ])
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ])
            }
        } else {
            list = await List.aggregate([{ $sample: { size: 10 } }])
        }

        res.json(list)
    } catch (error) {
        res.status(401).json({
            error: "Failed to fetch the lists"
        })

    }
}