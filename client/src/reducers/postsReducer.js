import {
  FETCH_POSTS,
  NEW_POST,
  LIKE_POST,
  FAIL_FETCH_POSTS,
} from "../actions/types";
import _ from "lodash";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case NEW_POST:
      state.push({ ...action.payload, isLiked: false });
      return _.cloneDeep(state);
    case LIKE_POST:
      let foundIndex = state.findIndex(
        (post) => post._id == action.payload._id
      );
      let currLikeState = state[foundIndex].isLiked;
      state[foundIndex] = { ...action.payload, isLiked: !currLikeState };
      return _.cloneDeep(state);
    case FAIL_FETCH_POSTS:
    default:
      return state;
  }
}
