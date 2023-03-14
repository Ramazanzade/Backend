const { Schema, model } = require('mongoose');
const { buffer } = require('stream/consumers');

const fileSchema = new Schema({
img:Buffer
});

const file = model('File', fileSchema);

module.exports = {file};
