import mongoose from "mongoose";
import UserPosts from "../models/postsModels.js";
import UserModel from "../models/userModel.js";
import badWords from "bad-words";

// to get all posts
const getAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await UserPosts.find().populate("user").sort({ createdAt: -1 });
  } catch (error) {
    return console.log(error);
  }
  if (!posts) {
    return res.status(404).json({ message: "There was a error" });
  }

  return res.status(200).json({ posts });
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
      user: existUser,
    });

    // Creating sessions to push posts to user
    const session = await mongoose.startSession();
    session.startTransaction();
    existUser.posts.push(post);
    await existUser.save({ session });
    post = await post.save({ session });
    session.commitTransaction();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "Unable To Create post" });
    return console.log(error);
  }
};

const getUserPosts = async (req, res) => {
  const id = req.params.id;
  console.log("user id", id);

  try {
    const posts = await UserPosts.find({ user: id }).sort({ createdAt: -1 });
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
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
  if (!updatePosts) {
    return res.status(404).json({ message: "Unable to Update the post" });
  }
  res.status(200).json({ updatePosts });
};

const likePost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("post id", req.params.id);
    const { userId } = req.body;
    console.log("userId", req.body);
    const post = await UserPosts.findById(id);
    const isLiked = post.likes.indexOf(userId);

    console.log("post", post);

    if (isLiked === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(isLiked, 1);
    }

    const updatedPost = await UserPosts.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const commentPost = async (req, res) => {
  const id = req.params.id;
  const { value } = req.body;

  const post = await UserPosts.findById(id);

  post.comments.push(value);

  const updatedPost = await UserPosts.findByIdAndUpdate(
    id,
    { comments: post.comments },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  let deletePost;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    deletePost = await UserPosts.findById({ _id: id }).populate("user");
    await deletePost.user.posts.pull(deletePost);
    await deletePost.user.save({ session });
    deletePost = await UserPosts.findOneAndDelete({ _id: id });
    session.commitTransaction();
    res
      .status(200)
      .json({ message: `Post with id: ${id} deleted successfully.` });
  } catch (error) {
    res.status(500).send("Error deleting post.");
    return console.log(error);
  }
};

export {
  getAllPosts,
  createPosts,
  getUserPosts,
  getPostById,
  updatePosts,
  likePost,
  commentPost,
  deletePost,
};
