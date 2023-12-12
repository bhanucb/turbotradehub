import { MenuItemDef } from "ag-grid-community";
import { DisplaySelectionKeys, displaySelections } from "./DisplaySelector";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TvIcon from "@mui/icons-material/Tv";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";
import { BuySide, SellSide } from "../tradeBooking/TradeBooking";
import { renderMenuIcon } from "../../../../utils/Grid";

export type PriceSheetGridContextMenuCallbacks = {
  watch: { action: () => void };
  display: {
    action: (key: DisplaySelectionKeys) => void;
    check: (key: DisplaySelectionKeys) => boolean;
  };
  trade: { actions: { main: () => void; buy: () => void; sell: () => void } };
  dagChart: { actions: () => void };
};

export function getPriceSheetGridContextMenuItems(
  callbacks: PriceSheetGridContextMenuCallbacks
): Array<string | MenuItemDef> {
  const {
    watch: { action: watchItemAction },
    display: { action: displayItemAction, check: displayItemCheck },
    trade: {
      actions: {
        main: tradeMainAction,
        buy: tradeBuyAction,
        sell: tradeSellAction,
      },
    },
    dagChart: { actions: dagChartAction },
  } = callbacks;

  const displayMenuItem: MenuItemDef = {
    name: "Display",
    icon: renderMenuIcon(TvIcon),
    subMenu: displaySelections.map((selection) => {
      return {
        name: selection.value,
        checked: displayItemCheck(selection.key),
        action: () => displayItemAction(selection.key),
      };
    }),
  };

  const watchMenuItem: MenuItemDef = {
    name: "Watch",
    icon: renderMenuIcon(VisibilityIcon),
    action: watchItemAction,
  };

  const tradeMenuItem: MenuItemDef = {
    name: "Trade",
    icon: renderMenuIcon(CurrencyExchangeIcon),
    action: tradeMainAction,
    subMenu: [BuySide, SellSide].map((selection) => {
      return {
        name: selection,
        icon:
          selection === SellSide
            ? renderMenuIcon(RemoveIcon)
            : renderMenuIcon(AddIcon),
        action: selection === SellSide ? tradeSellAction : tradeBuyAction,
      };
    }),
  };

  const dagChartMenuItem: MenuItemDef = {
    name: "DAG Chart",
    icon: renderMenuIcon(BarChartIcon),
    action: dagChartAction,
  };

  return [
    displayMenuItem,
    watchMenuItem,
    tradeMenuItem,
    dagChartMenuItem,
    "copy",
    "paste",
    "separator",
    "export",
  ];
}
