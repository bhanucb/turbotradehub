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

const StyledPricingSheetGrid = styled("div")`
  height: 100%;
`;

type PriceChangesGridProp = {
  columnDefs: Array<ColDef>;
};

const PriceChangesGrid: FC<PriceChangesGridProp> = (props) => {
  const { columnDefs } = props;
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const [rowData, setRowData] = useState<Array<StockData>>([]);
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
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        getRowId={getRowId}
        onGridReady={handleGridReady}
      />
    </StyledPricingSheetGrid>
  );
};

export default PriceChangesGrid;
