export const searchStringReducer = (searchString = '', payload) => {
  switch(payload.type) {
    case 'SET_SEARCH_STRING':
      return payload.searchString;
    default:
      return searchString;
  }
}