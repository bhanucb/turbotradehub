import { IJsonModel } from "flexlayout-react";

export const pricingSummaryId = "pricingSummary";
export const tradeBookingId = "tradeBooking";
export const priceSheetId = "priceSheet";
export const priceSheetOptionsId = "priceSheetOptions";

const model: IJsonModel = {
  global: {
    tabEnableFloat: false,
  },
  borders: [
    {
      type: "border",
      location: "bottom",
      size: 100,
      children: [
        {
          id: "trade-booking-tab",
          type: "tab",
          name: "Trade Booking",
          component: tradeBookingId,
          enableClose: false,
        },
      ],
    },
    {
      type: "border",
      location: "left",
      size: 352,
      children: [
        {
          id: "price-sheet-options",
          type: "tab",
          name: "Options",
          component: priceSheetOptionsId,
          enableClose: false,
          enableDrag: false,
          enableFloat: false,
          enableRename: false,
          enableRenderOnDemand: false,
        },
        {
          id: "pricing-summary-tab",
          type: "tab",
          name: "Pricing Summary",
          component: pricingSummaryId,
          enableClose: false,
        },
      ],
    },
  ],
  layout: {
    id: "parent-row",
    type: "row",
    children: [
      {
        id: "pricing-sheet-tabset",
        type: "tabset",
        enableTabStrip: false,
        children: [
          {
            id: "pricing-sheet-tab",
            type: "tab",
            name: "Price Sheet",
            component: priceSheetId,
            enableClose: false,
            enableDrag: false,
          },
        ],
      },
    ],
  },
};

export default model;
