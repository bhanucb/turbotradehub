import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import { NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";
import PriceChangesGrid from "./PriceChangesGrid";
import TickerDataChart from "./TickerDataChart";
import FxQuoteMatrix from "./FxQuoteMatrix";
import TopMoversGrid from "./TopMoversGrid";

const Page = styled(Paper)`
  height: calc(100vh - (${NAVIGATION_BAR_HEIGHT}px));
  border-radius: 0;
  display: flex;
  flex-direction: column;

  .row {
    display: flex;
    height: 50%;

    &.top {
      margin-top: 16px;
      margin-bottom: 8px;
    }

    &.bottom {
      margin-bottom: 16px;
      margin-top: 8px;
    }
  }

  .column {
    overflow: auto;

    &.left {
      width: 70%;
      margin-left: 16px;
      margin-right: 8px;
    }

    &.right {
      width: 30%;
      margin-right: 16px;
      margin-left: 8px;
    }
  }
`;

const Home: FC = () => {
  return (
    <Page>
      <Box className="row top">
        <Box className="column left">
          <TickerDataChart />
        </Box>
        <Box className="column right">
          <PriceChangesGrid />
        </Box>
      </Box>
      <Box className="row bottom">
        <Box className="column left">
          <FxQuoteMatrix />
        </Box>
        <Box className="column right">
          <TopMoversGrid />
        </Box>
      </Box>
    </Page>
  );
};

export default Home;
