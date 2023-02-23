const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {console.log('Database Connection Established')})
mongoose.connection.on('error', (error) => {console.log('Database ERROR: ' + error)})
const initConnection = (callback) => {let options = {}
if (process.env.isProduction == true || process.env.isProduction == 'true') {}
}
 mongoose.set('debug', true)
mongoose.connect("mongodb://127.0.0.1:27017/task-manager")
// .then( () => console.log("Connection Successfull.."))
// .catch( (err) => console.log(err))

// document sturcture

const id = new mongoose.Schema.ObjectId()
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [2, "Min 2 Letters"],
        maxlength: 10
    },
    categoryID: ObjectId,
    ctype: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    viedos:{
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error("Viedos cannot be negative")
            }
        }
    },
    author: String,
    active: Boolean,
    date:{
        type: Date,
        default: Date.now
    }
    
})

// model >> is wrapper on the Mongoose Schema
// with help of models we can easily perform the curd operations

const Playlist = new mongoose.model("Playlist", playlistSchema);

// Instert a new Playlist
const createDocument = async() => {
        
try{
    
    // const jsPlaylist = new Playlist({
    //     name: "JS",
    //     ctype: "Front End ",
    //     viedos: 100,
    //     author: "TT Technical",
    //  active: true
    // })

    // const mongoPlaylist = new Playlist({
    //     name: "Mongo DB",
    //     ctype: "Database",
    //     viedos: 150,
    //     author: "Code With Harry",
    //  active: true
    // })

    // const expressPlaylist = new Playlist({
    //     name: " Express JS",
    //     ctype: "Backend",
    //     viedos: 20,
    //     author: "Simplearn",
    //  active: true
    // })

    // const flutterPlaylist = new Playlist({
    //     name: "Flutter",
    //     ctype: "Cross Platform",
    //     viedos: 20,
    //     author: "CodePur",
    //  active: true
    // })

    
    const mongoosePlaylist = new Playlist({
        name: "NO SQL",
        ctype: "Database",
        viedos: -1,
        author: "Yash Dayama",
     active: true
    })

    const result = await Playlist.insertMany([ mongoosePlaylist ])
    console.log(result)
    }
    catch(err){
        console.log(err);
    }
}
createDocument()

// Reading Document

const getDocument = async () =>{
    try{
        const result = await Playlist
        .find()
            // {author: "Code With Harry"})
        .select({name: 1})
        .sort({name : -1})
        // .countDocuments()
        // .limit(1)
        console.log(result); 
    }catch(err)
    {
        console.log(err);
    }
}

// getDocument()

// updateDocument
const updateDocument = async(_id) => {
    try{
        const result = await Playlist.findByIdAndUpdate({_id}, {
            $set:  {
                name: "Advance ~ JavaScript!! "
            }  
        },{
            new:true,
            useFindAndModify:false
        }
        )
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

// updateDocument("63f5988bd66d7fc2ad608dc9")


// deleteDocument

const deleteDocument = async (_id) => {
    try{
        const result = await Playlist.deleteOne({_id})
        console.log(result);
    }catch(err){
        console.log(err);
    }

}

// deleteDocument("63f4b56661767a5a1cba6304")