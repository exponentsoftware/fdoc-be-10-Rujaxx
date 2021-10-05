const express = require('express')

const{ addRating } = require('../controllers/rating')

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

router.route('/').post(protect, authorize('user', 'admin'), addRating);

module.exports = router