import {
  getPricingGridFilters,
  storeActiveFilter,
  updatePricingGridFilterLastUsed,
} from "../../../api/PricingGridFilters";
import { loadFilters, setActiveFilter } from "../../../state/PricingSheetSlice";
import { useAppDispatch, useAppSelector } from "../../../state/Store";

const UsePricingSheetFilter = () => {
  const { filters, activeFilter } = useAppSelector(
    (state) => state.pricingSheet
  );
  const dispatch = useAppDispatch();

  async function fetchFilters() {
    const filters = await getPricingGridFilters();
    dispatch(loadFilters(filters));
  }

  async function handleApplyFilter(filterName: string) {
    if (activeFilter?.name === filterName) {
      dispatch(setActiveFilter(null));
      await storeActiveFilter(null);
    } else {
      const filter = filters?.[filterName];
      if (!!filter) {
        await updatePricingGridFilterLastUsed(filterName);
        await storeActiveFilter(filterName);
        dispatch(setActiveFilter({ name: filterName, filter }));
        await fetchFilters();
      }
    }
  }

  return {
    fetchFilters,
    handleApplyFilter,
  };
};

export default UsePricingSheetFilter;
