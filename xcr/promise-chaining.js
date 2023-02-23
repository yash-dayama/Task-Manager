require('../src/db/new mon')
const User = require('../src/models/user')


// 
User.findByIdAndUpdate('63f70594381f97218a6162a4', {age: 1}).then((user) =>{
    console.log(user);
    return User.countDocuments({ age: 1 })
}).then((result) =>{
    console.log(result);
}).catch((e) => {
    console.log(e);
})

// Using ASYNC and AWAIT

const updateAgeAndCount = async(id, age) =>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('63f7056b2fcec88828e392a1', 2).then((count) =>{
    console.log(count);
}).catch((e) =>{
    console.log(e);
})