export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_POSTS":
      return action.payload;
    case "CREATE_POSTS":
      return posts;
    default:
      return posts;
  }
};
