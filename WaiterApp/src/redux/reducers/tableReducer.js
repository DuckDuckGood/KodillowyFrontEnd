import { FETCH_TABLES } from "../../utils/fields"

export const tableReducer = (state, action = {}) => {
  if (action.type === FETCH_TABLES) {
    return action.payload || {};
  }

  return state || {};
}