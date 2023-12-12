import { ColDef } from "ag-grid-community";
import { numberFormatter } from "../../../../../utils/Formaters";
import AutoCompleteEditor from "../../../components/AutoCompleteEditor";
import { searchBenchmarks } from "../../../../../api/Benchmarks";
import { Price } from "../../../../../models/Price";
import selectOnFocusNumberEditor from "../../../components/SelectOnFocusNumberEditor";
import { filterDateParams } from "../../../../../utils/Grid";
import { rowIndexValueGetter } from "../../../../../utils/ValueGetters";

export const pricingSheetColDefs: Array<ColDef<Price>> = [
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
  { field: "isin", headerName: "ISIN", minWidth: 100 },
  { field: "bbgId59", headerName: "BBGID59", minWidth: 100 },
  {
    field: "maturity",
    headerName: "Maturity",
    minWidth: 100,
    filter: "agDateColumnFilter",
    filterParams: filterDateParams,
  },
  { field: "traderName", headerName: "Trader Name", minWidth: 130 },
  {
    field: "bidSpreadToBenchmark",
    headerName: "Bid Spread To Benchmark",
    minWidth: 150,
    editable: true,
    type: "numericColumn",
    filter: "agNumberColumnFilter",
    valueFormatter: numberFormatter,
    enableRowGroup: false,
    cellEditor: selectOnFocusNumberEditor,
  },
  {
    field: "cibcOfficialBidPrice",
    headerName: "Px Bid",
    minWidth: 100,
    editable: true,
    type: "numericColumn",
    filter: "agNumberColumnFilter",
    valueFormatter: numberFormatter,
    enableCellChangeFlash: true,
    enableRowGroup: false,
    cellEditor: selectOnFocusNumberEditor,
  },
  {
    field: "cibcOfficialAskPrice",
    headerName: "Px Ask",
    type: "numericColumn",
    minWidth: 80,
    maxWidth: 100,
    editable: true,
    filter: "agNumberColumnFilter",
    valueFormatter: numberFormatter,
    enableCellChangeFlash: true,
    enableRowGroup: false,
    cellEditor: selectOnFocusNumberEditor,
  },
  {
    field: "cibcOfficialBidYield",
    headerName: "Yld Cnv Bid",
    minWidth: 80,
    maxWidth: 100,
    editable: true,
    type: "numericColumn",
    filter: "agNumberColumnFilter",
    valueFormatter: numberFormatter,
    enableCellChangeFlash: true,
    enableRowGroup: false,
    cellEditor: selectOnFocusNumberEditor,
  },
  {
    field: "benchmarkSecurity",
    headerName: "Bnchmrk Sec Des",
    minWidth: 150,
    editable: true,
    cellEditor: AutoCompleteEditor,
    cellEditorParams: {
      options: searchBenchmarks,
    },
  },
];
