import { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Heading,
  HeadingWithoutBackground,
  ItemNumberRow,
  ItemStack,
} from "../components/SummaryElements";
import useSummaryBoxData from "./UseSummaryBoxData";

const SummaryBox: FC = () => {
  const { position, pnl } = useSummaryBoxData();

  return (
    <Grid container direction="row">
      <Grid xs={4} p={1}>
        <Heading>Position</Heading>
        <ItemNumberRow value={position.total}></ItemNumberRow>
        <ItemStack title="Long" value={position.long} />
        <ItemStack title="Short" value={position.short} />
        <ItemStack title="Daily Chg" value={0} />
      </Grid>
      <Grid xs={4} p={1}>
        <Heading>P&L</Heading>
        <ItemNumberRow value={pnl.total} positiveInGreenColor />
        <ItemStack title="Real" value={pnl.real} />
        <ItemStack title="Unreal" value={pnl.unreal} positiveInGreenColor />
        <ItemStack title="Commission" value={0} />
      </Grid>
      <Grid xs={4} p={1}>
        <Heading>Risk</Heading>
        <ItemNumberRow value={-89868161} negativeInPrimaryColor />
      </Grid>
      <Grid xs={4} p={1}>
        <Heading>CR01</Heading>
        <ItemNumberRow value={-111456295} negativeInPrimaryColor />
        <HeadingWithoutBackground>Hedge Equiv Cash</HeadingWithoutBackground>
        <ItemStack title="2YR" value={-481087787} negativeInPrimaryColor />
        <ItemStack title="5YR" value={-202054902} negativeInPrimaryColor />
        <ItemStack title="10YR" value={-117055005} negativeInPrimaryColor />
        <ItemStack title="30YR" value={-56734950} negativeInPrimaryColor />
      </Grid>
      <Grid xs={4} p={1}>
        <Heading>Offering</Heading>
        <ItemStack title="Bloomberg" value={168} />
      </Grid>
    </Grid>
  );
};

export default SummaryBox;
