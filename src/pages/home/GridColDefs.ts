import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { StockData } from "../../api/StockData";
import { CurrencyPair } from "../../api/CurrencyPair";
import { numberFormatter } from "../../utils/Formaters";

export const pricingChangesGridColDefs: ColDef<StockData>[] = [
  { headerName: "Symbol", field: "symbol", sort: "asc", minWidth: 150 },
  {
    headerName: "Price",
    field: "price",
    valueFormatter: numberFormatter,
  },
  { headerName: "Bid", field: "bid", valueFormatter: numberFormatter },
  { headerName: "Ask", field: "ask", valueFormatter: numberFormatter },
];

export const topMoversGridColDefs: ColDef<CurrencyPair>[] = [
  { headerName: "Symbol", field: "symbol" },
  { headerName: "Last", field: "lastPrice", valueFormatter: numberFormatter },
  {
    headerName: "Net",
    field: "net",
    valueFormatter: (params: ValueFormatterParams<CurrencyPair, number>) =>
      params.value ? params.value.toFixed(2) : "",
  },
  {
    headerName: "% NC",
    field: "netChange",
    sort: "desc",
    valueFormatter: (params: ValueFormatterParams<CurrencyPair, number>) =>
      params.value
        ? `${params.value.toFixed(2)}%`
        : params.value?.toString() ?? "",
  },
];

export const fxQuoteMatrixColDefs: ColDef<CurrencyPair>[] = [
  { headerName: "Symbol", field: "symbol", sort: "asc" },
  {
    headerName: "Last",
    field: "lastPrice",
    cellRenderer: "agAnimateShowChangeCellRenderer",
    valueFormatter: numberFormatter,
  },
  {
    headerName: "Net",
    field: "net",
    cellRenderer: "agAnimateShowChangeCellRenderer",
    valueFormatter: (params: ValueFormatterParams<CurrencyPair, number>) =>
      params.value ? params.value.toFixed(2) : "",
  },
  {
    headerName: "% NC",
    field: "netChange",
    cellRenderer: "agAnimateShowChangeCellRenderer",
    valueFormatter: (params: ValueFormatterParams<CurrencyPair, number>) =>
      params.value
        ? `${params.value.toFixed(2)}%`
        : params.value?.toString() ?? "",
  },
];
