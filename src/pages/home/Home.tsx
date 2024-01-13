import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import {
  MD_NAVIGATION_BAR_HEIGHT,
  XS_NAVIGATION_BAR_HEIGHT,
} from "../../navigation/Constants";
import Grid from "@mui/material/Unstable_Grid2";
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
          xs: `calc(100vh - ${XS_NAVIGATION_BAR_HEIGHT}px)`,
          md: `calc(100vh - ${MD_NAVIGATION_BAR_HEIGHT}px)`,
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, overflow: { xs: "initial", md: "hidden" } }}>
        <TickerPriceBreakdown />
      </Box>
      <Box sx={{ flex: 1, bgcolor: "blue", overflow: "hidden" }}>
        {/*<Grid container>*/}
        {/*  <Grid xs={12} md={6}>*/}
        {/*<CurrencyPairMatrix />*/}
        {/*  </Grid>*/}
        {/*  <Grid xs={12} md={6}>*/}
        {/*    4*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </Box>
    </Paper>
  );
};

export default Home;
