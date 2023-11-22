const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);