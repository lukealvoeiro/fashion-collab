import axios from "axios";
import { AUTH_ERROR, UPDATE_NOTIFICATIONS } from "./types";

export const fetchNotifications = () => async (dispatch) => {
  try {
    console.log("trying to fetch notifications");
    const res = await axios.get("/api/user/notifications");
    if (res.status === 504) {
      return;
    }
    if (res.data) {
      dispatch({ type: UPDATE_NOTIFICATIONS, payload: res.data });
    }
  } catch (error) {
    // TODO: change auth error to something that wont redirect
    // us to the login page if the notifications query is not sucessful
    dispatch({ type: AUTH_ERROR });
  }
};
