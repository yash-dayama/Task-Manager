require('../src/db/new mon')
const Task = require('../src/models/task')

Task.findByIdAndDelete('63f715ccc739642d57866bb8').then((task) =>{
    console.log(task);
    return Task.countDocuments({completed : false})
}).then((result) =>{
    console.log(result);
}).catch((e) => {
    console.log(e);
})

const deleteTaskAndCount = async (id) =>{
    const task = await Task.deleteTaskAndCount(id)
    const count = await Task.countDocuments({ completed : false })
    return count
}
deleteTaskAndCount('63f7162776f053767b725994').then((count) =>{
    console.log(count);
}).catch((e) => {
    console.log(e);
})