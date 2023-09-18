export const changeLocationHash = e => {
  const location = e.target.innerHTML.toLowerCase();
  window.location = location;
};