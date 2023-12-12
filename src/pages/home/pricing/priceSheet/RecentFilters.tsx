import { FC, useMemo } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppSelector } from "../../../../state/Store";
import dayjs from "dayjs";
import useGridFilter from "../UsePricingSheetFilter";
import Typography from "@mui/material/Typography";
import AppSnackbar, { useSnackbar } from "../../../../components/AppSnackbar";

const MAXIMUM_FILTERS_SHOWN = 4;

const RecentFilters: FC = () => {
  const { handleApplyFilter } = useGridFilter();
  const { filters, activeFilter } = useAppSelector(
    (state) => state.pricingSheet
  );
  const { open, message, duration, severity, showMessage, closeMessage } =
    useSnackbar();

  const sortedFilterNames = useMemo(() => {
    return Object.entries(filters ?? {})
      .map((value) => {
        const [filterName, filter] = value;
        const { lastUsed } = filter;
        return { filterName, lastUsed };
      })
      .sort((a, b) =>
        dayjs(a.lastUsed).isBefore(dayjs(b.lastUsed))
          ? 1
          : dayjs(b.lastUsed).isBefore(dayjs(a.lastUsed))
          ? -1
          : 0
      )
      .map((filters) => filters.filterName);
  }, [filters]);

  async function handleClickApplyFilter(filterName: string) {
    try {
      await handleApplyFilter(filterName);
    } catch (e) {
      console.error(e);
      showMessage(`Error applying filter. ${e}`, "error");
    }
  }

  if (filters === null) return <></>;

  return (
    <>
      <Typography variant="caption" className="label">
        Recent Filters
      </Typography>
      <ToggleButtonGroup
        value={activeFilter?.name}
        size="small"
        exclusive
        onChange={() => {}}
      >
        {sortedFilterNames
          .slice(0, MAXIMUM_FILTERS_SHOWN)
          .map((filterName, index) => (
            <ToggleButton
              value={filterName}
              key={index}
              onClick={() => handleClickApplyFilter(filterName)}
            >
              {filterName}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
      <AppSnackbar
        open={open}
        message={message}
        duration={duration}
        severity={severity}
        onClose={closeMessage}
      />
    </>
  );
};

export default RecentFilters;
