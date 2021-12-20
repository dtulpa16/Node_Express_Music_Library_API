const mongoose = require("mongoose");
const Joi = require("joi");

const toDoSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 255 },
  startDate: { type: Date, default: Date.now },
  dueDate: { type: Date, default: Date.now },
  importance: { type: Number, required: true },
  complete: { type: Boolean, required: true, default: false },
  reoccurring: { type: Boolean, required: true, default: false },
  frequency: { type: Number, default: 0 },
});

const ToDo = mongoose.model("ToDo", toDoSchema);

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    dueDate: Joi.date(),
    importance: Joi.number().required(),
    reoccurring: Joi.bool(),
    frequency: Joi.number()
  });
  return schema.validate(todo);
}

exports.ToDo = ToDo;
exports.validate = validateTodo;
exports.toDoSchema = toDoSchema;
