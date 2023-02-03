const express = require("express");
const cluster = require("cluster");
const os = require("os");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const productRoutes = require("./router/products");
const { connectToDB } = require("./db");
const cpuLength = os.cpus().length;
const app = express();
const port = process.env.PORT || 8080;

// DB connection
connectToDB();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", productRoutes);

if (cluster.isMaster) {
  for (let i = 0; i < cpuLength; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died and ${code} and ${signal}`);
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    console.log(
      "App running at " + port + " port and worker Pid is ~ " + process.pid
    );
  });
}

// app.listen(port, ()=> {
//     console.log("App running at " + port )
// })
