const { ObjectId } = require('mongodb');
const testimonialModel = require("../models/testimonial.model");
const MongoModel = require('./mongo.model');
const {sanitizeRequest} = require("../serverUtils");

const findTestimonial = async param => {
  return new MongoModel(await testimonialModel.findOne(param || {}));
}

const findTestimonialById = async id => {
  const sanitizedId = sanitizeRequest({ id }).id;
  return (await findTestimonial({ _id: new ObjectId(sanitizedId) }));
}

const findTestimonials = async () => {
  return new MongoModel(await testimonialModel.find());
}

const saveTestimonial = (req, res) => {
  const { author, text } = sanitizeRequest(req.body);
  new testimonialModel({ author, text })
    .save()
    .then(param => res.json({ message: param || 'OK' }))
    .catch(error => res.status(500).json({ message: error }));
}

const deleteTestimonial = async (req, res) => {
  const { id } = sanitizeRequest(req.params);
  const existingModel = (await findTestimonialById(id)).get();

  if (existingModel) {
    testimonialModel.deleteOne(existingModel)
      .then(param => res.json({ message: param || 'OK' }))
      .catch(error => res.status(500).json({ message: error }));
  } else {
    res.status(500).json({ message: `Could not find testimonial with id ${id}` })
  }
}

const updateTestimonial = async (req, res) => {
  const { id } = sanitizeRequest(req.params);
  const { author, text } = sanitizeRequest(req.body);
  const existingModel = (await findTestimonialById(id)).get();

  if (existingModel) {
    testimonialModel.updateOne(existingModel, { author, text })
      .then(param => res.json({ message: param || 'OK' }))
      .catch(error => res.status(500).json({ message: error }))
  } else {
    res.status(500).json({ message: `Could not find testimonial with id ${id}` })
  }
}

module.exports = {
  findTestimonial,
  findTestimonialById,
  findTestimonials,
  saveTestimonial,
  deleteTestimonial,
  updateTestimonial
}