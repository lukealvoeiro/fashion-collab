import {
  FETCH_POSTS,
  NEW_POST,
  LIKE_POST,
  FAIL_FETCH_POSTS,
  CHANGE_POSTS_USER,
} from "../actions/types";

const initialState = {
  list: [],
  correspondingTo: null,
};

export default function (state = initialState, action) {
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
      if (foundIndex >= 0) {
        let currLikeState = state.list[foundIndex].isLiked;
        state.list[foundIndex] = { ...action.payload, isLiked: !currLikeState };
      }
      return { ...state };
    case CHANGE_POSTS_USER:
      return { ...state, correspondingTo: action.payload };
    case FAIL_FETCH_POSTS:
    default:
      return state;
  }
}
