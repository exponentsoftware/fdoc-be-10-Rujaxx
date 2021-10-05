const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.ObjectId ,
        ref : "User",
        required : true
      },
    title: {
        type : String,
        required : [true,'Please add a title'],
        trim : true
    },
    desc: {
        type : String,
        trim : true
    },
    isComplete:{
        type : Boolean,
        default : false
    },
    category:[String],
    likes :[{
        type : mongoose.Schema.ObjectId ,
        ref : "User"
    }],
    createdAt:{
        type : Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
},{timestamps : true })


module.exports = mongoose.model('Task',TaskSchema);