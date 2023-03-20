import axios from "axios";

const url = "http://localhost:4000/api/user/getAllPosts";

export const getAllPosts = async () => {
  const response = await axios.post(url);

  if (response.status !== 200) {
    return console.log("Response status: " + response.status);
  }
  const data = response.data;
  return data;
};
