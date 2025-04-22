import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [-1],
  completedNotes: [],
  pendingNotes: [],
};

const notesSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setPendingNotes: (state, action) => {
      state.pendingNotes = action.payload;
    },
    setCompletedNotes: (state, action) => {
      state.completedNotes = action.payload;
    },
  },
});

export default notesSlice.reducer;
export const { setNotes, setCompletedNotes, setPendingNotes } = notesSlice.actions;
