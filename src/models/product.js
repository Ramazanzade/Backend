const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: String,
  surname: String,
  age: String,
  live: String,
  fin: String,
  work: String
});

const producta = model('Product', ProductSchema);

module.exports = { producta };
