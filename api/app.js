const fileUpload = require("express-fileupload");
const express = require("express");
const cors = require("cors");
const utils = require("./utils");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(fileUpload());

app.post("/upload", (req, res) => {
  const path = `${__dirname}/${req.files.csv.name}`;
  req.files.csv.mv(path, err => {
    utils.billCreator(path, results => {
      res.json({ results }).status(200);
    });
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({ name: "Affinity Server 😎" });
});

module.exports = app;
