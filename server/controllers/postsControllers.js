import mongoose from "mongoose";
import UserPosts from "../models/postsModels.js";
import UserModel from "../models/userModel.js";
import badWords from "bad-words";

// to get all posts
const getAllPosts = async (req, res) => {
  let post;
  try {
    post = await UserPosts.find().populate("user").sort({ createdAt: -1 });
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(404).json({ message: "There was a error" });
  }

  return res.status(200).json({ post });
};

// to create posts
const createPosts = async (req, res) => {
  const { posts, user = user_id } = req.body;

  let existUser;

  try {
    existUser = await UserModel.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if (!existUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const filter = new badWords();

  const postMessage = posts.message;
  const postTitle = posts.title;

  const filteredMessage = filter.clean(postMessage);
  const filteredTitle = filter.clean(postTitle);

  let post;

  try {
    post = new UserPosts({
      title: filteredTitle,
      message: filteredMessage,
      tags: posts.tags,
      pictures: posts.pictures,
      location: posts.location,
      date: new Date(`${posts.date}`),
      user,
    });
    console.log(post);

    // Creating sessions to push posts to user
    const session = await mongoose.startSession();
    session.startTransaction();
    existUser.posts.push(post);
    await existUser.save({ session });
    post = await post.save({ session });
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
};

// Get User Posts
const getUserPosts = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await UserModel.find({ id })
      .populate("posts")
      .sort({ createdAt: -1 });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "There are no user posts" });
  }
};

// Get Post By Id
const getPostById = async (req, res) => {
  const id = req.params.id;

  let post;

  try {
    post = await UserPosts.findById(id);
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
  console.log("id", req.params.id);
  console.log("body", req.body);

  const id = req.params.id;
  const post = req.body;
  console.log("post", post);

  // Check is the id  valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No Post has been Found" });

  let updatedPost;

  const filter = new badWords();

  const postMessage = post.message;
  const postTitle = post.title;

  const filteredMessage = filter.clean(postMessage);
  const filteredTitle = filter.clean(postTitle);

  try {
    updatedPost = await UserPosts.findByIdAndUpdate(
      id,
      {
        title: filteredTitle,
        message: filteredMessage,
        tags: post.tags,
        pictures: post.pictures,
        location: post.location,
        date: new Date(`${post.date}`),
      },
      { new: true }
    );
  } catch (error) {
    return console.log(error);
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  let deletePost;
  if (!id) return res.status(404).json({ message: "No id found" });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    deletePost = await UserPosts.findById(id).populate("user");
    deletePost.user.posts.pull(deletePost);
    await deletePost.user.save({ session });
    deletePost = await UserPosts.findByIdAndRemove(id);
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
};

export {
  getAllPosts,
  createPosts,
  getUserPosts,
  getPostById,
  updatePosts,
  deletePost,
};
