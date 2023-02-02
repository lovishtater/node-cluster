const express = require("express")
const cluster = require('cluster')
const os = require('os');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const productRoutes = require('./router/products')
const cpuLength = os.cpus().length;
const app = express() 
const router = express.Router();
const port = process.env.PORT || 8080;

// DB connection
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/nodecluster',
 {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("server " + process.pid + " connected to db")
}).catch((err) => {
    console.log("err", err)
})

// Middlewares
app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser())
app.use(cors())
app.use('/api', productRoutes)


if(cluster.isMaster) {
    for(let i = 0; i < cpuLength; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died and ${code} and ${signal}`)
    })
} else {
app.listen(port, ()=> {
    console.log("App running at " + port + " port and worker Pid is ~ " + process.pid)
})
}

// app.listen(port, ()=> {
//     console.log("App running at " + port )
// })