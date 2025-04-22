// import * as jwt from 'jsonwebtoken';
import { userModel } from "../models/model.user";
require("dotenv").config();
import { userToken } from "../types";

export const noteServices = {
  getNotesService: async (user:userToken) => {
    try {
      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser) return { status: 404, payload: { msg: "User Not Found" } };
      return { status: 200, payload: { notes: isUser.notes } };
    } catch (err:any) {
      return { status: 500, payload: { msg: err.message } };
    }
  },

  addNoteService: async ({ title, description }:{title:string,description:string}, user: userToken) => {
    try {
      if (!title || !description)
        return {
          status: 401,
          payload: { msg: "Please pass all the parameters" },
        };
      const isUser = await userModel.findOne({ _id: user.uid });
      if (!isUser) return { status: 400, payload: { msg: "User Not Found" } };
      isUser.notes.push({ title: title, description: description });
      await isUser.save();
      return { status: 201, payload: { notes: isUser.notes } };
    } catch (err:any) {
      return { status: 500, payload: { msg: err.message } };
    }
  },

  deleteNoteService: async ({ noteId }:{noteId:string}, user: userToken) => {
    try {
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
    } catch (err:any) {
      return { status: 500, payload: { msg: err.message } };
    }
  },

  updateNoteService: async ({ id, title, description, checked }:{id:string,title:string,description:string,checked:string|boolean},user: userToken) => {
    try {
      if (!id || !title || !description)
        return {
          status: 401,
          payload: { msg: "Please pass all the parameteres" },
        };
      const isUser = await userModel.findById({ _id: user.uid });
      if (!isUser) return { status: 404, payload: { msg: "User Not Found" } };
      const note = isUser.notes.id(id);
      note.title = title;
      note.description = description;
      note.checked = checked;
      await isUser.save();
      return { status: 200, payload: { notes: isUser.notes } };
    } catch (err:any) {
      console.log(err.message);
      return { status: 500, payload: { msg: "Internal Server Error" } };
    }
  },

  updateNoteStatusService: async ({ id }:{id:string}, user: userToken) => {
    try {
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
    } catch (err:any) {
      console.log(err.message);
      return { status: 500, payload: { msg: err.message } };
    }
  },
};

exports = noteServices;
