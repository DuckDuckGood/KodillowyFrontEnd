const express = require('express');
const db = require('../db/db').seats;
const isAlreadyBooked = require('./utils');
const router = express.Router();

// GET
router.get('', (req, res) => {
  res.status(200).json(db);
});

router.get('/:id', (req, res) => {
  res.json(db.find(o => parseInt(o.id) === parseInt(req.params.id)));
});

// POST
router.post('', (req, res) => {
  const newElement = {
    ...req.body,
    id: db.length + 1,
  };

  if (isAlreadyBooked(newElement)) {
    res.json({ message: 'Something went wrong!' });
  }
  
  db.push(newElement);
  res.json({ message: 'Ok' });
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

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)-1;
  const receivedElement = req.body;

  if (id > 0 && id <= db.length) {
    const updatedElement = {};
    Object.entries(db[id]).forEach(entry => {
      const [key, value] = entry;
      updatedElement[key] = key !== 'id' && receivedElement[key] ? receivedElement[key] : value;
    });
    db[id] = updatedElement;
    res.json({message: `Ok`});
  } else {
    res.json({message: `Could not update db record with id "${id}"`});
  }
});

module.exports = router;