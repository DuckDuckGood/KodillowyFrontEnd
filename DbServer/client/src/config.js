export const getApiUrl = () => {
  console.log('API_URL: ', process.env.NODE_ENV, process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api');
  return process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api';
};
