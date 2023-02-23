const mongoose = require('mongoose');

const Task = mongoose.model('Task',{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: String,
        default: false
    }
})

module.exports = Task