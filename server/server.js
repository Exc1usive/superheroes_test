const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(ATLAS_URI, () => console.log("Successfully connect to mongoDB"));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

require("./routes/api")(app);

const server = app.listen(port, () => console.log("Server start on port - " + port));

module.exports.server = server;
