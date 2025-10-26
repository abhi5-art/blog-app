const mongoose = require('mongoose');
const {connection_url} = require('../config/keys');

const connectMongodb =async ()=>{
     try{
        await mongoose.connect(connection_url);

        console.log("Database Connection Succesfull...");
     }catch(error){
        console.log(error.message);
     }
};

module.exports=connectMongodb;