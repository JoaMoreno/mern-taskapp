const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Initializations
const app = express();
require("./database")

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use("/api", require("./routes/routes"))
module.exports = app;