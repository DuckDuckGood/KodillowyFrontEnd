const { default: mongoose } = require("mongoose");

const testimonalSchema = mongoose.Schema({
  author: { type: String, required: true },
  text:   { type: String, required: true }
});

module.exports = mongoose.model('Testimonial', testimonalSchema);