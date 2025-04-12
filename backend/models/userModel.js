const mongoose = require("mongoose");

const noteModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  checked: { type: Boolean, required: true, default:false },
});

const userModel = new mongoose.Schema({
  username: { type: String, unique:true, required:true },
  password:{type: String, required:true},
  notes: [noteModel],
});

module.exports = mongoose.model("Users", userModel);
