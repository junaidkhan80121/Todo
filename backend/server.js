//imports
const express = require("express");
const userModel = require("./models/userModel");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

//connect the database
mongoose
  .connect("mongodb://localhost:27017/notesapp")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error", err));

//routes
// app.error()


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(401).send({ msg: "Bad Input" });
    const user = await userModel.findOne({ username: username });
    if (!user) return res.status(404).send({ msg: "User not found" });
    if (user.username !== username || user.password !== password)
      return res.status(401).send({ msg: "Invalid credentials" });

    return res.status(200).send({ uid: user._id });
  } catch (err) {
    return res.status(500).send({ msg: err });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(401)
        .send({ msg: "Please pass all the required parameters" });
    const user = await userModel.findOne({ username: username });
    if (user) return res.status(401).send({ msg: "User Already exists" });

    const newUser = new userModel({ username: username, password: password });
    await newUser.save();

    return res.status(201).send({ uid: newUser._id });
  } catch (err) {
    return res.status(500).send({ msg: err });
  }
});

app.post("/updatenote", async (req, res) => {
  try {
    const { uid, id, title, description, checked } = req.body;
    if (!uid || !id || !title || !description) {
      return res.status(401).send({ msg: "Please pass all the parameters" });
    }
    const user = await userModel.findById({ _id: uid });
    if (!user) return res.status(404).send({ msg: "User not found" });
    const notes = user.notes;
    const note = user.notes.id(id);
    note.title = title;
    note.description = description;
    note.checked = checked;
    await user.save();
    return res.status(201).send({ notes: notes });
  } catch (err) {
    return res.status(500).send({ msg: "internal server error" });
  }
});

app.post("/deletenote", async (req, res) => {
  try {
    const { noteId, uid } = req.body;
    if (!noteId || !uid)
      return res.status(401).send({ msg: "Please pass all the parameters" });
    const user = await userModel.findOne({ _id: uid });
    if (!user) return res.status(404).send({ msg: "Invalid User" });
    user.notes.pull({ _id: noteId });
    const notes = user.notes;
    user.save();
    return res.status(201).send({ notes: notes });
  } catch (err) {
    return res.status(500).send({ msg: "internal server error" });
  }
});

app.post("/updatenotestatus", async (req, res) => {
  try {
    const { uid, id } = req.body;
    if (!uid || !id)
      return res.status(401).send({ msg: "Please pass all the parameters" });
    const user = await userModel.findOne({ _id: uid });
    if (!user) return res.status(404).send({ msg: "User not found" });
    const note = user.notes.id(id);
    if (!note) return res.status(404).send({ msg: "note not found" });
    note.checked = !note.checked;
    await user.save();
    return res.status(200).send({ notes: user.notes });
  } catch (err) {}
});

app.post("/addnote", async (req, res) => {
  try {
    const { uid, title, description } = req.body;
    if (!uid || !title || !description)
      return res.status(401).send({ msg: "Please pass all the parameters" });
    const user = await userModel.findOne({ _id: uid });
    if (!user) return res.status(400).send({ msg: "user not found" });
    user.notes.push({
      title: title,
      description: description,
    });
    await user.save();
    return res.status(201).send({ notes: user.notes });
  } catch (err) {
    return res.status(500).send({ msg: err });
  }
});

app.get("/getnote/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid)
      return res.status(401).send({ msg: "Please pass all the parameters" });
    const user = await userModel.findById({ _id: uid });
    if (!user) return res.status(404).send({ msg: "User not found" });
    const notes = user.notes;
    return res.status(200).send({ notes: notes });
  } catch (err) {
    return res.status(500).send({ msg: err });
  }
});

//start the app
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
