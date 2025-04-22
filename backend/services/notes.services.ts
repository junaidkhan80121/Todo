// import * as jwt from 'jsonwebtoken';
const {userModel} = require('../models/model.user')
import {connectDB} from '../db'
require("dotenv").config();
import { Notes, userToken } from "../types";

export const noteServices = {
  getNotesService: async (user:userToken) => {
    try {
      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser) return { status: 404, payload: { msg: "User Not Found" } };
      return { status: 200, payload: { notes: isUser.notes } };
    } catch (err) {
      return { status: 500, payload: { msg: (err as Error).message } };
    }
  },

  addNoteService: async ({ title, description }:{title:string,description:string}, user: userToken) => {
    try {
      await connectDB();
      if (!title || !description)
        return {
          status: 401,
          payload: { msg: "Please pass all the parameters" },
        };
      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser) return { status: 400, payload: { msg: "User Not Found" } };
      console.log(isUser.notes)
      isUser.notes.push({ title: title, description: description });
      await isUser.save();
      return { status: 201, payload: { notes: isUser.notes } };
    } catch (err) {
      return { status: 500, payload: { msg: (err as Error).message } };
    }
  },

  deleteNoteService: async ({ noteId }:{noteId:string}, user: userToken) => {
    try {
      await connectDB();
      if (!noteId)
        return {
          status: 400,
          payload: { msg: "Please pass all the parameters" },
        };
      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser) return { status: 404, payload: { msg: "User Not Found" } };
      isUser.notes.pull({ _id: noteId });
      await isUser.save();
      return { status: 201, payload: { notes: isUser.notes } };
    } catch (err) {
      return { status: 500, payload: { msg: (err as Error).message } };
    }
  },

  updateNoteService: async ({ id, title, description, checked }:{id:string,title:string,description:string,checked:string|boolean},user: userToken) => {
    try {
      await connectDB();
      if (!id || !title || !description)
        return {
          status: 401,
          payload: { msg: "Please pass all the parameteres" },
        };
      const isUser = await userModel.findById({ _id: user.uid });
      if (!isUser) return { status: 404, payload: { msg: "User Not Found" } };
      const note = isUser.notes.id(id);
      (note as Notes).title = title;
      (note as Notes).description = description;
      (note as Notes).checked = checked;
      await isUser.save();
      return { status: 200, payload: { notes: isUser.notes } };
    } catch (err) {
      console.log((err as Error).message);
      return { status: 500, payload: { msg: "Internal Server Error" } };
    }
  },

  updateNoteStatusService: async ({ id }:{id:string}, user: userToken) => {
    try {
      await connectDB();
      if (!id)
        return {
          status: 401,
          payload: { msg: "Please pass all the parameters" },
        };
      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser) return { status: 404, payload: { msg: "User Not Found" } };
      const note = isUser.notes.id(id);
      if (!note) return { status: 404, payload: { mag: "Note Not Found" } };
      note.checked = !note.checked;
      await isUser.save();
      return { status: 200, payload: { notes: isUser.notes } };
    } catch (err) {
      console.log((err as Error).message);
      return { status: 500, payload: { msg: (err as Error).message } };
    }
  },
};

exports = noteServices;
