import { FETCH_STATUSES } from "../../utils/fields"

export const statusesReducer = (state, action = {}) => {
  if (action.type === FETCH_STATUSES) {
    return action.payload;
  }

  return state || {};
}