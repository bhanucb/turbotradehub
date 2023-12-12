import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

export type ThemeButtonState = PaletteMode | "auto";

export interface ThemeState {
  currentTheme: PaletteMode;
  themeButtonState: ThemeButtonState;
}

const initialState: ThemeState = {
  currentTheme: "light",
  themeButtonState: "auto",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (
      state,
      action: PayloadAction<{
        mode: PaletteMode;
        buttonState: ThemeButtonState;
      }>
    ) => {
      state.currentTheme = action.payload.mode;
      state.themeButtonState = action.payload.buttonState;
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
