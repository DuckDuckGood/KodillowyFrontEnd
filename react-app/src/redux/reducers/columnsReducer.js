export const columnsReducer = (columns = [], payload) => {
  switch(payload.type) {
    case 'ADD_COLUMN':
      const newColumn = {
        id: columns.length + 1,
        ...payload.newColumn,
      }
      return [...columns, newColumn]
    default:
      return columns;
  }
}