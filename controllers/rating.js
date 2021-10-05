const Task = require('../models/Task')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse');
const Rating = require('../models/Ratings')

// @desc      Add rating
// @route     POST /api/v1/tasks/:taskId/rating
// @access    Private
exports.addRating = asyncHandler(async (req, res, next) => {
    req.body.task = req.params.taskId;
    req.body.user = req.user.id;
  
    const task = await Task.findById(req.params.taskId);
  
    if (!task) {
      return next(
        new ErrorResponse(
          `No task with the id of ${req.params.taskId}`,
          404
        )
      );
    }
  
    const rating = await Rating.create(req.body);
  
    res.status(201).json({
      success: true,
      data: rating
    });
  });

  