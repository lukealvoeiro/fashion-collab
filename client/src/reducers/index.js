import { combineReducers } from "redux";
import formReducer from "./formReducers";
import authReducer from "./authReducers";
import surveysReducer from "./surveysReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveysReducer,
});
