const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {console.log('Database Connection Established')})
mongoose.connection.on('error', (error) => {console.log('Database ERROR: ' + error)})
const initConnection = (callback) => {let options = {}
if (process.env.isProduction == true || process.env.isProduction == 'true') {}
}
 mongoose.set('debug', true)
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api")

// const Task = mongoose.model('Task',{
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed:{
//         type: String,
//         default: false
//     }
// })