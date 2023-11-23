const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const departmentModel = require('../models/department.model');
const { findDepartments, findRandomDepartment, findDepartment, saveDepartment, updateDepartment, deleteDepartment } = require('../controllers/department.controller');

router.get('/departments', async (req, res) => {
  (await findDepartments()).send(res);
});

router.get('/departments/random', async (req, res) => {
  (await findRandomDepartment()).send(res);
});

router.get('/departments/:id', async (req, res) => {
  const id = req.params.id;
  (await findDepartment({ _id: new ObjectId(id) })).send(res)
});

router.post('/departments', (req, res) => {
  saveDepartment(req, res);
});

router.put('/departments/:id', (req, res) => {
  updateDepartment(req, res);
});

router.delete('/departments/:id', (req, res) => {
  deleteDepartment(req, res);
});

module.exports = router;
