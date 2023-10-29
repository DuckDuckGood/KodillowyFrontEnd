const randomId = (length = 20) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()';
  let id = '';

  while (id.length !== 20) {
    id += chars.charAt(parseInt(Math.random() * 100) % chars.length);
  }

  return id;
}

console.log(randomId());