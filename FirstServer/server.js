const path = require('path');
const express = require('express');
const { setEndpoints } = require('./endpointsHandler');
const { engine } = require('express-handlebars');

const app = express();
app.engine('.hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: './public/views/layouts',
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public', 'views'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

setEndpoints(app);

app.listen(8000, () => {
  console.log('Haha! I work!');
});