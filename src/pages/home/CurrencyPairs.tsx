import { FC, useCallback, useEffect, useRef } from "react";
import {
  ColDef,
  ColumnApi,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";
import AppGrid from "../../components/AppGrid";
import { topMoversGridColDefs } from "./GridColDefs";
import {
  CurrencyPair,
  getCurrencyPairLive,
  getCurrencyPairs,
} from "../../api/CurrencyPair";
import { DEFAULT_COLUMN_DEFINITIONS } from "../../utils/Grid";
import Box from "@mui/material/Box";

const CurrencyPairs: FC = () => {
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const colDefs = useRef<ColDef[]>(topMoversGridColDefs);

  const handleGridReady = useCallback((e: GridReadyEvent) => {
    gridApi.current = e.api;
    columnApi.current = e.columnApi;
  }, []);

  function getRowId(params: GetRowIdParams) {
    return (params.data as CurrencyPair).id;
  }

  useEffect(() => {
    getCurrencyPairs()
      .then((data) => {
        gridApi.current?.setRowData(data);
      })
      .catch((e) => console.error(e));

    const subscription = getCurrencyPairLive().subscribe((data) => {
      gridApi.current?.applyTransaction({ update: data });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Box sx={{ height: { xs: "400px", lg: "100%" }, padding: 2 }}>
      <AppGrid
        columnDefs={colDefs.current}
        defaultColDef={DEFAULT_COLUMN_DEFINITIONS}
        animateRows={true}
        getRowId={getRowId}
        onGridReady={handleGridReady}
      />
    </Box>
  );
};

export default CurrencyPairs;
