import * as api from "../api";
import {
  fetchPosts,
  createMemo,
  updatedPosts,
  fetchUserPosts,
  addComment,
  likedPost,
  deletedPost,
} from "../reducers/posts";

// Actions Creators

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllPosts();

    dispatch(fetchPosts(data));
  } catch (error) {
    console.log(error);
  }
};

// Get Users posts
export const getUserPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getUserPosts();
    console.log("data actions", data);
    dispatch(fetchUserPosts(data));
  } catch (error) {
    console.log(error);
  }
};

// Create posts

export const createPosts = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch(createMemo(data));
  } catch (error) {
    console.log(error);
  }
};

export const updatePosts = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    console.log(data);
    dispatch(updatedPosts(data));
  } catch (error) {
    console.log(error);
  }
};

export const likePosts = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePosts(id);
    dispatch(likedPost(data));
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch(addComment(data));
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch(deletedPost(id));
  } catch (error) {
    console.log(error);
  }
};
