const jwt = require("jsonwebtoken");
const userModel = require("../models/note.model");
require("dotenv").config();

const noteServices = {
  getNotesService: async (user, res) => {
    try {
      // console.log("route",user)
      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser )return {status:404, payload:{msg:"User Not Found"}}
      return {status:200,payload:{notes: isUser.notes}}
    } catch (err) {
      return {status:500,payload:{msg:err.message}}
    }
  },

  addNoteService: async ({title,description},user, res) => {
    try {
      if (!title || !description)
        return {status:401,payload:{mag:"Please pass all the parameters"}}
      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser) return {status:400,payload:{msg:"User Not Found"}}
      isUser.notes.push({title: title, description: description});
      await isUser.save();
      return {status:201,payload:{notes: isUser.notes}}
    } catch (err) {
      return {status:500,payload:{msg:err.message}}
    }
  },

  deleteNoteService: async ({noteId},user,res) => {
    try {
      if (!noteId)
        return {status:400,payload:{msg:"Please pass all the parameters"}}
      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser) return {status:404,payload:{msg:"User Not Found"}}
      isUser.notes.pull({ _id: noteId });
      await isUser.save();
      return {status:201,payload:{notes: isUser.notes}}
    } catch (err) {
      return {status:500,payload:{msg:err.message}}
    }
  },

  updateNoteService: async ({id, title, description, checked},user, res) => {
    try {
      
      if (!id || !title || !description)
        return {status:401,payload:{msg:"Please pass all the parameteres"}}

      const isUser = await userModel.findById({ _id: user.uid });
      if (!isUser) return {status:404,payload:{msg:"User Not Found"}}
      const note = isUser.notes.id(id);
      note.title = title;
      note.description = description;
      note.checked = checked;
      await isUser.save();
      return {status:200,payload:{notes: isUser.notes}}
    } catch (err) {
      console.log(err.message);
      return {status:500, payload:{msg:"Internal Server Error"}}
    }
  },

  updateNoteStatusService: async ({id},user, res) => {
    try {
      
      if (!id)
        return {status:401,payload:{msg:"Please pass all th eparameters"}}

      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser) return {status:404,payload:{msg:"User Not Found"}}
      const note = isUser.notes.id(id);
      if (!note) return {status:404,payload:{mag:"Note Not Found"}}
      note.checked = !note.checked;
      await isUser.save();
      return {status:200,payload:{notes: isUser.notes}}
    } catch (err) {
      console.log(err.message);
      return {status:500,payload:{msg:err.message}}
    }
  },
};

module.exports = noteServices;
