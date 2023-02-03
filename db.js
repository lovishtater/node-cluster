const mongoose  = require('mongoose');

exports.connectToDB = () => {
    mongoose.connect('mongodb://localhost:27017/ecommerce', 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("server " + process.pid + " connected to db")
    })
    .catch((err) => {
        console.log("Db connection failed", err)
    })
}