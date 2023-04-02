import { createSlice } from "@reduxjs/toolkit";

const postState = {
  posts: [],
  post_id: null,
  userPosts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState: postState,
  reducers: {
    getPostID: (state, action) => {
      state.post_id = action.payload;
    },
    fetchPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    fetchUserPosts: (state, action) => {},
    createMemo: (state, action) => {
      return [...state.posts, action.payload];
    },
    updatedPosts: (state, action) => {
      return state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    deletedPost: (state, action) => {
      return state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const {
  fetchPosts,
  fetchUserPosts,
  createMemo,
  getPostID,
  updatedPosts,
  deletedPost,
} = postsSlice.actions;

export default postsSlice.reducer;
