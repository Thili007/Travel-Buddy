const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Login controller

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userDetails = await User.login(userName, password);
    const token = createToken(userDetails._id);

    res.status(200).json({ userName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up user

const signUpUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await User.signup(userName, email, password);

    const token = createToken(user._id);

    res.status(200).json({ userName, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signUpUser };
