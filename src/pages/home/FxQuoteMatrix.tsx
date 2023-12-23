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
import { fxQuoteMatrixColDefs } from "./GridColDefs";
import {
  DynamicCurrencyPair,
  getFxQuotes,
  getFxQuotesLive,
} from "../../api/CurrencyPair";

const StyledGrid = styled("div")`
  height: 100%;
`;

const FxQuoteMatrix: FC = () => {
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const [rowData, setRowData] = useState<Array<DynamicCurrencyPair>>([]);
  const [colDefs, setColDefs] = useState<Array<ColDef>>(fxQuoteMatrixColDefs);
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
    getFxQuotes().then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, symbol, net, netChange, lastPrice, ...otherFields } = data[0];
      const defs = Object.keys(otherFields).map(
        (currencyPair) =>
          ({
            headerName: currencyPair.toUpperCase(),
            field: currencyPair,
          } as ColDef)
      );
      setColDefs([...fxQuoteMatrixColDefs, ...defs]);

      setRowData(data);
    });
  }, []);

  useEffect(() => {
    const sub = getFxQuotesLive().subscribe((data) => {
      console.log(data);
      gridApi.current?.applyTransaction({ update: data });
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <StyledGrid>
      <AppGrid
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        getRowId={getRowId}
        onGridReady={handleGridReady}
      />
    </StyledGrid>
  );
};

export default FxQuoteMatrix;
