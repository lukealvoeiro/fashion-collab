import axios from "axios";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_USER,
  EMAIL_TAKEN,
  ALTER_AUTH_MODAL,
  AUTH_LOGIN_FAIL,
  AUTH_SIGNUP_FAIL,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/current_user");
    if (res.data) {
      dispatch({ type: USER_LOADED, payload: res.data });
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  } catch (error) {
    // dispatch(returnErrors(error.response.data, error.response.statusz));
    dispatch({ type: AUTH_ERROR });
  }
};

export const logoutUser = () => async (dispatch) => {
  const res = await axios.get("/api/logout");
  dispatch({ type: LOGOUT_USER });
};

export const signUpUser = (values) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/register", values);
    if (res.data.success) {
      dispatch({ type: USER_LOADED, payload: res.data.body });
    } else {
      dispatch({ type: AUTH_SIGNUP_FAIL, payload: res.data });
    }
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const signInUser = (values) => async (dispatch) => {
  const res = await axios.post("/auth/login", values);
  if (res.data.success) {
    dispatch({ type: USER_LOADED, payload: res.data.body });
  } else {
    dispatch({ type: AUTH_LOGIN_FAIL, payload: res.data });
  }
};

export const alterAuthModal = (newType) => async (dispatch) => {
  dispatch({ type: ALTER_AUTH_MODAL, payload: newType });
};
