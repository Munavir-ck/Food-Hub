const mongoose = require('mongoose')
require("dotenv").config()
mongoose.set("strictQuery", false);
const DB=process.env.MYDB
module.exports.dbConnection=function (cb){
    mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        cb(true)
    }).catch((err)=>{
        console.log(err);
        cb(false)
    })
    
}