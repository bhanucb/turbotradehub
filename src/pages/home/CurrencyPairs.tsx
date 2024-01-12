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
import { topMoversGridColDefs } from "./GridColDefs";
import { getCurrencyPairLive, getCurrencyPairs } from "../../api/CurrencyPair";
import { DEFAULT_COLUMN_DEFINITIONS } from "../../utils/Grid";

const StyledGrid = styled("div")`
  height: 100%;
`;

const CurrencyPairs: FC = () => {
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const colDefs = useRef<ColDef[]>(topMoversGridColDefs);

  const handleGridReady = useCallback((e: GridReadyEvent) => {
    gridApi.current = e.api;
    columnApi.current = e.columnApi;
  }, []);

  function getRowId(params: GetRowIdParams) {
    return params.data.id;
  }

  useEffect(() => {
    getCurrencyPairs().then((data) => {
      gridApi.current?.setRowData(data);
    });

    const subscription = getCurrencyPairLive().subscribe((data) => {
      gridApi.current?.applyTransaction({ update: data });
    });
    return () => {
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

export default CurrencyPairs;
