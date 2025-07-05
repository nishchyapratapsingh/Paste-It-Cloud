const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/pasteitcloud';

const connectToMongo =async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("Mongo connected successfully");
    }
    catch(error) {
        console.error("Error: ", error); 
    }
}

module.exports = connectToMongo;