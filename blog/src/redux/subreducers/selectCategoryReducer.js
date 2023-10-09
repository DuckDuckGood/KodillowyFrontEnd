import { SELECT_CATEGORY } from "../../utils/fields"

export const selectedCategoryReducer = (statePart = '', action) => {
  if (action.type === SELECT_CATEGORY) {
    return action.category;
  }
  return statePart;
}