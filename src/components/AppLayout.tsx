import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactElement,
  useMemo,
} from "react";
import { Layout, TabNode } from "flexlayout-react";
import lightThemeCssRaw from "flexlayout-react/style/light.css?raw";
import darkThemeCssRaw from "flexlayout-react/style/dark.css?raw";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PriceSheetOptions from "../pages/home/pricing/options/PriceSheetOptions";
import PricingSummary from "../pages/home/pricing/pricingSummary/PricingSummary";
import TradeBooking from "../pages/home/pricing/tradeBooking/TradeBooking";
import PriceSheetGrid from "../pages/home/pricing/priceSheet/PriceSheetGrid";
import SummaryBox from "../pages/home/summary/SummaryBox";
import WatchBox from "../pages/home/watch/WatchBox";
import TabManagement from "../pages/home/tabs/TabManagement";
import PricingLayout from "../pages/home/pricing/PricingLayout";
import Unmount from "./popout/Unmount";
import { useAppSelector } from "../state/Store";
import DiscountGrid from "../pages/aq/discount/DiscountGrid";
import TierGrid from "../pages/aq/tier/TierGrid";
import ClientGrid from "../pages/aq/client/ClientGrid";
import LayoutPopout from "./popout/LayoutPopout";

export const MoveNodeAction = "FlexLayout_MoveNode";
export const SelectTabAction = "FlexLayout_SelectTab";
export const DeleteTabAction = "FlexLayout_DeleteTab";
export const AddNodeAction = "FlexLayout_AddNode";
export const MaximizeToggleAction = "FlexLayout_MaximizeToggle";

export type LayoutAction =
  | typeof MoveNodeAction
  | typeof SelectTabAction
  | typeof DeleteTabAction
  | typeof AddNodeAction
  | typeof MaximizeToggleAction;

export enum LayoutComponentKeys {
  pricingSummary = "pricingSummary",
  tradeBooking = "tradeBooking",
  priceSheet = "priceSheet",
  priceSheetOptions = "priceSheetOptions",
  summaryBox = "summaryBox",
  watchBox = "watchBox",
  tabManager = "tabManager",
  pricingLayout = "pricingLayout",
  discountGrid = "discountGrid",
  tierGrid = "tierGrid",
  clientGrid = "clientGrid",
  unmount = "unmount",
  error = "error",
}

const layoutComponents: Map<LayoutComponentKeys, ReactElement> = new Map([
  [LayoutComponentKeys.pricingSummary, <PricingSummary />],
  [LayoutComponentKeys.tradeBooking, <TradeBooking />],
  [LayoutComponentKeys.priceSheet, <PriceSheetGrid />],
  [LayoutComponentKeys.priceSheetOptions, <PriceSheetOptions />],
  [LayoutComponentKeys.summaryBox, <SummaryBox />],
  [LayoutComponentKeys.watchBox, <WatchBox />],
  [LayoutComponentKeys.tabManager, <TabManagement />],
  [LayoutComponentKeys.pricingLayout, <PricingLayout />],
  [LayoutComponentKeys.discountGrid, <DiscountGrid />],
  [LayoutComponentKeys.tierGrid, <TierGrid />],
  [LayoutComponentKeys.clientGrid, <ClientGrid />],
  [LayoutComponentKeys.error, <div>Error Loading Component</div>],
]);

export function getLayoutComponent(key: LayoutComponentKeys): ReactElement {
  return layoutComponents.get(key) ?? <></>;
}

const factory = (node: TabNode) => {
  const component = node.getComponent();
  if (component === undefined) return <></>;

  if (component === LayoutComponentKeys.unmount) {
    return <Unmount node={node} />;
  }

  return getLayoutComponent(component as LayoutComponentKeys);
};

type AppLayoutProps = Omit<ComponentProps<typeof Layout>, "factory">;

const AppLayout = forwardRef(
  (props: AppLayoutProps, layoutRef: ForwardedRef<Layout>) => {
    const { currentTheme } = useAppSelector((state) => state.theme);
    const lightThemeCss = useMemo(
      () => lightThemeCssRaw.replace(/\/\*#\ssourceMappingURL=.*/gm, ""),
      [lightThemeCssRaw]
    );
    const darkThemeCss = useMemo(
      () => darkThemeCssRaw.replace(/\/\*#\ssourceMappingURL=.*/gm, ""),
      [darkThemeCssRaw]
    );

    return (
      <HelmetProvider>
        <Helmet>
          <style>
            {currentTheme === "light" ? lightThemeCss : darkThemeCss}
          </style>
        </Helmet>
        <LayoutPopout layoutModel={props.model} />
        <Layout ref={layoutRef} {...props} factory={factory} />
      </HelmetProvider>
    );
  }
);

export default AppLayout;
