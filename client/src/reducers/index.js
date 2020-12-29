import { combineReducers } from "redux";
import formReducer from "./formReducers";
import authReducer from "./authReducers";
import surveysReducer from "./surveysReducer";
import postsReducer from "./postsReducer";
import notificationsReducer from "./notificationsReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveysReducer,
  posts: postsReducer,
  notifications: notificationsReducer,
});
