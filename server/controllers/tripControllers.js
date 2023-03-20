import { response } from "express";
import mongoose from "mongoose";
import TripPlanModel from "../models/postsModels.js";
import UserModel from "../models/userModel.js";

const getAllTrips = async (req, res) => {
  let getAllTrips;

  try {
    getAllTrips = await TripPlanModel.find()
      .populate("user")
      .sort({ createdAt: -1 });
  } catch (error) {
    return console.log(error);
  }

  if (!getAllTrips) {
    return req.status(404).json({ message: "There was a  error" });
  }
  return res.status(200).json({ getAllTrips });
};

const createTrip = async (req, res) => {
  const post = req.body;

  if ((!post.title, !post.message, !post.tags, !post.user, !post.date)) {
    return res.status(404).json({
      message: "Please fill the all fields to give idea about your Buddy Trip",
    });
  }

  let existUser;

  try {
    existUser = await UserModel.findById(post.user._id);
  } catch (error) {
    return console.log(error);
  }

  const newTrip = new TripPlanModel({
    ...post,
    date: new Date().toISOString(),
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    existUser.trips.push(newTrip);
    await existUser.save({ session });
    session.commitTransaction();
    await newTrip.save();
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateTrip = async (req, res) => {
  const { id } = req.params;

  const { title, message, picturePath, tags, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `No Buddy Trip found with this ${id}` });
  }

  const updatedTrip = { title, message, picturePath, tags, date, _id: id };

  await TripPlanModel.findByIdAndUpdate(id, updatedTrip, { new: true });

  if (!updatedTrip) {
    return res.status(500).json({ message: "Unable to Update the Buddy Trip" });
  }
  return res.status(200).json({ updatedTrip });
};

const deleteTrip = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: `No Buddy Trip found 
  with this ${id}`,
    });
  }

  let deletePost;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    deletePost = await TripPlanModel.findById(id).populate("user");
    deletePost.user.posts.pull(deletePost);
    await deletePost.user.save({ session });
    deletePost = await TripPlanModel.findByIdAndRemove(id);
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }

  if (!deletePost) {
    return res.status(404).json({ message: "Unable to find the post" });
  }

  return res.status(200).json({ message: "Post Successfully Removed" });
};

const likeTrip = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(404).json({ message: "To like Post You have to Login" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Post Not Found" });
  }

  const trip = await TripPlanModel.findById(id);

  const index = trip.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    trip.likes.push(req.userId);
  } else {
    trip.likes = trip.likes.filter((id) => id !== String(req.userId));
  }

  const updatedTrip = await TripPlanModel.findByIdAndUpdate(id, trip, {
    new: true,
  });

  res.status(200).json({ updatedTrip });
};

const tripComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const postComment = await TripPlanModel.findById(id);

  postComment.comments.push(comment);

  const updatedTrip = await TripPlanModel.findByIdAndUpdate(id, postComment, {
    new: true,
  });

  res.json(updatedTrip);
};

export {
  getAllTrips,
  createTrip,
  updateTrip,
  deleteTrip,
  likeTrip,
  tripComment,
};
