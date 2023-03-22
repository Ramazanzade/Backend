const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: String,
  surname: String,
  age: String,
  live: String,
  fin: String,
  work: String,
  digital:Number,
  email:String,
  amount:Number
});

const producta = model('Product', ProductSchema);

module.exports = { producta };
