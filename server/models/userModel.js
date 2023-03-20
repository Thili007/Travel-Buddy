import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
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
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    gender: {
      type: "string",
    },
    profilePicture: {
      type: "string",
      default: "",
    },

    posts: [{ type: mongoose.Types.ObjectId, ref: "PostModel" }],
    trips: [{ type: mongoose.Types.ObjectId, ref: "TripPlanModel" }],
  },
  { timestamps: true }
);

// static signup methods

UserModel.statics.signup = async function (userName, email, password) {
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

UserModel.statics.login = async function (userName, password) {
  // validations

  if (!userName || !password) {
    throw Error("All fields must be filled");
  }

  const userFind = await this.findOne({
    $or: [{ userName: userName }, { email: userName }],
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

const UserData = mongoose.model("UserData", UserModel);
export default UserData;
