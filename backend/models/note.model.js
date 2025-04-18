const mongoose = require("mongoose");
const noteModel = require('./model.note')


const userModel = new mongoose.Schema({
  email: { type: String, unique:true, required:true },
  password:{type: String, required:true},
  notes: [noteModel],
});

module.exports = mongoose.model("Users", userModel);