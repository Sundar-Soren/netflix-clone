const express = require('express')
const { isLogin, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getUserById, updateUser, deleteUser, getUser, getAllUsers, getUserStatus } = require('../controllers/user')
const router = express.Router()



router.param("userId", getUserById)

router.get('/user/:userId', isLogin, isAuthenticated, getUser)
router.put('/user/update/:userId', isLogin, isAuthenticated, updateUser)
router.delete('/user/delete/:userId', isLogin, isAuthenticated, deleteUser)

router.get('/users/:userId', isLogin, isAuthenticated, isAdmin, getAllUsers)

// get user status
router.get('/user/stats/:userId', isLogin, isAuthenticated, isAdmin, getUserStatus)













module.exports = router