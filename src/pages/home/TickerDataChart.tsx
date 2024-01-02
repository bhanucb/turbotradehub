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

const StyledChart = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .last-price {
    font-weight: bold;
  }
  .negative-change {
    color: red;
  }

  .positive-change {
    color: green;
  }

  .grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
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

const TickerDataChart: FC = () => {
  const [tickerData, setTickerData] = useState<Omit<TickerInfo, "history">>(
    {} as TickerInfo
  );
  const [history, setHistory] = useState<Array<TickerHistoryData>>([]);
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
    getTickerData("AMZUS").then((data) => {
      const { history, ...otherFields } = data;
      setHistory(history);
      setTickerData(otherFields);
    });
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
      <Box>
        <Stack direction="row" spacing={2} alignItems="flex-end" mb={2}>
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
            className={
              changePercent < 0 ? "negative-change" : "positive-change"
            }
          >
            ({changePercent > 0 && "+"}
            {changePercent}%)
          </Typography>
        </Stack>
        {/*<Stack direction="row" spacing={2} alignItems="flex-end">*/}
        {/*  <Typography variant="h6">{name}</Typography>*/}
        {/*  <Typography variant="h6">{camelCaseToTitleCase(sector)}</Typography>*/}
        {/*</Stack>*/}
      </Box>
      <Grid container spacing={2} className="stat-grid">
        <Grid xs={3}>
          <Stack>
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
        <Grid xs={9} className="grid">
          <LineChart
            width={800}
            height={350}
            data={history}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
            />
          </LineChart>
        </Grid>
      </Grid>
      {/*<StatGrid tickerInfo={otherTickerData} />*/}
    </StyledChart>
  );
};

export default TickerDataChart;
