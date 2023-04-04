const { Schema, model } = require('mongoose');

const NewSchema2 = new Schema({
  text: String,
  date: String,
  title: String,
});

const news2 = model('News', NewSchema2);

module.exports = { news2 };
