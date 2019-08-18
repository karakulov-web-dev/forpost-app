import { combineReducers } from "redux";
import { auth } from "./auth";
import { cams } from "./cams";
import { app } from "./app";

export default combineReducers({
  app,
  auth,
  cams
});
