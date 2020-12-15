import axios from "axios";
import { CHANGE_POSTS_USER } from "../actions/types";

export const followUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/follow/", { userId });
    if (res.data._id) {
      delete res.data.posts;
      dispatch({ type: CHANGE_POSTS_USER, payload: res.data });
    }
  } catch (err) {
    console.log(err);
  }
};

export const unfollowUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/unfollow/", { userId });
    console.log(res);
    if (res.data._id) {
      delete res.data.posts;
      dispatch({ type: CHANGE_POSTS_USER, payload: res.data });
    }
  } catch (err) {
    console.log(err);
  }
};
