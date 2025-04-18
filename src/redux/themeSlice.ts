import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTheme:
    localStorage.getItem("themeMode") === "light" ? "light" : "dark",
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    changeThemeMode: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const { changeThemeMode } = themeSlice.actions;
