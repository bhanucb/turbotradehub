import { FC } from "react";
import {
  FormControl,
  FormControlProps,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../state/Store";
import { changeSelection } from "../../../../state/PricingSheetSlice";

export type DisplaySelectionKeys = "pricingSheet" | "pcMain";

export type SelectModel = {
  key: DisplaySelectionKeys;
  value: string;
};

export const displaySelections: Array<SelectModel> = [
  { key: "pricingSheet", value: "Pricing Sheet" },
  { key: "pcMain", value: "PC-Main" },
];

type DisplaySelectorProps = FormControlProps | undefined;

const DisplaySelector: FC<DisplaySelectorProps> = (props) => {
  const { display } = useAppSelector((state) => state.pricingSheet);
  const dispatch = useAppDispatch();

  function handleSelectionChange(event: SelectChangeEvent) {
    const {
      target: { value },
    } = event;
    dispatch(changeSelection(value as DisplaySelectionKeys));
  }

  return (
    <FormControl size="small" {...props}>
      <Select value={display} displayEmpty onChange={handleSelectionChange}>
        {displaySelections.map((item) => {
          return (
            <MenuItem key={item.key} value={item.key}>
              {item.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DisplaySelector;
