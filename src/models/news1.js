const { Schema, model } = require('mongoose');

const NewSchema1 = new Schema({
  text: String,
  date: String,
  title: String,
});

const news1 = model('News1', NewSchema1);

module.exports = { news1 };
