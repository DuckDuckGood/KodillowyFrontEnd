import path from 'path';
import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router(path.join('public', 'db', 'app.json'));
const middlewares = jsonServer.defaults({
  static: 'public',
  noCors: true
});
const port = process.env.PORT || 3131; // eslint-disable-line no-undef

server.use(middlewares);
server.use(router);

server.listen(port);

export default server;