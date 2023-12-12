import { MutableRefObject, useEffect, useRef } from "react";
import { PricingGridFilter } from "../../../../models/PricingGridFilter";
import { useAppDispatch, useAppSelector } from "../../../../state/Store";
import { FilterChangedEvent, GridApi } from "ag-grid-community";
import {
  ActiveFilterState,
  setActiveFilter,
  setRunningFilter,
} from "../../../../state/PricingSheetSlice";
import dayjs from "dayjs";

const UseGridFilter = (props: {
  gridApi: MutableRefObject<GridApi | undefined>;
}) => {
  const { gridApi } = props;
  const { activeFilter } = useAppSelector((state) => state.pricingSheet);
  const dispatch = useAppDispatch();
  const loadingGridFilter = useRef(false);

  function setFilterInGrid(activeFilter: ActiveFilterState) {
    if (activeFilter === undefined) return;

    if (activeFilter === null) {
      gridApi.current?.setFilterModel(activeFilter);
    } else {
      const {
        filter: { lastUsed, ...gridFilter },
      } = activeFilter;
      gridApi.current?.setFilterModel(gridFilter);
    }
  }

  function handleFilterChanged(event: FilterChangedEvent) {
    const { api } = event;

    // HACK: there's no clean way to check if a filter change has been triggered by the API or the user
    // Under the current setup, afterFloatingFilter always returns undefined if the filter is set by the API.
    if (event.afterFloatingFilter === undefined) return;

    // setting setActiveFilter to undefined will unselect the active filter
    // setting it to undefined instead of null to prevent a rerender (activeFilter = null is a valid state)
    dispatch(setActiveFilter(undefined));

    if (!api.isAnyFilterPresent()) {
      dispatch(setRunningFilter(null));
    } else {
      const filter: PricingGridFilter = {
        ...api.getFilterModel(),
        lastUsed: dayjs().toISOString(),
      };
      dispatch(setRunningFilter(filter));
    }
  }

  useEffect(() => {
    setFilterInGrid(activeFilter);
  }, [activeFilter]);

  return {
    loadingGridFilter,
    setFilterInGrid,
    handleFilterChanged,
  };
};

export default UseGridFilter;
