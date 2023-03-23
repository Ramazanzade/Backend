const { Schema, model } = require('mongoose');

const NewSchema = new Schema({
  text: String,
  date: Number,
  title: String,
  text1: String,
  date1: Number,
  title1: String,  
  text2: String,
  date2: Number,
  title2: String,
});

const news = model('News', NewSchema);

module.exports = { news };
