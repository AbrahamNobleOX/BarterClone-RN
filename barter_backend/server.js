const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const config = require("config");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Init App
const app = express();

// Body-parser Middleware
app.use(express.json());

// Load environment settings
dotenv.config({ path: "./config.env" });

const server = http.createServer(app);
const io = socketio(server).sockets;

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

// * Dev logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Link to router
app.get("/", (req, res) => res.send("Homepage Hit"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/split-payments/compute", require("./routes/api/split-payments"));

//* Websocket *//
require("./middleware/socket")(app, io, db);

// Set Listening Port
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server started on port ${port}`));