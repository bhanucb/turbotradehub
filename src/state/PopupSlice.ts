import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  PopoutProperties,
  PopoutsState,
  PopoutState as SinglePopoutState,
} from "../pages/popout/Popout";

export interface PopoutState {
  popOuts: PopoutsState;
  lastPopout: (SinglePopoutState & { closedByUser: boolean }) | undefined;
  popoutProperties: Array<PopoutProperties>;
}

const initialState: PopoutState = {
  popOuts: [],
  lastPopout: undefined,
  popoutProperties: [],
};

export const popoutSlice = createSlice({
  name: "popout",
  initialState,
  reducers: {
    enqueuePopOuts: (state, action: PayloadAction<SinglePopoutState>) => {
      if (state.popOuts.find((p) => p.tabId === action.payload.tabId)) return;
      state.popOuts = [...state.popOuts, action.payload];
    },
    updatePopOutProperties: (
      state,
      action: PayloadAction<Array<PopoutProperties>>
    ) => {
      state.popoutProperties = action.payload;
    },
    clearPopOutProperties: (state) => {
      state.popoutProperties = [];
    },
    dockPopOut: (
      state,
      action: PayloadAction<
        Pick<SinglePopoutState, "tabId"> & { userInitiatedAction: boolean }
      >
    ) => {
      const lastPopout = state.popOuts.find(
        (p) => p.tabId === action.payload.tabId
      );
      if (!!lastPopout) {
        state.lastPopout = {
          ...lastPopout,
          closedByUser: action.payload.userInitiatedAction,
        };
      } else {
        state.lastPopout = undefined;
      }
    },
    dequeuePopOuts: (state, action: PayloadAction<string>) => {
      state.popOuts = state.popOuts.filter((p) => p.tabId !== action.payload);
      state.lastPopout = undefined;
    },
    resetLastPopout: (state) => {
      state.lastPopout = undefined;
    },
  },
});

export const {
  enqueuePopOuts,
  updatePopOutProperties,
  clearPopOutProperties,
  dockPopOut,
  dequeuePopOuts,
} = popoutSlice.actions;

export default popoutSlice.reducer;
