const mongoose = require('mongoose')

const userDataSchema = mongoose.Schema({
    
    name: {
        type: String,
        trim : true,
        required: true,
    },
    priority: {
        type: String,
        required: true,
      },
      createDate:{
        type: Date,
        default: Date.now,
      },
      dueDate:{
        type: Date,
        required: true,
      },
    taskStatus:{
        type: String,
        required: true,
    }    
  }
)

const TaskData = mongoose.model('TaskData', userDataSchema)

module.exports = TaskData
