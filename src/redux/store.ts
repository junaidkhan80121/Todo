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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;