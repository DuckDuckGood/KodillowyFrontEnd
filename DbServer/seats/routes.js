const express = require('express');
const db = require('../db/db').seats;
const { ObjectId } = require('mongodb');
const { saveSeat, findSeats, findSeat, updateSeat, deleteSeat } = require('../controllers/seat.controller');
const router = express.Router();

// GET
router.get('', async (req, res) => {
  (await findSeats()).send(res);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  (await findSeat({ _id: new ObjectId(id) })).send(res);
});

// POST
router.post('', (req, res) => {
  saveSeat(req, res);
});

// DELETE
router.delete('/:id', (req, res) => {
  deleteSeat(req, res);
});

// PUT
router.put('/:id', (req, res) => {
  updateSeat(req, res);
});

module.exports = router;