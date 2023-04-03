import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    likes: { type: [String], default: [] },
    comments: {
      type: [String],
      default: [],
    },
    pictures: String,
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "UserData",
      required: true,
    },
  },
  { timestamps: true }
);

const UserPosts = mongoose.model("userPost", PostModel);

export default UserPosts;
