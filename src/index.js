const express = require('express')
require('./db/new mon')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () =>{
    console.log('Server running on port ' + port);
})

const bcrypt = require('bcrypt');

const myFunction =  async () =>{
    const password = 'QWer12345!'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('wer12345!', hashedPassword)
    console.log(isMatch);
}

myFunction()