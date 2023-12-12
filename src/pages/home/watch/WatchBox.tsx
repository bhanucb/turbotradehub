import { FC, useEffect, useRef, useState } from "react";
import AppGrid from "../../../components/AppGrid";
import {
  ColDef,
  ColumnApi,
  FirstDataRenderedEvent,
  GetContextMenuItemsParams,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  MenuItemDef,
} from "ag-grid-community";
import { watchBoxColDefs } from "./WatchBoxColDefs";
import { Subscription } from "rxjs";
import { deleteWatchItem, getWatchItems } from "../../../api/WatchItems";
import ReactDOMServer from "react-dom/server";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAppSelector } from "../../../state/Store";
import { resizeColumns } from "../../../utils/Grid";
import { usePricingData } from "../UsePricingData";

const WatchBox: FC = () => {
  const { currentWatchItem } = useAppSelector((state) => state.tabManagement);
  const { isSandboxModeOn } = useAppSelector((state) => state.sandbox);
  const [columnDefs] = useState<Array<ColDef>>(watchBoxColDefs);
  const [watchItemsCount, setWatchItemsCount] = useState(0);
  const { getPricingData } = usePricingData();
  const columnApi = useRef<ColumnApi>();
  const gridApi = useRef<GridApi>();

  useEffect(() => {
    let subscription: Subscription | null;

    getWatchItems().then((watchItems) => {
      setWatchItemsCount(watchItems.length);

      subscription = getPricingData(
        isSandboxModeOn,
        (snapshot) => gridApi.current?.setRowData(snapshot),
        (streamData) => {
          const { add, update } = streamData;
          gridApi.current?.applyTransactionAsync({ add, update });
        },
        (message) =>
          watchItems.findIndex(
            (w) =>
              w.bbgId59 === message.bbgId59 &&
              w.traderName === message.traderName
          ) > -1
      );
    });

    return () => subscription?.unsubscribe();
  }, [
    gridApi,
    isSandboxModeOn,
    getPricingData,
    watchItemsCount,
    currentWatchItem,
  ]);

  function handleGridReady(e: GridReadyEvent) {
    gridApi.current = e.api;
    columnApi.current = e.columnApi;
    resizeColumns(e.columnApi);
  }

  function handleFirstDataRendered(e: FirstDataRenderedEvent) {
    resizeColumns(e.columnApi);
  }

  function getRowId(params: GetRowIdParams) {
    return params.data.bbgId59 + params.data.traderName;
  }

  function getWatchIcon(): string {
    return ReactDOMServer.renderToStaticMarkup(
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VisibilityOffIcon style={{ fontSize: "16px" }} />
      </div>
    );
  }

  function getContextMenuItems(
    params: GetContextMenuItemsParams
  ): Array<string | MenuItemDef> {
    const { node } = params;

    const watchAction = async () => {
      const bbgId59 = node?.data.bbgId59;
      const traderName = node?.data.traderName;

      await deleteWatchItem({ bbgId59, traderName });
      setWatchItemsCount((prevState) => prevState - 1);
    };

    const watchMenuItem: MenuItemDef = {
      name: "Unwatch",
      icon: getWatchIcon(),
      action: watchAction,
    };

    return [watchMenuItem];
  }

  return (
    <AppGrid
      columnHoverHighlight={true}
      columnDefs={columnDefs}
      getRowId={getRowId}
      getContextMenuItems={getContextMenuItems}
      onGridReady={handleGridReady}
      onFirstDataRendered={handleFirstDataRendered}
    />
  );
};

export default WatchBox;
