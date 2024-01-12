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
import { topMoversGridColDefs } from "./GridColDefs";
import { getCurrencyPairLive, getCurrencyPairs } from "../../api/CurrencyPair";

const StyledGrid = styled("div")`
  height: 100%;
`;

const CurrencyPairs: FC = () => {
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const colDefs = useRef<Array<ColDef>>(topMoversGridColDefs);
  const defaultColDef = useMemo<ColDef>(
    () => ({
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true,
      cellRenderer: "agAnimateShowChangeCellRenderer",
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
        defaultColDef={defaultColDef}
        animateRows={true}
        getRowId={getRowId}
        onGridReady={handleGridReady}
      />
    </StyledGrid>
  );
};

export default CurrencyPairs;
