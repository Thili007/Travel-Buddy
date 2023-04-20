import { combineReducers } from "redux";

import posts from "./posts";
import cities from "./cityDetails";
import displayPages from "./displayPages";
import pageLoader from "./pageLoader";
import changeMode from "./mode";
import isAuth from "./isAuth";

export default combineReducers({
  posts,
  displayPages,
  cities,
  pageLoader,
  changeMode,
  isAuth,
});
