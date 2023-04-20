import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Login controller

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userDetails = await User.login(userName, password);
    const token = createToken(userDetails._id);

    res.status(200).json({ userName, userDetails, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up user

const signUpUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const userDetails = await User.signup(userName, email, password);

    const token = createToken(userDetails._id);

    res.status(200).json({ userName, userDetails, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Confirm email
const confirmEmail = async (req, res) => {};

// Authenticate user
const authenticate = async (req, res) => {};

// Get Users

const getAllUsers = async (req, res) => {
  let users;

  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return res.status(500).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

// Get User

const getUser = async (req, res) => {
  try {
    const { userName } = req.params;

    const user = await User.findOne({
      $or: [{ userName: userName }, { email: userName }],
    });

    if (!user) {
      throw Error(`User ${userName} not found`);
    }
    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    // pass: "",
  },
});

let otp;
// Generate OTP
const generateOTP = async (req, res) => {
  try {
    const { userName } = req.body;

    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // const mailOptions = {
    // from: "",
    // to: email,
    // subject: "OTP Verification",
    // // html: `Your OTP is <b>${otp}</b>. It will expire in 10 mins`,
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    // if (error) {
    // console.log(error);
    // res.status(500).json({ error: "Failed to send OTP" });
    // } else {
    // console.log(`Email sent: ${info.response}`);
    // req.app.locals = {
    // OTP: otp,
    // resetSession: true,
    // };
    res.status(200).json({
      msg: "OTP sent successfully",
      userName: userName,
      code: otp,
    });
    // }
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { userName, code } = req.body;

  if (!code) {
    throw Error("All fields must be filled in");
  }

  if (otp === code) {
    res.status(200).json({ message: "OTP verified successfully." });
    req.app.locals.resetSession = true;
  } else {
    res.status(400).json({ error: "Invalid OTP...!!!" });
  }
};

// Create reset session
const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    return res.status(200).send({ flag: req.app.locals.resetSession });
  }
  return res.status(400).send({ error: "Session expired" });
};

// update users
const updateUser = async (req, res) => {
  try {
    // const id = req.query.id;
    const { _id } = req.user;

    if (_id) {
      const body = req.body;

      User.updateOne({ _id: _id }, body, function (err, data) {
        if (err) throw err;

        return res.status(200).send({ msg: "User successfully Updated" });
      });
    } else {
      return res.status(400).json({ error: "User Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// reset password

const resetPassword = async (req, res) => {
  const { userName, password, confirmPassword, code } = req.body;

  // if (req.app.locals.resetSession)
  // return res.status(401).send({ error: "Session expired" });

  if (otp !== code) {
    res.status(400).json({ error: "Invalid OTP." });
  } else if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match." });
  } else {
    const user = await User.findOne({
      $or: [{ userName: userName }, { email: userName }],
    });
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to hash password." });
      } else {
        const user = await User.findOneAndUpdate(
          { userName: userName },
          { password: hash }
        );
        console.log(`Password updated for user ${userName}`);
      }
    });

    if (!user) {
      res.status(400).json({ error: "User not found." });
    } else {
      user.password = password;
      await user.save();
      res.status(200).json({ message: "Password reset successful." });
    }
  }
};

export {
  loginUser,
  signUpUser,
  confirmEmail,
  authenticate,
  getAllUsers,
  getUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  updateUser,
  resetPassword,
};
