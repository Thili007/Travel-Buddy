const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Login controller

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
};
