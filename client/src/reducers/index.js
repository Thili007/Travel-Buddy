import { combineReducers } from "redux";

import posts from "./posts";
import displayPages from "./displayPages";
import userSetup from "./userSetup";
import pageLoader from "./pageLoader";
import changeMode from "./mode";

export default combineReducers({
  posts,
  displayPages,
  userSetup,
  pageLoader,
  changeMode,
});
