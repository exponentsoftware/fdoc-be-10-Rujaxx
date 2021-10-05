const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10']
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      task: {
        type: mongoose.Schema.ObjectId,
        ref: 'Task',
        required: true
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      }
})

RatingSchema.index({ task: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Ratings', RatingSchema);