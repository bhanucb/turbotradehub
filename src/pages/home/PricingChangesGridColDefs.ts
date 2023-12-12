import { ColDef } from "ag-grid-community";
import { StockData } from "../../api/StockData";

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

export const topMoversGridColDefs: Array<ColDef<StockData>> = [
  { headerName: "Symbol", field: "symbol" },
  { headerName: "Last Price", field: "price" },
  {
    headerName: "Net",
    field: "net",
    valueFormatter: (params) => (params.value ? params.value.toFixed(2) : null),
  },
  {
    headerName: "% NC",
    field: "netChangePercentage",
    sort: "desc",
    valueFormatter: (params) =>
      params.value ? `${params.value.toFixed(2)}%` : params.value,
  },
];
