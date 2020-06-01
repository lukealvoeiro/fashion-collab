import {
  FETCH_POSTS,
  NEW_POST,
  LIKE_POST,
  FAIL_FETCH_POSTS,
} from "../actions/types";
import _ from "lodash";

const initialState = {
  list: [],
  correspondingTo: null,
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        list: action.payload.posts,
        correspondingTo: action.payload.user,
      };
    case NEW_POST:
      state.list.push({ ...action.payload, isLiked: false });
      return { ...state };
    case LIKE_POST:
      let foundIndex = state.list.findIndex(
        (post) => post._id == action.payload._id
      );
      let currLikeState = state.list[foundIndex].isLiked;
      state.list[foundIndex] = { ...action.payload, isLiked: !currLikeState };
      return { ...state };
    case FAIL_FETCH_POSTS:
    default:
      return state;
  }
}
