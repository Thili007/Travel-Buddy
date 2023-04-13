import { createSlice } from "@reduxjs/toolkit";

const postState = {
  posts: [],
  post_id: null,
  userPosts: [],
  post: [],
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
    fetchUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    setPost: (state, action) => {
      const post =
        state.posts.find((item) => item._id === action.payload) ||
        state.userPosts.find((item) => item._id === action.payload);
      state.post = post || null;
    },
    createMemo: (state, action) => {
      state.posts = [...state.posts, action.payload];
      state.userPosts = [...state.posts, action.payload];
    },
    updatedPosts: (state, action) => {
      state.posts = [
        state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      ];
      state.userPosts = [
        state.userPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      ];
    },
    likedPost: (state, action) => {
      if (state.posts) {
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              likes: action.payload.likes,
            };
          }
          return post;
        });
      }
      if (state.userPosts) {
        state.userPosts = state.userPosts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              likes: action.payload.likes,
            };
          }
          return post;
        });
      }
    },
    addComment: (state, action) => {
      if (state.posts) {
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              comments: action.payload.comment,
            };
          }
          return post;
        });
      }

      if (state.userPosts) {
        state.userPosts = state.userPosts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              comments: action.payload.comment,
            };
          }
          return post;
        });
      }
    },
    deletedPost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.userPosts = state.userPosts.filter(
        (post) => post._id !== action.payload
      );
    },
  },
});

export const {
  fetchPosts,
  fetchUserPosts,
  createMemo,
  setPost,
  getPostID,
  updatedPosts,
  deletedPost,
  addComment,
  likedPost,
} = postsSlice.actions;

export default postsSlice.reducer;
