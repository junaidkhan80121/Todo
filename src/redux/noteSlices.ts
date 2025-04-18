import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  completedNotes: [],
  pendingNotes: [],
};

const notesSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setNotes: (state: any, action: any) => {
      state.notes = action.payload;
    },
    setPendingNotes: (state: any, action: any) => {
      state.pendingNotes = action.payload;
    },
    setCompletedNotes: (state: any, action: any) => {
      state.completedNotes = action.payload;
    },
  },
});

export default notesSlice.reducer;
export const { setNotes, setCompletedNotes, setPendingNotes } =
  notesSlice.actions;
