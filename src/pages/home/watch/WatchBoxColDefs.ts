import { ColDef } from "ag-grid-community";
import { numberFormatter } from "../../../utils/Formaters";
import { RawMessage } from "../../../models/RawMessage";

export const watchBoxColDefs: Array<ColDef<RawMessage>> = [
  { field: "securityDes", headerName: "Security Des", minWidth: 200 },
  {
    field: "cibcOfficialBidPrice",
    headerName: "Cibc Official Bid Price",
    minWidth: 100,
    editable: true,
    type: "numericColumn",
    valueFormatter: numberFormatter,
    enableCellChangeFlash: true,
    enableRowGroup: false,
  },
  {
    field: "cibcOfficialBidYield",
    headerName: "Cibc Official Bid Yield",
    minWidth: 100,
    editable: true,
    type: "numericColumn",
    valueFormatter: numberFormatter,
    enableCellChangeFlash: true,
    enableRowGroup: false,
  },
  {
    field: "referenceSecurity1",
    headerName: "Ref BM5 Security",
    minWidth: 100,
  },
  {
    field: "referenceSecurity1BidSpread",
    headerName: "Ref BM5 Bid Spread",
    minWidth: 100,
    valueFormatter: numberFormatter,
  },
  {
    field: "bidYieldVsYesterdaysClosingBid",
    headerName: "Bid Yield Vs Yesterdays Closing Bid",
    minWidth: 100,
    aggFunc: "avg",
    valueFormatter: numberFormatter,
  },
  {
    field: "value01per1MM",
    headerName: "Bid Yield Vs Yesterdays Closing Bid",
    minWidth: 100,
    aggFunc: "sum",
    valueFormatter: numberFormatter,
  },
  {
    field: "firmRisk",
    headerName: "Firm Risk",
    minWidth: 100,
    valueFormatter: numberFormatter,
  },
  {
    field: "convexityMid",
    headerName: "Cnvx Mid",
    minWidth: 100,
    valueFormatter: numberFormatter,
  },
  { field: "traderName", headerName: "Trader Name", minWidth: 100 },
  {
    field: "currNetPos",
    headerName: "Pos Cn",
    minWidth: 100,
    valueFormatter: numberFormatter,
  },
  {
    field: "netDailyChangeInPosition",
    headerName: "Net Chg Pos",
    minWidth: 100,
    aggFunc: "sum",
    valueFormatter: numberFormatter,
  },
  {
    field: "carry",
    headerName: "Carry",
    minWidth: 100,
    valueFormatter: numberFormatter,
  },
  {
    field: "value01CurrentNetExposure",
    headerName: "Exp Val01 Cn",
    aggFunc: "sum",
    minWidth: 100,
    valueFormatter: numberFormatter,
  },
  {
    field: "fxPrice",
    headerName: "Fx Prc",
    minWidth: 100,
    valueFormatter: numberFormatter,
  },
];
