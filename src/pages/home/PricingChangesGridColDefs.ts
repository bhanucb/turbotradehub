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