import { FC, useCallback, useEffect, useMemo, useRef } from "react";
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

const StyledGrid = styled("div")`
  height: 100%;
`;

const PriceChangesGrid: FC = () => {
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const colDefs = useRef<Array<ColDef>>(pricingChangesGridColDefs);
  const defaultColDef = useMemo<ColDef>(
    () => ({
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true,
    }),
    []
  );

  const handleGridReady = useCallback((e: GridReadyEvent) => {
    gridApi.current = e.api;
    columnApi.current = e.columnApi;
  }, []);

  function getRowId(params: GetRowIdParams) {
    return params.data.id;
  }

  useEffect(() => {
    const firstSub = getStockDataLive()
      .pipe(first())
      .subscribe((data) => {
        gridApi.current?.setRowData(data);
      });

    const sub = getStockDataLive()
      .pipe(skip(1))
      .subscribe((data) => {
        gridApi.current?.applyTransaction({ update: data });
      });

    return () => {
      firstSub.unsubscribe();
      sub.unsubscribe();
    };
  }, []);

  return (
    <StyledGrid>
      <AppGrid
        columnDefs={colDefs.current}
        defaultColDef={defaultColDef}
        animateRows={true}
        getRowId={getRowId}
        onGridReady={handleGridReady}
      />
    </StyledGrid>
  );
};

export default PriceChangesGrid;
