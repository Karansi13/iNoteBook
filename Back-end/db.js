const mongoose = require('mongoose');


const mongoURI = 'mongodb://127.0.0.1:27017/inotebook'

const connectToMongo= async()=>{
    await mongoose.connect(mongoURI);
    console.log("connected to mongo successfully");
}

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{   //()=>{ Callback function  or i can use async await also
//         console.log("connected to mongo successfully")
//     })
// }


module.exports = connectToMongo