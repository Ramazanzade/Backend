const { Schema, model } = require('mongoose');

const NewSchema = new Schema({
  text: String,
  date: String,
  title: String,
});

const news = model('News', NewSchema);

module.exports = { news };
