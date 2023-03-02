const express = require('express')
const jwt = require('jsonwebtoken')

require('dotenv').config()
require('./db/new mon')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// app.use((req,res, next) => {
//    if(req.method === 'GET'){
//     res.send('GET request are disabled')
//    }else{
//     next()
//    }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon')
// })


// const bcrypt = require('bcrypt');

// const myFunction =  async () =>{
//    try {
//     const token = jwt.sign({_id: 'abc123'}, 'thisisjsontoken', {expiresIn: '7 days'})
//     console.log(token);

//     const data = jwt.verify(token, 'thisisjsontoken')
//     console.log(data);
//    } catch (error) {
//         console.log(error);
//    }
// }

// myFunction()

// const multer  = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits:{
//         filesize: 1000000
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a Document'))
//         }
//         cb(undefined, true)
//     }
// })


// middleware
// const errorMiddleware = (req, res, next) => {
//     throw new Error('From by middelware')
// }
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()

// },(error, req, res, next) => {
//     res.status(400).send({error: error.message})
// }
// )

app.listen(port, () =>{
    console.log('Server running on port ' + port);

})


// // const User = require('./models/user')
// const Task = require('./models/task')
// const main = async () =>{
//     const task = await Task.findById('')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner);
// }