const express = require('express')

const {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    getRegisteredUsers
} = require('../controllers/user')


const router = express.Router();

const { protect, authorize } = require('../middlewares/auth')

router
    .route('/')
    .get(getUsers)

router
    .route('/registered')
    .get(protect,authorize('admin'),getRegisteredUsers)

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;