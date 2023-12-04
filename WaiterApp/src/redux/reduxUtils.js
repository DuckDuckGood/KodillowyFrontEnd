export const fetchTables = () => {
  console.log('Trying to fetch tables...');
  return fetch('http://localhost:3131/api/tables')
  .then(res => res.json());
}

export const fetchStatuses = () => {
  console.log('Trying to fetch statuses...');
  return fetch('http://localhost:3131/api/statuses')
  .then(res => res.json());
}