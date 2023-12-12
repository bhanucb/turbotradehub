import { FC } from "react";
import PriceChangesGrid from "./PriceChangesGrid";
import TopMoversGrid from "./TopMoversGrid";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";
import Grid from "@mui/material/Unstable_Grid2";
import FxQuoteMatrix from "./FxQuoteMatrix";
import TickerDataChart from "./TickerDataChart";

const Page = styled(Paper)`
  height: calc(100vh - (${NAVIGATION_BAR_HEIGHT}px));
  border-radius: 0;
`;
const Home: FC = () => {
  return (
    <Page>
      <Grid container style={{ height: "100%" }}>
        <Grid xs={4} p={1}>
          <PriceChangesGrid />
        </Grid>
        <Grid xs={8} p={1}>
          <TickerDataChart />
        </Grid>
        <Grid xs={8} p={1}>
          <FxQuoteMatrix />
        </Grid>
        <Grid xs={4} p={1}>
          <TopMoversGrid />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
