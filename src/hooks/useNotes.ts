// import {useState} from 'react';
import React from "react";
import { useDispatch } from "react-redux";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
  updateNoteStatus,
} from "../apis/note";
import {
  setNotes,
  setPendingNotes,
  setCompletedNotes,
} from "../redux/noteSlices";

import { Note } from "../types";

const useNotes = () => {
  const dispatch = useDispatch();

  const deleteUserNote = async (
    noteID: string,
    setToastMsg: React.Dispatch<React.SetStateAction<string>>,
    setToastType: React.Dispatch<React.SetStateAction<string>>,
    showToast: ()=>void,
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const res = await deleteNote(noteID);
      const allNotes = res.data.notes;
      dispatch(setNotes(allNotes));
      const tempCompletedNotes = allNotes.filter(
        (note: Note) => note.checked === true
      );
      const tempPendingNotes = allNotes.filter(
        (note: Note) => note.checked === false
      );
      dispatch(setPendingNotes(tempPendingNotes));
      dispatch(setCompletedNotes(tempCompletedNotes));
      setOpenDeleteModal(false);
      setToastMsg("Note Deleted Successfully");
      setToastType("success");
      showToast();
      return res;
    } catch (err) {
      setToastMsg("Error in Deleting Notes");
      setToastType("error");
      showToast();
    }
  };

  const updateUserNote = async (
    noteID: string,
    title: string,
    description: string,
    checked: boolean,
    setToastMsg: React.Dispatch<React.SetStateAction<string>>,
    setToastType: React.Dispatch<React.SetStateAction<string>>,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    showToast: ()=>void
  ) => {
    try {
      if (title.length > 20 || description.length > 50) {
        setToastMsg("Please Enter title and desc. under 20 and 50 chars resp.");
        setToastType("error");
        setIsModalOpen(false);
        showToast();
        return;
      }
      const res = await updateNote(noteID, title, description, checked);
      const allNotes = res.data.notes;
      dispatch(setNotes(allNotes));
      const tempCompletedNotes = allNotes.filter(
        (note: Note) => note.checked === true
      );
      const tempPendingNotes = allNotes.filter(
        (note: Note) => note.checked === false
      );
      dispatch(setPendingNotes(tempPendingNotes));
      dispatch(setCompletedNotes(tempCompletedNotes));
      setToastMsg("Note Update Successfully");
      setToastType("success");
      setIsModalOpen(false);
      showToast();
      return res;
    } catch (err) {
      setToastMsg("Error in updating Note");
      setToastType("error");
      setIsModalOpen(false);
      showToast();
    }
  };

  const updateUserNoteStatus = async (
    noteId: string,
    setToastMsg: React.Dispatch<React.SetStateAction<string>>,
    setToastType: React.Dispatch<React.SetStateAction<string>>,
    showToast: () => void
  ) => {
    try {
      const res = await updateNoteStatus(noteId);
      const allNotes = res.data.notes;
      dispatch(setNotes(allNotes));
      const tempCompletedNotes = allNotes.filter(
        (note: Note) => note.checked === true
      );
      const tempPendingNotes = allNotes.filter(
        (note: Note) => note.checked === false
      );
      dispatch(setPendingNotes(tempPendingNotes));
      dispatch(setCompletedNotes(tempCompletedNotes));
      setToastMsg("Note Updated Successfully");
      setToastType("success");
      showToast();
      return res;
    } catch (err) {
      setToastMsg("Error in updating note");
      setToastType("error");
      showToast();
    }
  };

  const addUserNote = async (
    title: string,
    description: string,
    checked: boolean,
    setToastMsg: React.Dispatch<React.SetStateAction<string>>,
    setToastType: React.Dispatch<React.SetStateAction<string>>,
    showToast: () => void,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      if (title.length > 20 || description.length > 50) {
        setToastMsg(
          "Please Enter title under 20 and description under 50 words"
        );
        setToastType("error");
        showToast();
        return;
      }
      if (title === "" || description === "") {
        setToastMsg("Please Fill all the fields");
        setToastType("error");
        showToast();
        return;
      }
      const res = await addNote(title, description, checked);
      const newNotes = res.data.notes;
      dispatch(setNotes(newNotes));
      const tempPendingNotes = newNotes.filter(
        (note: Note) => note.checked === false
      );
      const tempCompletedNotes = newNotes.filter(
        (note: Note) => note.checked === true
      );
      dispatch(setPendingNotes(tempPendingNotes));
      dispatch(setCompletedNotes(tempCompletedNotes));
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setToastMsg("Note Added Successfully");
      setToastType("success");
      showToast();
      return res;
    } catch (err) {
      setToastMsg("Error in adding note");
      setToastType("error");
      showToast();
    }
  };

  const getUserNotes = async () => {
    try {
      const res = await getNotes();
      const allNotes = res.data.notes;
      // console.log(allNotes)
      dispatch(setNotes(allNotes));
      const tempCompletedNotes = allNotes.filter(
        (note: Note) => note.checked === true
      );
      const tempPendingNotes = allNotes.filter(
        (note: Note) => note.checked === false
      );
      dispatch(setPendingNotes(tempPendingNotes));
      dispatch(setCompletedNotes(tempCompletedNotes));
    } catch (err) {
      console.log("Error in getting notes:", (err as Error).message);
    }
  };

  return {
    deleteUserNote,
    updateUserNote,
    updateUserNoteStatus,
    addUserNote,
    getUserNotes,
  };
};

export default useNotes;
