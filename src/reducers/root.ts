import { combineReducers } from "redux";
import { auth } from "./auth";

export default combineReducers({
  app: state => {
    return {
      view: "/login"
    };
  },
  auth
});
