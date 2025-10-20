import { combineReducers } from "@reduxjs/toolkit";
import messages from "../MessageSlice";

const rootReducer = combineReducers({
  messages,
});

export default rootReducer;
