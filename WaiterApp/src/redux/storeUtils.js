export const getAllTables = ({tables}) => tables;

export const getTableById = ({tables}, id) =>
  tables && tables.find
  ? tables.find(table => parseInt(table.id) === parseInt(id))
  : {};

export const getAllStatuses = ({statuses}) => statuses;