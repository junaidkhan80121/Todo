const mongoose = require('mongoose')

const noteModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  checked: { type: Boolean, required: true, default:false },
});


module.exports = noteModel;