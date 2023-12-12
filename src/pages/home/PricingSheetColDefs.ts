import { ColDef } from "ag-grid-community";
import { rowIndexValueGetter } from "../../utils/ValueGetters";

export const pricingSheetColDefs: Array<ColDef> = [
  {
    headerName: "#",
    valueGetter: rowIndexValueGetter,
    pinned: "left",
    enableRowGroup: false,
    suppressMenu: true,
    sortable: false,
    filter: false,
  },
  { field: "cusip", headerName: "CUSIP", minWidth: 100 },
];
