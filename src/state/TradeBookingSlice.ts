import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TradeSide } from "../pages/home/pricing/tradeBooking/TradeBooking";

export interface TradeBookingState {
  portfolio: string | null;
  security: string | null;
  price: number | null;
  side: TradeSide | null;
}

const initialState: TradeBookingState = {
  portfolio: null,
  security: null,
  price: null,
  side: null,
};

export const tradeBookingSlice = createSlice({
  name: "tradeBooking",
  initialState,
  reducers: {
    setupTrade: (state, action: PayloadAction<TradeBookingState>) => {
      const { portfolio, security, price, side } = action.payload;
      state.portfolio = portfolio;
      state.security = security;
      state.price = price;
      state.side = side;
    },
  },
});

export const { setupTrade } = tradeBookingSlice.actions;

export default tradeBookingSlice.reducer;
