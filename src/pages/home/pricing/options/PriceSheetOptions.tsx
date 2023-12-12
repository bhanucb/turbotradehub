import { FC } from "react";
import DisplaySelector from "../priceSheet/DisplaySelector";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CreateFilter from "./filterOptions/CreateFilter";
import DisplayFilters from "./filterOptions/DisplayFilters";
import { useAppSelector } from "../../../../state/Store";

const StyledPricingSheetOptions = styled(Box)`
  .display-select {
    display: flex;
    flex-direction: column;
    width: 320px;
  }

  .filters {
    display: flex;
    flex-direction: column;
    padding-top: 8px;
    width: 320px;
  }
`;

const PriceSheetOptions: FC = () => {
  const { runningFilter, filters } = useAppSelector(
    (state) => state.pricingSheet
  );

  return (
    <StyledPricingSheetOptions m={2}>
      <Box className="display-select">
        <Typography variant="caption">Display</Typography>
        <DisplaySelector />
      </Box>
      {(runningFilter !== null || filters !== null) && (
        <Box className="filters">
          <Typography variant="caption">Filters</Typography>
          <CreateFilter />
          <DisplayFilters />
        </Box>
      )}
    </StyledPricingSheetOptions>
  );
};

export default PriceSheetOptions;
