const express = require('express')


const {
    addTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask,
    getCompletedTasks,
    likeTasks,
    disLikeTasks,
} = require('../controllers/task')

// Include other resource routers
const ratingsRouter = require('./rating');


const router = express.Router();

const { protect, authorize } = require('../middlewares/auth')

// Re-route into other resource routers
router.use('/:taskId/rating', ratingsRouter);


router
    .route('/')
    .get(protect,authorize('user','admin'),getTasks)
    .get(protect,authorize('user','admin'),getCompletedTasks)
    .post(protect,addTask)

router
    .route('/completed')
    .get(protect,authorize('user','admin'),getCompletedTasks)

router
    .route('/:id/like')
    .put(protect,likeTasks)

router
    .route('/:id/dislike')
    .put(protect,disLikeTasks)   

router
    .route('/:id')
    .get(getTask)
    .put(protect,authorize('user','admin'),updateTask)
    .delete(protect,authorize('user','admin'),deleteTask)

module.exports = router;