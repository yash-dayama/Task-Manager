const express = require('express')
const jwt = require('jsonwebtoken')

require('./db/new mon')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000

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

const myFunction =  async () =>{
   try {
    const token = jwt.sign({_id: 'abc123'}, 'thisisjsontoken', {expiresIn: '7 days'})
    console.log(token);

    const data = jwt.verify(token, 'thisisjsontoken')
    console.log(data);
   } catch (error) {
        console.log(error);
   }
}

myFunction()

app.listen(port, () =>{
    console.log('Server running on port ' + port);

})


// const User = require('./models/user')
// const Task = require('./models/task')