import { combineReducers } from "redux";
import locale from "./locale";
import runtime from "./runtime";


import message from "./message";

import path from "./path";


export default combineReducers({
  locale,
  runtime,

  message,

  path,

});
