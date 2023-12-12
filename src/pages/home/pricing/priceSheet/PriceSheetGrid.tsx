import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ColDef,
  ColumnApi,
  ColumnRowGroupChangedEvent,
  FirstDataRenderedEvent,
  GetContextMenuItemsParams,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  MenuItemDef,
} from "ag-grid-community";
import { pricingSheetColDefs } from "./columnDefinitions/PricingSheetColDefs";
import { pcMainColDefs } from "./columnDefinitions/PcMainColDefs";
import { usePricingData } from "../../UsePricingData";
import { addWatchItem } from "../../../../api/WatchItems";
import AppSnackbar, { useSnackbar } from "../../../../components/AppSnackbar";
import { getPriceSheetGridContextMenuItems } from "./PriceSheetGridContextMenu";
import { useAppDispatch, useAppSelector } from "../../../../state/Store";
import { changeSelection } from "../../../../state/PricingSheetSlice";
import { onWatchItem } from "../../../../state/TabManagementSlice";
import { setupTrade } from "../../../../state/TradeBookingSlice";
import { RawMessage } from "../../../../models/RawMessage";
import { BuySide, SellSide } from "../tradeBooking/TradeBooking";
import { resizeColumns } from "../../../../utils/Grid";
import AppGrid from "../../../../components/AppGrid";
import Box from "@mui/material/Box";
import DisplaySelector from "./DisplaySelector";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import RecentFilters from "./RecentFilters";
import useGridFilter from "./UseGridFilter";
import usePopout from "../../../../components/popout/hooks/UsePopout";
import { PopoutComponentKeys } from "../../../popout/Popout";

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
  const { openPopup } = usePopout();
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();
  const { getPricingData } = usePricingData();
  const { isSandboxModeOn } = useAppSelector((state) => state.sandbox);
  const { display, activeFilter } = useAppSelector(
    (state) => state.pricingSheet
  );
  const dispatch = useAppDispatch();
  const [columnDefs] = useState<Array<ColDef>>(pricingSheetColDefs);
  const { handleFilterChanged, setFilterInGrid } = useGridFilter({ gridApi });
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

  const handleFirstDataRendered = useCallback(
    (e: FirstDataRenderedEvent) => {
      resizeColumns(e.columnApi);
      setFilterInGrid(activeFilter);
    },
    [activeFilter]
  );

  const handleGridColumnsChanged = useCallback(() => {
    if (columnApi.current === undefined) return;

    resizeColumns(columnApi.current);
  }, []);

  function handleColumnRowGroupChanged(event: ColumnRowGroupChangedEvent) {
    const { columnApi } = event;

    resizeColumns(columnApi);
  }

  function getRowId(params: GetRowIdParams) {
    return params.data.bbgId59 + params.data.traderName;
  }

  function getContextMenuItems(
    params: GetContextMenuItemsParams
  ): Array<string | MenuItemDef> {
    return getPriceSheetGridContextMenuItems({
      watch: {
        action: async () => {
          const { node } = params;
          const message = node?.data;

          if (message === undefined) return;

          const { bbgId59, traderName } = message;

          dispatch(onWatchItem({ bbgId59, traderName }));
          try {
            await addWatchItem({ bbgId59, traderName });
          } catch (e) {
            showMessage(e as string, "error");
          }
        },
      },
      display: {
        check: (selection) => selection === display,
        action: (selection) => dispatch(changeSelection(selection)),
      },
      trade: {
        actions: {
          main: () => {
            if (params.node === null) return;
            const { traderName, isin } = params.node.data as RawMessage;
            dispatch(
              setupTrade({
                portfolio: traderName,
                security: isin,
                price: null,
                side: null,
              })
            );
          },
          buy: () => {
            if (params.node === null) return;
            const { traderName, isin, cibcOfficialBidPrice } = params.node
              .data as RawMessage;
            dispatch(
              setupTrade({
                portfolio: traderName,
                security: isin,
                price: cibcOfficialBidPrice,
                side: BuySide,
              })
            );
          },
          sell: () => {
            if (params.node === null) return;
            const { traderName, isin, cibcOfficialAskPrice } = params.node
              .data as RawMessage;
            dispatch(
              setupTrade({
                portfolio: traderName,
                security: isin,
                price: cibcOfficialAskPrice,
                side: SellSide,
              })
            );
          },
        },
      },
      dagChart: {
        actions: async () => {
          await openPopup(
            PopoutComponentKeys.dagChart,
            PopoutComponentKeys.dagChart
          );
        },
      },
    });
  }

  useEffect(() => {
    const subscription = getPricingData(
      isSandboxModeOn,
      (snap) => gridApi.current?.setRowData(snap),
      (streamData) => {
        const { add, update } = streamData;
        gridApi.current?.applyTransactionAsync({ add, update });
      }
    );

    return () => subscription?.unsubscribe();
  }, [gridApi, isSandboxModeOn, getPricingData]);

  useEffect(() => {
    switch (display) {
      case "pricingSheet":
        gridApi.current?.setColumnDefs(pricingSheetColDefs);
        break;
      case "pcMain":
        gridApi.current?.setColumnDefs(pcMainColDefs);
        break;
    }
  }, [display]);

  return (
    <StyledPricingSheetGrid>
      <Box className="top-bar">
        <Box className="option">
          <Typography variant="caption" className="label">
            Display
          </Typography>
          <DisplaySelector />
        </Box>
        <Box className="option">
          <RecentFilters />
        </Box>
      </Box>
      <Box className="grid">
        <AppGrid
          columnHoverHighlight={true}
          rowSelection="multiple"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          skipHeaderOnAutoSize={true}
          rowGroupPanelShow="always"
          singleClickEdit={true}
          suppressCopyRowsToClipboard={true}
          getRowId={getRowId}
          getContextMenuItems={getContextMenuItems}
          onGridReady={handleGridReady}
          onFirstDataRendered={handleFirstDataRendered}
          onGridColumnsChanged={handleGridColumnsChanged}
          onColumnRowGroupChanged={handleColumnRowGroupChanged}
          onFilterChanged={handleFilterChanged}
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
