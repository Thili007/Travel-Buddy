import axios from "axios";

const url = "http://localhost:4000/api/user";

export const getAllPosts = async () => {
  const response = await axios.post(`${url}/getAllPosts`);
  return response;
};

export const createPost = async (posts) =>
  axios.post(
    `${url}/createPosts`,
    {
      posts,
      user: localStorage.getItem("USER_ID").slice(1, -1),
    },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("TOKEN").slice(1, -1)}`,
      },
    }
  );

export const updatePost = async (id, updatePost) =>
  axios.put(`${url}/updatePosts/${id}`, updatePost, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("TOKEN").slice(1, -1)}`,
    },
  });

export const likePost = async (id) =>
  axios.put(
    `${url}/${id}/likePost`,
    { userId: `${localStorage.getItem("USER_ID").slice(1, -1)}` },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("TOKEN").slice(1, -1)}`,
      },
    }
  );

export const comment = (value, id) =>
  axios.post(
    `${url}/${id}/commentPost`,
    { value },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("TOKEN").slice(1, -1)}`,
      },
    }
  );

export const deletePost = async (id) =>
  axios.delete(`${url}/deletePost/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("TOKEN").slice(1, -1)}`,
    },
  });

export const getUserPosts = async () => {
  const id = localStorage.getItem("USER_ID").slice(1, -1);
  const token = localStorage.getItem("TOKEN").slice(1, -1);
  const data = await axios.get(`${url}/getUserPosts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};
