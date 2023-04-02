import * as api from "../api";
import {
  fetchPosts,
  createMemo,
  updatedPosts,
  deletedPost,
  fetchUserPosts,
} from "../reducers/posts";

// Actions Creators

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllPosts();
    dispatch(fetchPosts({ posts: data.post }));
  } catch (error) {
    console.log(error);
  }
};

// Get Users posts
export const getUserPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getUserPosts();
    dispatch(fetchUserPosts({ userPosts: data.post }));
  } catch (error) {
    console.log(error);
  }
};

// Create posts

export const createPosts = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch(createMemo({ posts: data }));
  } catch (error) {
    console.log(error);
  }
};

export const updatePosts = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch(updatedPosts(data));
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
