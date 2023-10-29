const path = require('path');
const express = require('express');

const notFoundPath = path.join(__dirname, 'views/notFound.html');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const getPath = requestPath => {
  return requestPath === '/' || requestPath === '/home'
    ? '/index'
    : requestPath;
}

const resolveViewPath = req => {
  return path.join(__dirname, 'public', 'views', `${getPath(req.path)}.html`);
}

app.use('/user/*', (req, res, next) => {
  res.send('I tak Cię nie zalogujemy :D');
});

app.get('*', (req, res) => {
  res.sendFile(resolveViewPath(req), err => {
    console.log(`Can't find endpoint for ${req.path}`);
    res.sendFile(resolveViewPath({path: 'notFound'}));
  })
});

app.listen(8000, () => {
  console.log('Haha! I work!');
});