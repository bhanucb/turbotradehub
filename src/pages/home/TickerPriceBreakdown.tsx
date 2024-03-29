import { FC, useEffect, useState } from "react";
import {
  getTickerData,
  TickerHistoryData,
  TickerInfo,
} from "../../api/TickerData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Paper, Stack } from "@mui/material";
import { camelCaseToTitleCase } from "../../utils/Misc";
import useMobile from "../../hooks/UseMobile";

const StyledChart = styled(Box)`
  padding: 16px;

  .last-price {
    font-weight: bold;
  }
  .negative-change {
    color: red;
  }

  .positive-change {
    color: green;
  }

  .tooltip {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;

    &.value {
      font-weight: bold;
    }
  }
`;

const TickerPriceBreakdown: FC = () => {
  const { isMobile, isTablet, isDesktop } = useMobile();
  const [tickerData, setTickerData] = useState<Omit<TickerInfo, "history">>(
    {} as TickerInfo
  );
  const [history, setHistory] = useState<TickerHistoryData[]>([]);
  const {
    symbol,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    name,
    lastPrice,
    change,
    changePercent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sector,
    ...otherTickerData
  } = tickerData;

  useEffect(() => {
    getTickerData("AMZUS")
      .then((data) => {
        const { history, ...otherFields } = data;
        setHistory(history);
        setTickerData(otherFields);
      })
      .catch((e) => console.error(e));
  }, []);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length > 0 && label) {
      return (
        <Paper className="tooltip">
          <Typography variant="caption">{label}</Typography>
          <Typography className="value">
            {payload[0].value?.toLocaleString() ?? 0}
          </Typography>
          {/*<p className="intro">{getIntroOfPage(label)}</p>*/}
          {/*<p className="desc">Anything you want can be displayed here.</p>*/}
        </Paper>
      );
    }

    return null;
  };

  return (
    <StyledChart>
      <Stack
        direction={{ xs: "row", sm: "row" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
        spacing={{ xs: 1, md: 4 }}
        alignItems="flex-end"
        useFlexGap
        flexWrap="wrap"
        mb={2}
      >
        <Typography variant="h5">{symbol}</Typography>
        <Typography variant="h4" className="last-price">
          {lastPrice}
        </Typography>
        <Typography
          variant="h6"
          className={change < 0 ? "negative-change" : "positive-change"}
        >
          {change > 0 && "+"}
          {change}
        </Typography>
        <Typography
          variant="h6"
          className={changePercent < 0 ? "negative-change" : "positive-change"}
        >
          ({changePercent > 0 && "+"}
          {changePercent}%)
        </Typography>
      </Stack>
      <Grid container>
        <Grid xs={12} lg={3}>
          <Stack minWidth={250}>
            {Object.entries(otherTickerData).map(([key, value], index) => {
              const formattedValue =
                typeof value === "number" ? value.toLocaleString() : value;
              return (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">
                    {camelCaseToTitleCase(key)}
                  </Typography>
                  <Typography variant="body1">{formattedValue}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Grid>
        <Grid xs={12} lg={9} mt={{ xs: 4, lg: 0 }}>
          <ResponsiveContainer width={"100%"} height={isMobile ? 200 : 400}>
            <LineChart
              data={history}
              margin={{ left: isMobile || isTablet || isDesktop ? -24 : 16 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="lastPrice"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Last Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </StyledChart>
  );
};

export default TickerPriceBreakdown;
