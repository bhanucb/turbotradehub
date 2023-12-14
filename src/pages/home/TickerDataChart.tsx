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
  XAxis,
  YAxis,
} from "recharts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/material";
import { camelCaseToTitleCase } from "../../utils/Misc";

const StyledChart = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TickerDataChart: FC = () => {
  const [tickerData, setTickerData] = useState<Omit<TickerInfo, "history">>(
    {} as TickerInfo
  );
  const [history, setHistory] = useState<Array<TickerHistoryData>>([]);
  const {
    symbol,
    name,
    lastPrice,
    change,
    changePercent,
    sector,
    ...otherTickerData
  } = tickerData;

  useEffect(() => {
    getTickerData("AMZUS").then((data) => {
      const { history, ...otherFields } = data;
      const historyData = history;
      setHistory(historyData);
      setTickerData(otherFields);
    });
  }, []);

  return (
    <StyledChart>
      <Box className="stat-text">
        <Stack direction="row" spacing={2} alignItems="flex-end">
          <Typography variant="h5">{symbol}</Typography>
          <Typography variant="h4">{lastPrice}</Typography>
          <Typography variant="h6">{change}</Typography>
          <Typography variant="h6">({changePercent}%)</Typography>
        </Stack>
        {/*<Stack direction="row" spacing={2} alignItems="flex-end">*/}
        {/*  <Typography variant="h6">{name}</Typography>*/}
        {/*  <Typography variant="h6">{camelCaseToTitleCase(sector)}</Typography>*/}
        {/*</Stack>*/}
      </Box>
      <Box className="stat-text prices"></Box>
      <Grid container spacing={2} className="stat-grid">
        <Grid xs={4}>
          <Stack>
            {Object.entries(otherTickerData).map(([key, value], index) => {
              return (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">
                    {camelCaseToTitleCase(key)}
                  </Typography>
                  <Typography variant="body1">{value}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Grid>
        <Grid xs={8}>
          <LineChart
            width={800}
            height={350}
            data={history}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
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
