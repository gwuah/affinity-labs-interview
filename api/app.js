const fileUpload = require("express-fileupload");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(fileUpload());

app.post("/upload", (req, res) => {
  const path = `${__dirname}/${req.files.csv.name}`;
  req.files.csv.mv(path);
});

app.get("/", (req, res) => {
  res.send("Affinity Server 😎");
});

module.exports = app;
