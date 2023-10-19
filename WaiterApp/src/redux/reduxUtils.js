export const fetchTables = () => {
  return fetch('http://localhost:3131/api/tables')
  .then(res => res.json());
}

export const fetchStatuses = () => {
  return fetch('http://localhost:3131/api/statuses')
  .then(res => res.json());
}