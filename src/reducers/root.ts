import { combineReducers } from "redux";

export default combineReducers({
  app: state => {
    return {
      view: "/login"
    };
  },
  auth: state => {
    return {
      login: "",
      password: "",
      save: "",
      error: ""
    };
  }
});
