const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userModel = new Schema({
  userName: {
    type: "string",
    required: true,
    unique: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

// static signup methods

userModel.statics.signup = async function (userName, email, password) {
  // Validations

  if (!userName || !email || !password) {
    throw Error("All fields must be Filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email must be a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must be Strong");
  }

  const match = await this.findOne({ $or: [{ userName }, { email }] });

  if (match) {
    throw Error(`${userName} or ${email} is already registered`);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ userName, email, password: hash });
  return user;
};

// userModel login methods

userModel.statics.login = async function (user, password) {
  // validations

  if (!user || !password) {
    throw Error("All fields must be filled");
  }

  const userFind = await this.findOne({
    $or: [{ userName: user }, { email: user }],
  });

  if (!userFind) {
    throw Error("No user found!");
  }

  const match = await bcrypt.compare(password, userFind.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return userFind;
};

module.exports = mongoose.model("UserData", userModel);
