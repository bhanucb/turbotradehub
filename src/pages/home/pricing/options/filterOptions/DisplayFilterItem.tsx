import { FC, useCallback, useMemo } from "react";
import { useAppSelector } from "../../../../../state/Store";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import useGridFilter from "../../UsePricingSheetFilter";
import { deletePricingGridFilter } from "../../../../../api/PricingGridFilters";
import AppSnackbar, {
  useSnackbar,
} from "../../../../../components/AppSnackbar";

const StyledDisplayFilterItem = styled(Chip)`
  margin-bottom: 5px;
  margin-right: 5px;
`;

export type DisplayFilterItemProps = {
  filterName: string;
};

const DisplayFilterItem: FC<DisplayFilterItemProps> = (props) => {
  const { filterName } = props;
  const { fetchFilters, handleApplyFilter } = useGridFilter();
  const { activeFilter } = useAppSelector((state) => state.pricingSheet);
  const { open, message, duration, severity, showMessage, closeMessage } =
    useSnackbar();

  const onDelete = useMemo(() => {
    return activeFilter?.name === filterName
      ? undefined
      : () => handleDeleteFilter();
  }, [activeFilter, filterName]);

  const onClick = useCallback(async () => {
    try {
      await handleApplyFilter(filterName);
    } catch (e) {
      console.error(e);
      showMessage(`Error applying filter. ${e}`, "error");
    }
  }, [handleApplyFilter]);

  async function handleDeleteFilter() {
    if (confirm("Are you sure you want to delete this filter?")) {
      try {
        await deletePricingGridFilter(filterName);
        await fetchFilters();
      } catch (e) {
        console.error(e); // todo: TOAST
      }
    }
  }

  return (
    <>
      <StyledDisplayFilterItem
        label={filterName}
        variant={activeFilter?.name !== filterName ? "outlined" : undefined}
        color={activeFilter?.name === filterName ? "primary" : undefined}
        onClick={onClick}
        onDelete={onDelete}
      />
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

export default DisplayFilterItem;
