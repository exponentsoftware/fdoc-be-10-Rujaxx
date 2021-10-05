const Task = require('../models/Task')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse');


// @desc      Get all tasks
// @route     GET /api/v1/tasks
// @access    Private
exports.getTasks = asyncHandler(async(req,res,next) => {
    const tasks = await Task.find()

    return res.status(200).json({
      success: true,  
      count: tasks.length,
      data: tasks
    })

})

// @desc      Get a task
// @route     GET /api/v1/tasks/:id
// @access    Private
exports.getTask = asyncHandler(async(req,res,next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(
          new ErrorResponse(`task not found with id of ${req.params.id}`, 404)
        );
      }
    res.status(200).json({
        success : true,
        data : task
    })
})

// @desc      add a task
// @route     POST /api/v1/tasks
// @access    Private
exports.addTask = asyncHandler(async(req,res,next) => {
    req.body.user = req.user.id;
    const task = await Task.create(req.body);

    res.status(200).json({
        success : true,
        data : task
    })
})

// @desc      update a task
// @route     PUT /api/v1/tasks/:id
// @access    Private
exports.updateTask = asyncHandler(async(req,res,next) => {
    let task = await Task.findById(req.params.id);
    console.log(req.user.id)

    if (!task) {
        return next(
          new ErrorResponse(`task not found with id of ${req.params.id}`, 404)
        );
      }

    // Make sure user is task owner
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this task`,
          401
        )
      );
    }

    task = await Task.findByIdAndUpdate(req.params.id,req.body,{
      new: true,
      validators : true
    });

    res.status(200).json({
        success : true,
        data : task
    })  
})


// @desc      DELETE a task
// @route     DELETE /api/v1/tasks/:id
// @access    Private
exports.deleteTask = asyncHandler(async(req,res,next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return next(
          new ErrorResponse(`task not found with id of ${req.params.id}`, 404)
        );
      }

     // Make sure user is task owner
     if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this task`,
          401
        )
      );
    }

    task.remove();

    res.status(200).json({
        success:true,
        message: "deleted succesfully"
      })
})

// @desc      Get  completed tasks
// @route     Get /api/v1/tasks
// @access    Private
exports.getCompletedTasks = asyncHandler(async(req,res,next) => {

  const tasks = await Task.find({"isComplete" : true, "user" : req.user.id})

  return res.status(200).json({
    success: true,  
    count: tasks.length,
    data: tasks
  })

})

// @desc      PUT  like task
// @route     PUT /api/v1/tasks
// @access    Private
exports.likeTasks = asyncHandler(async(req,res,next) => {
  let task = await Task.findByIdAndUpdate(req.params.id)

  if (!task) {
    return next(
      new ErrorResponse(`task not found with id of ${req.params.id}`, 404)
    );
  }

   task = await Task.findByIdAndUpdate(req.params.id,{
    $addToSet:{likes:req.user.id}},{
    new: true,
    validators : true
  });

  return res.status(200).json({
    success: true,  
    count: task.length,
    data: task
  })

})

// @desc      put  like task
// @route     put /api/v1/tasks
// @access    Private
exports.disLikeTasks = asyncHandler(async(req,res,next) => {

  let task = await Task.findByIdAndUpdate(req.params.id)

  if (!task) {
    return next(
      new ErrorResponse(`task not found with id of ${req.params.id}`, 404)
    );
  }

   task = await Task.findByIdAndUpdate(req.params.id,{
    $pull:{likes:req.user.id}},{
    new: true,
    validators : true
  });

  return res.status(200).json({
    success: true,  
    count: task.length,
    data: task
  })

})

// @desc      PUT  like task
// @route     PUT /api/v1/tasks
// @access    Private
exports.addRating = asyncHandler(async(req,res,next) => {
  let task = await Task.findByIdAndUpdate(req.params.id)

  if (!task) {
    return next(
      new ErrorResponse(`task not found with id of ${req.params.id}`, 404)
    );
  }

   task = await Task.findByIdAndUpdate(req.params.id,{
    $addToSet:{ratings:req.user.id}},{
    new: true,
    validators : true
  });

  return res.status(200).json({
    success: true,  
    count: task.length,
    data: task
  })

})