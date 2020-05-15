import { reducer as formReducer } from "redux-form";
import { AUTH_LOGIN_FAIL, AUTH_SIGNUP_FAIL } from "../actions/types";

export default formReducer.plugin({
  loginForm: (state, action) => {
    switch (action.type) {
      case AUTH_LOGIN_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  },
  signupForm: (state, action) => {
    switch (action.type) {
      case AUTH_SIGNUP_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  },
});
