const express = require('express');
const db = require('./db');
const router = express.Router();

// GET
router.get('', (req, res) => {
  res.json(db);
});

router.get('/random', (req, res) => {
  const randomId = parseInt(Math.random() * 100) % db.length + 1;

  res.json(db.find(o => parseInt(o.id) === parseInt(randomId)));
});

router.get('/:id', (req, res) => {
  res.json(db.find(o => parseInt(o.id) === parseInt(req.params.id)));
});

// POST
router.post((req, res) => {
  console.log(req.body);
  const newElement = {...req.body, id: db.length + 1};
  db.push(newElement);
  res.json({message: 'Ok'});
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (isFinite(id) && parseInt(id) > 0 && db.length >= parseInt(id)) {
    try {
      db.splice(parseInt(id)-1, 1);
      res.json({message: `Successfully deleted db record with id "${id}"`});
    } catch(error) {
      console.log(error);
      res.json({message: `Error while deleting db record with id "${id}"`});
    }
  } else {
    res.json({message: `Could not delete db record with id "${id}"`});
  }
});

module.exports = router;