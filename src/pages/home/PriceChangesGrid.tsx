import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ColDef,
  ColumnApi,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";
import { styled } from "@mui/material/styles";
import AppGrid from "../../components/AppGrid";
import { getStockData, StockData } from "../../api/StockData";
import { pricingChangesGridColDefs } from "./GridColDefs";

const StyledPricingSheetGrid = styled("div")`
  height: 100%;
`;

const PriceChangesGrid: FC = () => {
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const [rowData, setRowData] = useState<Array<StockData>>([]);
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
    getStockData().then((data) => setRowData(data));
  }, []);

  return (
    <StyledPricingSheetGrid>
      <AppGrid
        rowData={rowData}
        columnDefs={colDefs.current}
        defaultColDef={defaultColDef}
        animateRows={true}
        getRowId={getRowId}
        onGridReady={handleGridReady}
      />
    </StyledPricingSheetGrid>
  );
};

export default PriceChangesGrid;
