const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const employeeModel = require('../models/employee.model');

router.get('/employees', (req, res) => {
  employeeModel
    .find()
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/employees/random', (req, res) => {
  employeeModel.countDocuments()
    .then(count => {
      const randomValue = parseInt((Math.random() * 100) % count);
      employeeModel.findOne().skip(randomValue)
        .then(employee => res.json(employee));
    })
    .catch(error => res.status(500).json({ message: error }));
});

router.get('/employees/:id', (req, res) => {
  const id = req.params.id;

  employeeModel
    .findById(id)
    .then(employee => res.json(employee))
    .catch(error => res.status(500).json({ message: error }));
});

router.post('/employees', (req, res) => {
  const { firstName, lastName, department } = req.body;
  const model = new employeeModel({ firstName, lastName, department });

  model.save()
    .then(() => res.json({ message: 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
});

router.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, department } = req.body;
  
  employeeModel.findById(id)
    .then(model => {
      if (model) {
        employeeModel
          .updateOne({ _id: new ObjectId(id) }, { $set: { firstName, lastName, department } })
          .then(data => res.json(model))
          .catch(error => res.status(500).json(error));
      } else {
        res.status(404).json({ message: `Could not find employee with id ${id}` });
      }
    });
});

router.delete('/employees/:id', (req, res) => {
  const id = req.params.id;

  employeeModel.findById(id)
    .then(model => {
      if (model) {
        employeeModel.deleteOne(model)
          .then(() => res.json(model))
          .catch(error => res.status(500).json(error));
      } else {
        res.status(404).json({ message: `Could not find employee with id ${id}` });
      }
    });
});

module.exports = router;
