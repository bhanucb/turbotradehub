import React, { FC, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../state/Store";
import { createPricingGridFilter } from "../../../../../api/PricingGridFilters";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { setActiveFilter } from "../../../../../state/PricingSheetSlice";
import useGridFilter from "../../UsePricingSheetFilter";
import AppSnackbar, {
  useSnackbar,
} from "../../../../../components/AppSnackbar";

const StyledCreateFilter = styled(Stack)`
  padding-bottom: 8px;

  .input {
    flex: 1;
  }
`;

const CreateFilter: FC = () => {
  const dispatch = useAppDispatch();
  const { fetchFilters } = useGridFilter();
  const [newFilterName, setNewFilterName] = useState<string>("");
  const { runningFilter } = useAppSelector((state) => state.pricingSheet);
  const isInputDisabled = useMemo(
    () => runningFilter === null,
    [runningFilter]
  );
  const isBtnDisabled = useMemo(
    () => runningFilter === null || newFilterName === "",
    [runningFilter, newFilterName]
  );
  const { open, message, duration, severity, showMessage, closeMessage } =
    useSnackbar();

  async function handleSaveNewFilter() {
    try {
      if (runningFilter !== null) {
        const newFilter = {
          ...runningFilter,
          lastUsed: dayjs().toISOString(),
        };
        await createPricingGridFilter(newFilterName, newFilter);
        await fetchFilters();
        dispatch(setActiveFilter({ name: newFilterName, filter: newFilter }));
        setNewFilterName("");
      }
    } catch (e) {
      console.error(e);
      showMessage(`Error persisting filter. ${e}`, "error");
    }
  }

  function handleChangeText(event: React.ChangeEvent<HTMLInputElement>) {
    setNewFilterName(event.target.value);
  }

  return (
    <StyledCreateFilter direction="row">
      <TextField
        label={isInputDisabled ? "Change Filter in Grid" : "Create New Filter"}
        variant="filled"
        size="small"
        className="input"
        value={newFilterName}
        disabled={isInputDisabled}
        onChange={handleChangeText}
      />
      <Button
        size="small"
        disabled={isBtnDisabled}
        onClick={handleSaveNewFilter}
      >
        Save
      </Button>
      <AppSnackbar
        open={open}
        message={message}
        duration={duration}
        severity={severity}
        onClose={closeMessage}
      />
    </StyledCreateFilter>
  );
};

export default CreateFilter;
