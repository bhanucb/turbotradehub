import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ColDef,
  ColumnApi,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
} from "ag-grid-community";
import AppGrid from "../../components/AppGrid";
import { fxQuoteMatrixColDefs } from "./GridColDefs";
import {
  DynamicCurrencyPair,
  getFxQuotes,
  getFxQuotesLive,
} from "../../api/DynamicCurrencyPair";
import Box from "@mui/material/Box";

const CurrencyPairMatrix: FC = () => {
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const [rowData, setRowData] = useState<DynamicCurrencyPair[]>([]);
  const [colDefs, setColDefs] = useState<ColDef[]>(fxQuoteMatrixColDefs);
  const defaultColDef = useMemo<ColDef>(
    () => ({
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true,
    }),
    []
  );
  const dynamicColDefs = useMemo<ColDef>(
    () => ({
      enableCellChangeFlash: true,
      valueFormatter: (
        params: ValueFormatterParams<DynamicCurrencyPair, number>
      ) => {
        return params.value ? params.value.toFixed(2) : "";
      },
    }),
    []
  );

  const handleGridReady = useCallback((e: GridReadyEvent) => {
    gridApi.current = e.api;
    columnApi.current = e.columnApi;
  }, []);

  function getRowId(params: GetRowIdParams) {
    return (params.data as DynamicCurrencyPair).id.toString();
  }

  useEffect(() => {
    getFxQuotes()
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, symbol, net, netChange, lastPrice, ...otherFields } =
          data[0];
        const defs = Object.keys(otherFields).map(
          (currencyPair) =>
            ({
              headerName: currencyPair.toUpperCase(),
              field: currencyPair,
              ...dynamicColDefs,
            } as ColDef)
        );
        setColDefs([...fxQuoteMatrixColDefs, ...defs]);

        setRowData(data);
      })
      .catch((e) => console.error(e));
  }, [dynamicColDefs]);

  useEffect(() => {
    const sub = getFxQuotesLive().subscribe((data) => {
      gridApi.current?.applyTransaction({ update: data });
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <Box sx={{ height: { xs: "400px", lg: "100%" }, padding: 2 }}>
      <AppGrid
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        getRowId={getRowId}
        onGridReady={handleGridReady}
      />
    </Box>
  );
};

export default CurrencyPairMatrix;
