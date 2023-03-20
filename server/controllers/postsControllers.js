import mongoose from "mongoose";
import PostModel from "../models/postsModels.js";
import UserModel from "../models/userModel.js";

// to get all posts
const getAllPosts = async (req, res) => {
  let getAllPosts;
  try {
    getAllPosts = await PostModel.find()
      .populate("user")
      .sort({ createdAt: -1 });
  } catch (error) {
    return console.log(error);
  }
  if (!getAllPosts) {
    return req.status(404).json({ message: "There was a error" });
  }
  return res.status(200).json({ getAllPosts });
};

// to create posts
const createPosts = async (req, res) => {
  const { title, message, tags, picturePath, location, date, user } = req.body;

  if ((!title, !message, !tags, !location, !date, !user)) {
    return res.status(404).json({
      message: "Please fill the all fields to build perfect Experience",
    });
  }

  let existUser;

  try {
    existUser = await UserModel.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if (!existUser) {
    return res.status(404).json({ message: "User not found" });
  }

  let post;

  try {
    post = new PostModel({
      title,
      message,
      tags,
      picturePath,
      location,
      date: new Date(`${date}`),
      user,
    });

    // Creating sessions to push posts to user
    const session = await mongoose.startSession();
    session.startTransaction();
    existUser.posts.push(post);
    await existUser.save({ session });
    session.commitTransaction();
    post = await post.save();
  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    res
      .status(404)
      .json({ message: "There was an error when the post saving" });
  }

  return res.status(200).json({ post });
};

// Get User Posts
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await PostModel.find({ userId });
    response.status(200).json(post);
  } catch (error) {
    response.status(404).json({ message: error });
  }
};

// Get Post By Id
const getPostById = async (req, res) => {
  const id = req.params.id;

  let post;

  try {
    post = await PostModel.findById(id);
  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    return res.status(404).json({ message: "No such post found" });
  }

  return res.status(200).json({ post });
};

// to update post
const updatePosts = async (req, res) => {
  const id = req.params.id;
  const { title, message, tags, picturePath, location, date } = req.body;

  if ((!title, !message, !tags, !picturePath, !location, !date)) {
    return res.status(404).json({
      message: "Please fill the all fields to build perfect Experience",
    });
  }
  let updatePost;

  try {
    updatePost = await PostModel.findByIdAndUpdate(id, {
      title,
      message,
      tags,
      picturePath,
      location,
      date: new Date(`${date}`),
    });
  } catch (error) {
    return console.log(error);
  }

  if (!updatePost) {
    res.status(500).json({ message: "unable to update" });
  }

  return res.status(200).json({ message: "successfully updated" });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  let deletePost;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    deletePost = await PostModel.findById(id).populate("user");
    deletePost.user.posts.pull(deletePost);
    await deletePost.user.save({ session });
    deletePost = await PostModel.findByIdAndRemove(id);
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }

  if (!deletePost) {
    return res.status(404).json({ message: "Unable to find the post" });
  }

  return res.status(200).json({ message: "Post Successfully Removed" });
};

export {
  getAllPosts,
  createPosts,
  getUserPosts,
  getPostById,
  updatePosts,
  deletePost,
};
