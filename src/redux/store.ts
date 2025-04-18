import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./noteSlices";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    noteSlice: noteSlice,
    themeSlice: themeSlice,
  },
});

export default store;
