import { FC, useEffect, useRef, useState } from "react";
import { Action, Actions, Model } from "flexlayout-react";
import gridLayoutModel from "./PricingLayoutModel";
import AppLayout, {
  DeleteTabAction,
  LayoutAction,
  MaximizeToggleAction,
  MoveNodeAction,
  SelectTabAction,
} from "../../../components/AppLayout";
import {
  getLastSavedPricingLayout,
  savePricingLayout,
} from "../../../api/Layouts";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../../state/Store";
import {
  getActiveFilter,
  getPricingGridFilters,
} from "../../../api/PricingGridFilters";
import { loadFilters, setActiveFilter } from "../../../state/PricingSheetSlice";

const LayoutContainer = styled.div`
  height: 100%;
`;

const PricingLayout: FC = () => {
  const [layoutModel, setLayoutModel] = useState<Model>(
    Model.fromJson(gridLayoutModel)
  );
  const layoutAction = useRef<LayoutAction>();
  const { selectedTabId: selectedBook } = useAppSelector(
    (state) => state.tabManagement
  );
  const { security, portfolio, price } = useAppSelector(
    (state) => state.tradeBooking
  );
  const dispatch = useAppDispatch();

  async function loadAndSetupPricingGridFilters() {
    const filters = await getPricingGridFilters();
    dispatch(loadFilters(filters));

    const activeFilterName = await getActiveFilter();
    if (activeFilterName === null) {
      dispatch(setActiveFilter(undefined));
      return;
    }

    const activeFilter = filters?.[activeFilterName];
    if (activeFilter !== undefined) {
      dispatch(
        setActiveFilter({ name: activeFilterName, filter: activeFilter })
      );
      return;
    }
  }

  useEffect(() => {
    loadAndSetupPricingGridFilters().then();

    if (selectedBook !== undefined) {
      getLastSavedPricingLayout(selectedBook).then((model) => {
        if (!!model) {
          model.doAction(
            Actions.updateNodeAttributes("border_bottom", { selected: -1 })
          );
          setLayoutModel(model);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (security === null && portfolio === null && price === null) {
      return;
    }
    layoutModel.doAction(
      Actions.updateNodeAttributes("border_bottom", { selected: 0 })
    );
  }, [security, portfolio, price]);

  function handleLayoutAction(action: Action) {
    layoutAction.current = action.type as LayoutAction;
    return action;
  }

  async function handleModelChange(model: Model) {
    if (
      layoutAction.current === SelectTabAction ||
      layoutAction.current === MoveNodeAction ||
      layoutAction.current === DeleteTabAction ||
      layoutAction.current === MaximizeToggleAction
    ) {
      if (selectedBook !== undefined) {
        await savePricingLayout(selectedBook, model);
      }
    }
  }

  return (
    <LayoutContainer>
      <AppLayout
        model={layoutModel}
        onAction={handleLayoutAction}
        onModelChange={handleModelChange}
      />
    </LayoutContainer>
  );
};

export default PricingLayout;
