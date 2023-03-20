import { combineReducers } from "redux";

import posts from "./posts";
import displayPages from "./displayPages";

export default combineReducers({ posts, displayPages });
