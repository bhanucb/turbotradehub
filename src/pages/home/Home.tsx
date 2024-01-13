import { FC } from "react";
import { Paper } from "@mui/material";
import { MD_NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";
import TickerPriceBreakdown from "./TickerPriceBreakdown";
import TickerPrices from "./TickerPrices";
import CurrencyPairMatrix from "./CurrencyPairMatrix";
import CurrencyPairs from "./CurrencyPairs";
import Box from "@mui/material/Box";

const Home: FC = () => {
  return (
    <Paper
      sx={{
        height: {
          xs: "100%",
          lg: `calc(100vh - ${MD_NAVIGATION_BAR_HEIGHT}px)`,
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          overflow: { xs: "initial", lg: "hidden" },
        }}
      >
        <Box sx={{ flex: 2 }}>
          <TickerPriceBreakdown />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TickerPrices />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          overflow: { xs: "initial", lg: "hidden" },
        }}
      >
        <Box sx={{ flex: 2 }}>
          <CurrencyPairMatrix />
        </Box>
        <Box sx={{ flex: 1 }}>
          <CurrencyPairs />
        </Box>
      </Box>
    </Paper>
  );
};

export default Home;
