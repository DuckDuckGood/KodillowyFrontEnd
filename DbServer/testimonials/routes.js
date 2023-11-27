const express = require('express');
const { findTestimonials, findTestimonialById, saveTestimonial, deleteTestimonial } = require('../controllers/testimonial.controller');
const db = require('../db/db').testimonials;
const router = express.Router();

// GET
router.get('', async (req, res) => {
  (await findTestimonials()).send(res);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  (await findTestimonialById(id)).send(res);
});

// POST
router.post('', (req, res) => {
  saveTestimonial(req, res);
});

// DELETE
router.delete('/:id', (req, res) => {
  deleteTestimonial(req, res);
});

module.exports = router;