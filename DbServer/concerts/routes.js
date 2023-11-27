const express = require('express');
const { ObjectId } = require('mongodb');
const { findConcerts, findConcert, saveConcert, deleteConcert, updateConcert } = require('../controllers/concert.controller');
const router = express.Router();

// GET
router.get('', async (req, res) => {
  (await findConcerts()).send(res, true);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  (await findConcert({ _id: new ObjectId(id) })).send(res, true);
});

// POST
router.post('', (req, res) => {
  saveConcert(req, res);
});

// DELETE
router.delete('/:id', (req, res) => {
  deleteConcert(req, res);
});

// PUT
router.put('/:id', (req, res) => {
  updateConcert(req, res);
});

module.exports = router;