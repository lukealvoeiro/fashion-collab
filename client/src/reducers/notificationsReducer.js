import { AUTH_ERROR, UPDATE_NOTIFICATIONS } from "../actions/types";

const initialState = {
  messages: [],
  alerts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
        alerts: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
