import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayoutKey } from "../api/Layouts";

export type LayoutLastReset = { layoutKey: LayoutKey } | undefined;

export interface LayoutState {
  currentModel: string | undefined;
  lastReset: LayoutLastReset;
}

const initialState: LayoutState = {
  currentModel: undefined,
  lastReset: undefined,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCurrentModel: (state, action: PayloadAction<string>) => {
      state.currentModel = action.payload;
    },
    resetLayout: (state, action: PayloadAction<LayoutKey>) => {
      const layoutKey = action.payload;
      state.lastReset = { layoutKey };
    },
  },
});

export const { setCurrentModel, resetLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
