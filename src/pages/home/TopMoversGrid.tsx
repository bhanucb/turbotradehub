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
import { topMoversGridColDefs } from "./GridColDefs";
import { CurrencyPair, getCurrencyPairs } from "../../api/CurrencyPair";

const StyledPricingSheetGrid = styled("div")`
  height: 100%;
`;

const TopMoversGrid: FC = () => {
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const [rowData, setRowData] = useState<Array<CurrencyPair>>([]);
  const colDefs = useRef<Array<ColDef>>(topMoversGridColDefs);
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
    getCurrencyPairs().then((data) => setRowData(data));
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

export default TopMoversGrid;
