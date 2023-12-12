import { FC, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import DisplayFilterItem from "./DisplayFilterItem";
import { useAppSelector } from "../../../../../state/Store";

const StyledDisplayFilters = styled(Box)`
  .static-group {
    display: flex;
    align-items: center;

    .static-group-chips {
      flex: 1;
    }

    .dynamic-group {
      display: flex;
      height: 200px;
      flex-flow: wrap;
      flex: 1;
    }
  }
`;

const DisplayFilters: FC = () => {
  const { filters } = useAppSelector((state) => state.pricingSheet);
  const filterNames = useMemo(
    () => (filters === null ? [] : Object.keys(filters)),
    [filters]
  );
  const [showFilters, setShowFilters] = useState(false);

  return (
    <StyledDisplayFilters>
      <Box className="static-group">
        <Box className="static-group-chips">
          {filterNames.slice(0, 3).map((filterName, index) => (
            <DisplayFilterItem key={index} filterName={filterName} />
          ))}
        </Box>
        {filterNames.length > 3 && (
          <Box onClick={() => setShowFilters((prevState) => !prevState)}>
            <IconButton size="small">
              {showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        )}
      </Box>
      {showFilters && (
        <Box className="dynamic-group">
          {filterNames.slice(3).map((filterName, index) => (
            <DisplayFilterItem key={index} filterName={filterName} />
          ))}
        </Box>
      )}
    </StyledDisplayFilters>
  );
};

export default DisplayFilters;
