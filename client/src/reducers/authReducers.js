import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // || used so that if data is empty string, we treat it as false
    default:
      return state;
  }
}
