const mongoose = require('mongoose');
const Joi = require("joi");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const subjectName = mongoose.model('subjectDB',subjectSchema);

const validate = (data) => {
    const schema = Joi.object({
      name: Joi.string().required().label("Name"),
    });
    return schema.validate(data)
  };

module.exports = {subjectName, validate};