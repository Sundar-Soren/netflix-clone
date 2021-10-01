const User = require('../models/User')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

// User Register 
exports.register = (req, res) => {
    const { username, email, password } = req.body
    const securePassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
    const newUser = new User({
        username,
        email,
        password: securePassword
    })
    newUser.save((err, user) => {
        if (err) {
            res.status(400).json({ err: err })
        }
        res.json(user)
    })
}

//User Login
exports.login = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "User Does Not Exist"
            })
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        var decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (password !== decryptPassword) {
            return res.status(401).json({
                error: "Password Not Match"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '5d' })

        res.json({ token, user })
    })
}

exports.isLogin = expressJwt({
    secret: process.env.SECRET_KEY,
    userProperty: "auth",
    algorithms: ['HS256']
})

exports.isAuthenticated = (req, res, next) => {
    const checker = req.profile && req.auth && req.profile._id == req.auth._id
    if (!checker) {
        return res.status(401).json({
            error: "Access Denied"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (!req.profile.isAdmin) {
        return res.status(400).json({
            error: "You Are Not Admin"
        })
    }
    next()
}