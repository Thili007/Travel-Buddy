import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TripPlanModel = new Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    message: {
      type: "String",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    picturePath: {
      type: [String],
      default: [],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "UserData",
      required: true,
    },
  },
  { timestamps: true }
);

const UserTripPlane = mongoose.model("userTripPlane", TripPlanModel);

export default UserTripPlane;
