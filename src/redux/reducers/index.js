import { combineReducers } from "@reduxjs/toolkit";
import messages from "../MessagesSlice";

const rootReducer = combineReducers({
  messages,
});

export default rootReducer;
