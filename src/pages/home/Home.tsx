import { FC } from "react";
import PriceChangesGrid from "./PriceChangesGrid";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { NAVIGATION_BAR_HEIGHT } from "../../navigation/Constants";

const Page = styled(Paper)`
  height: calc(100vh - ${NAVIGATION_BAR_HEIGHT}px);
`;
const Home: FC = () => {
  return (
    <Page>
      <PriceChangesGrid />
    </Page>
  );
};

export default Home;
