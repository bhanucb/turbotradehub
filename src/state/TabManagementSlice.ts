import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WatchItem } from "../models/WatchItem";

export type TabEvent = {
  tabName: string;
  portfolios: Array<string>;
};

export interface TabManagementState {
  tabIdOnEdit: string | undefined;
  selectedTabId: string | undefined;
  currentWatchItem: WatchItem | undefined;
  lastOpenedTab: TabEvent | undefined;
}

const initialState: TabManagementState = {
  tabIdOnEdit: undefined,
  selectedTabId: undefined,
  currentWatchItem: undefined,
  lastOpenedTab: undefined,
};

export const tabManagementSlice = createSlice({
  name: "tabManager",
  initialState,
  reducers: {
    onSelectTab: (
      state,
      action: PayloadAction<{ tabId: string | undefined }>
    ) => {
      state.selectedTabId = action.payload.tabId;
    },
    onOpenTab: (state, action: PayloadAction<TabEvent>) => {
      state.lastOpenedTab = action.payload;
    },
    onEditTab: (
      state,
      action: PayloadAction<{ tabId: string | undefined }>
    ) => {
      state.tabIdOnEdit = action.payload.tabId;
    },
    onWatchItem: (
      state,
      action: PayloadAction<{ bbgId59: string; traderName: string }>
    ) => {
      state.currentWatchItem = action.payload;
    },
  },
});

export const { onSelectTab, onOpenTab, onEditTab, onWatchItem } =
  tabManagementSlice.actions;

export default tabManagementSlice.reducer;
