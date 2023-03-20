import * as api from "../api";

// Actions Creators

export const getPosts = () => async (dispatch) => {
  try {
    const { getAllPosts } = await api.getAllPosts();
    dispatch({ type: "FETCH_ALL_POSTS", payload: getAllPosts });
  } catch (error) {
    console.log(error.message);
  }
};
