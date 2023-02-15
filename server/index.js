require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(function (req, res, next) {
  next();
});

const port = process.env.PORT || 5000;
const db = process.env.MONGO_DB;

mongoose
  .connect(db, {})
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`connected to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
