const path = require('path');
const multer = require('multer');

const upload = multer({ dest: '/uploads' });

const resolveView = req => {
  let pathPart = req.path.split('/');
  return pathPart[1];
}

const setEndpoints = app => {
  app.get('/hello/:id/:name', (req, res) => {
    res.render('hello', { name: req.params.name, id: req.params.id });
  })

  app.get('*.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', `styles/${resolveView(req)}`));
  });
  
  app.post('/contact/send-message', upload.single('attachment'),  (req, res) => {
    const attachmentName = req.file.originalname;
    const { author, sender, title, message } = req.body;
    const isSent = author && sender && title && message && attachmentName;

    console.log(attachmentName);
    res.render('contact', { isSent: isSent, attachmentName: attachmentName });
  });

  app.get('*', (req, res) => { 
    console.log(resolveView(req));
    res.render(resolveView(req));
  });
}

module.exports = { setEndpoints, ...module.exports };