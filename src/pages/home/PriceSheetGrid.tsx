import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ColDef,
  ColumnApi,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import AppGrid from "../../components/AppGrid";
import AppSnackbar, { useSnackbar } from "../../components/AppSnackbar";
import { pricingSheetColDefs } from "./PricingSheetColDefs";

const StyledPricingSheetGrid = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-bar {
    height: 48px;
    display: flex;
    align-items: center;
  }

  .grid {
    flex: 1;
  }

  .option {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 8px;

    .label {
      padding-right: 8px;
    }
  }
`;

const PriceSheetGrid: FC = () => {
  const { open, message, duration, severity, showMessage, closeMessage } =
    useSnackbar();
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const [columnDefs] = useState<Array<ColDef>>(pricingSheetColDefs);
  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      enableRowGroup: true,
      filter: "agMultiColumnFilter",
      floatingFilter: true,
      menuTabs: ["generalMenuTab", "filterMenuTab"],
    }),
    []
  );

  const handleGridReady = useCallback((e: GridReadyEvent) => {
    gridApi.current = e.api;
    columnApi.current = e.columnApi;
  }, []);

  function getRowId(params: GetRowIdParams) {
    return params.data.bbgId59 + params.data.traderName;
  }

  useEffect(() => {
    showMessage("Hello Grid");
  }, [showMessage]);

  return (
    <StyledPricingSheetGrid>
      <Box className="grid">
        <AppGrid
          columnHoverHighlight={true}
          rowSelection="multiple"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          skipHeaderOnAutoSize={true}
          suppressCopyRowsToClipboard={true}
          getRowId={getRowId}
          onGridReady={handleGridReady}
        />
      </Box>
      <AppSnackbar
        open={open}
        message={message}
        duration={duration}
        severity={severity}
        onClose={closeMessage}
      />
    </StyledPricingSheetGrid>
  );
};

export default PriceSheetGrid;
