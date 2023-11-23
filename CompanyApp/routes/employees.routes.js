const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const employeeModel = require('../models/employee.model');
const { findEmployee, findEmployees, findRandomEmployee, saveEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee.controller');

router.get('/employees', async (req, res) => {
  (await findEmployees()).send(res);
});

router.get('/employees/random', async (req, res) => {
  (await findRandomEmployee()).send(res);
});

router.get('/employees/:id', async (req, res) => {
  const id = req.params.id;
  (await findEmployee({ _id: new ObjectId(id) })).send(res);
});

router.post('/employees', (req, res) => {
  saveEmployee(req, res);
});

router.put('/employees/:id', (req, res) => {
  updateEmployee(req, res);
});

router.delete('/employees/:id', (req, res) => {
  deleteEmployee(req, res);
});

module.exports = router;
