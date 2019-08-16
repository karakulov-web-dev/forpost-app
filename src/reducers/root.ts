import { combineReducers } from "redux";
import { auth } from "./auth";
import { cams } from "./cams";

export default combineReducers({
  app: state => {
    return {
      view: "/panel"
    };
  },
  auth,
  cams
});
