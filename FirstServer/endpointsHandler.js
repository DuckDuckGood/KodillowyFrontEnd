const getPath = requestPath => {
  return requestPath === '/' || requestPath === '/home'
    ? '/index'
    : requestPath;
}

const resolveView = req => {
  let view = req.path;
  return view.split('/')[0];
}

const setEndpoints = app => {
  app.get('/hello/:id/:name', (req, res) => {
    res.render('hello', { name: req.params.name, id: req.params.id });
    //res.send(`Hello, ${req.params.name}!`);
  })
  
  app.get('*', (req, res) => {
    res.render(resolveView(req));
  });
}

module.exports = { setEndpoints, ...module.exports };