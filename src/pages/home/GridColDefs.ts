import { ColDef } from "ag-grid-community";
import { StockData } from "../../api/StockData";
import { CurrencyPair } from "../../api/CurrencyPair";

export const pricingChangesGridColDefs: Array<ColDef<StockData>> = [
  // {
  //   headerName: "#",
  //   valueGetter: rowIndexValueGetter,
  //   pinned: "left",
  //   suppressMenu: true,
  //   sortable: false,
  //   filter: false,
  // },
  { headerName: "Symbol", field: "symbol", sort: "asc" },
  { headerName: "Price", field: "price" },
  { headerName: "Bid", field: "bid" },
  { headerName: "Ask", field: "ask" },
];

export const topMoversGridColDefs: Array<ColDef<CurrencyPair>> = [
  { headerName: "Symbol", field: "symbol" },
  { headerName: "Last", field: "lastPrice" },
  {
    headerName: "Net",
    field: "net",
    valueFormatter: (params) => (params.value ? params.value.toFixed(2) : null),
  },
  {
    headerName: "% NC",
    field: "netChange",
    sort: "desc",
    valueFormatter: (params) =>
      params.value ? `${params.value.toFixed(2)}%` : params.value,
  },
];

export const fxQuoteMatrixColDefs: Array<ColDef<CurrencyPair>> = [
  { headerName: "Symbol", field: "symbol", sort: "asc" },
  { headerName: "Last", field: "lastPrice" },
  {
    headerName: "Net",
    field: "net",
    valueFormatter: (params) => (params.value ? params.value.toFixed(2) : null),
  },
  {
    headerName: "% NC",
    field: "netChange",
    valueFormatter: (params) =>
      params.value ? `${params.value.toFixed(2)}%` : params.value,
  },
];
