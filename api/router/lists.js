const express = require('express')
const { isLogin, isAuthenticated, isAdmin } = require('../controllers/auth')
const { createList, deleteList, getListById, getAllLists } = require('../controllers/lists')
const { getUserById } = require('../controllers/user')
const router = express.Router()

router.param("userId", getUserById)
router.param("listId", getListById)

router.post('/lists/create/:userId', isLogin, isAuthenticated, isAdmin, createList)
router.delete('/lists/delete/:listId/:userId', isLogin, isAuthenticated, isAdmin, deleteList)

router.get('/lists/:userId', isLogin, isAuthenticated, getAllLists)

module.exports = router