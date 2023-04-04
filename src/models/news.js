const { Schema, model } = require('mongoose');

const NewSchema = new Schema({
  text: String,
  date: String,
  title: String,
  text1: String,
  date1: String,
  title1: String,  
  text2: String,
  date2: String,
  title2: String,
});

const news = model('News', NewSchema);

module.exports = { news };
