export const listsReducer = (lists = [], payload) => {
  switch(payload.type) {
    case 'ADD_LIST':
      const newList = {
        id: lists.length + 1,
        ...payload.newList,
      }
      return [...lists, newList]
    default:
      return lists;
  }
}