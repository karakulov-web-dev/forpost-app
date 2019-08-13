import { combineReducers } from "redux";

export default combineReducers({
  app: state => {
    return {
      view: "/login"
    };
  }
});
