import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisplaySelectionKeys } from "../pages/home/pricing/priceSheet/DisplaySelector";
import {
  PricingGridFilter,
  PricingGridFilters,
} from "../models/PricingGridFilter";

export type ActiveFilterState =
  | { name?: string; filter: PricingGridFilter }
  | null
  | undefined;

export interface PricingSheetState {
  display: DisplaySelectionKeys;
  activeFilter: ActiveFilterState;
  runningFilter: PricingGridFilter | null;
  filters: PricingGridFilters | null;
}

const initialState: PricingSheetState = {
  display: "pricingSheet",
  activeFilter: undefined,
  runningFilter: null,
  filters: null,
};

export const pricingSheetSlice = createSlice({
  name: "pricingSheet",
  initialState,
  reducers: {
    changeSelection: (state, action: PayloadAction<DisplaySelectionKeys>) => {
      state.display = action.payload;
    },
    setRunningFilter: (
      state,
      action: PayloadAction<PricingGridFilter | null>
    ) => {
      state.runningFilter = action.payload;
    },
    setActiveFilter: (state, action: PayloadAction<ActiveFilterState>) => {
      state.activeFilter = action.payload;
    },
    loadFilters: (state, action: PayloadAction<PricingGridFilters | null>) => {
      state.filters = action.payload;
    },
  },
});

export const {
  changeSelection,
  setRunningFilter,
  setActiveFilter,
  loadFilters,
} = pricingSheetSlice.actions;

export default pricingSheetSlice.reducer;
