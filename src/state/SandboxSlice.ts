import { createSlice } from "@reduxjs/toolkit";

export interface SandboxState {
  isSandboxModeOn: boolean;
  switchSandboxMode: boolean;
}

const initialState: SandboxState = {
  isSandboxModeOn: false,
  switchSandboxMode: false,
};

export const sandboxSlice = createSlice({
  name: "sandbox",
  initialState,
  reducers: {
    switchMode: (state) => {
      state.switchSandboxMode = true;
    },
    confirmSwitch: (state) => {
      state.isSandboxModeOn = !state.isSandboxModeOn;
      state.switchSandboxMode = false;
    },
    cancelSwitch: (state) => {
      state.switchSandboxMode = false;
    },
  },
});

export const { switchMode, confirmSwitch, cancelSwitch } = sandboxSlice.actions;

export default sandboxSlice.reducer;
