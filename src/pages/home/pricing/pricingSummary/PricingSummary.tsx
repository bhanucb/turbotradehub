import { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Heading,
  HeadingWithoutBackground,
  ItemNumberRow,
  ItemStack,
} from "../../components/SummaryElements";

type PricingSummaryProps = {};

const PricingSummary: FC<PricingSummaryProps> = () => {
  return (
    <Grid container spacing={2} flexDirection="row" margin={1}>
      <Grid xs={12}>
        <Heading>Position</Heading>
        <ItemNumberRow value={2852723840}></ItemNumberRow>
        <ItemStack title="Long" value={15382232891} />
        <ItemStack title="Short" value={12529509051} />
        <ItemStack title="Daily Chg" value={0} />
      </Grid>
      <Grid xs={12}>
        <Heading>P&L</Heading>
        <ItemNumberRow value={149602904} positiveInGreenColor />

        <ItemStack title="Real" value={0} />
        <ItemStack title="Unreal" value={149602904} positiveInGreenColor />
        <ItemStack title="Commission" value={0} />
      </Grid>
      <Grid xs={12}>
        <Heading>Risk</Heading>
        <ItemNumberRow value={-89868161} negativeInPrimaryColor />

        <Heading>CR01</Heading>
        <ItemNumberRow value={-111456295} negativeInPrimaryColor />

        <HeadingWithoutBackground>Hedge Equiv Cash</HeadingWithoutBackground>
        <ItemStack title="2YR" value={-481087787} negativeInPrimaryColor />
        <ItemStack title="5YR" value={-202054902} negativeInPrimaryColor />
        <ItemStack title="10YR" value={-117055005} negativeInPrimaryColor />
        <ItemStack title="30YR" value={-56734950} negativeInPrimaryColor />
      </Grid>
      <Grid xs={12}>
        <Heading>Offering</Heading>
        <ItemStack title="Bloomberg" value={168} />
      </Grid>
    </Grid>
  );
};

export default PricingSummary;
