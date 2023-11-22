const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const departmentModel = require('../models/department.model');

router.get('/departments', (req, res) => {
  departmentModel.find()
    .then(departments => res.json(departments))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/departments/random', (req, res) => {
  departmentModel.countDocuments()
    .then(count => {
      const randomValue = parseInt((Math.random() * 100) % count);

      console.log(count, randomValue);
      departmentModel.findOne()
        .skip(randomValue)
        .then(department => res.json(department))
        .catch(error => res.status(500).json({ message: error }));
    });
  
});

router.get('/departments/:id', (req, res) => {
  const id = req.params.id;
  departmentModel.findById(id)
    .then(department => res.json(department))
    .catch(error => res.status(500).json({ message: error }));
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  const model = new departmentModel({ name: name });
  model.save()
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
});

router.put('/departments/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  departmentModel.findById(id)
    .then(model => {
      if (model) {
        departmentModel
          .updateOne({ _id: new ObjectId(id) }, { $set: { name } })
          .then(() => res.json(model))
          .catch(error => res.status(500).json({ message: error }));
      } else {
        res.status(404).json({ message: `Could not find department with id ${id}` });
      }
    });
});

router.delete('/departments/:id', (req, res) => {
  const id = req.params.id;

  departmentModel.findOne({ _id: id })
    .then(model => {
      if (model) {
        departmentModel.deleteOne(model)
          .then(() => res.json(model))
          .catch(error => res.status(500).json(error));
      } else {
        res.status(404).json({ message: `Could not find department with id ${id}` })
      }
    });
});

module.exports = router;
