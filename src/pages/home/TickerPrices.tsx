import { FC, useCallback, useEffect, useRef } from "react";
import {
  ColDef,
  ColumnApi,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";
import { styled } from "@mui/material/styles";
import AppGrid from "../../components/AppGrid";
import { getStockDataLive } from "../../api/StockData";
import { pricingChangesGridColDefs } from "./GridColDefs";
import { first, skip } from "rxjs";
import { DEFAULT_COLUMN_DEFINITIONS } from "../../utils/Grid";

const StyledGrid = styled("div")`
  height: 100%;
`;

const TickerPrices: FC = () => {
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const colDefs = useRef<ColDef[]>(pricingChangesGridColDefs);

  const handleGridReady = useCallback((e: GridReadyEvent) => {
    gridApi.current = e.api;
    columnApi.current = e.columnApi;
  }, []);

  function getRowId(params: GetRowIdParams) {
    return params.data.id;
  }

  useEffect(() => {
    const initialLoadSubscription = getStockDataLive()
      .pipe(first())
      .subscribe((data) => {
        gridApi.current?.setRowData(data);
      });

    const subscription = getStockDataLive()
      .pipe(skip(1))
      .subscribe((data) => {
        gridApi.current?.applyTransaction({ update: data });
      });

    return () => {
      initialLoadSubscription.unsubscribe();
      subscription.unsubscribe();
    };
  }, []);

  return (
    <StyledGrid>
      <AppGrid
        columnDefs={colDefs.current}
        defaultColDef={DEFAULT_COLUMN_DEFINITIONS}
        animateRows={true}
        getRowId={getRowId}
        onGridReady={handleGridReady}
      />
    </StyledGrid>
  );
};

export default TickerPrices;
