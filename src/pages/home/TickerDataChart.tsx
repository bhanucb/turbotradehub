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

  .stat-text {
    display: flex;
    align-items: flex-end;

    & .left-space {
      margin-left: 16px;
    }

    & .prices {
      justify-content: space-between;
      max-width: 400px;
    }

    & .last-price {
      padding-right: 8px;
    }

    & .change {
      display: flex;
      align-items: flex-end;
      margin-left: 16px;
      min-width: 120px;
      justify-content: space-between;
    }
  }

  .stat-grid {
    width: 80%;
  }
`;

const StatGrid: FC<{ tickerInfo: Omit<Partial<TickerInfo>, "history"> }> = ({
  tickerInfo,
}) => {
  const tickerData = Object.entries(tickerInfo);
  const leftColumns = tickerData.slice(0, tickerData.length / 2);
  const rightColumns = tickerData.slice(tickerData.length / 2);
  return (
    <Grid container spacing={2} className="stat-grid">
      <StatGridColumn tickerData={leftColumns} />
      <StatGridColumn tickerData={rightColumns} />
    </Grid>
  );
};
const StatGridColumn: FC<{ tickerData: Array<[string, number | string]> }> = ({
  tickerData,
}) => {
  return (
    <Grid xs={6}>
      <Stack>
        {tickerData.map(([field, value], index) => (
          <StatRow key={index} field={field} value={value} />
        ))}
      </Stack>
    </Grid>
  );
};
const StatRow: FC<{ field: string; value: number | string }> = ({
  field,
  value,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body1">{camelCaseToTitleCase(field)}:</Typography>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  );
};
const TickerDataChart: FC = () => {
  const [tickerData, setTickerData] = useState<Omit<TickerInfo, "history">>(
    {} as TickerInfo
  );
  const [history, setHistory] = useState<Array<TickerHistoryData>>([]);
  const { symbol, name, lastPrice, change, changePercent, ...otherTickerData } =
    tickerData;

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
        <Typography variant="h5">{symbol}</Typography>
        <Typography variant="h6" className="left-space">
          {name}
        </Typography>
      </Box>
      <Box className="stat-text prices">
        <Typography variant="h5">{lastPrice}</Typography>
        <Typography variant="h6" className="left-space">
          {change}
        </Typography>
        <Typography variant="h6" className="left-space">
          {changePercent}
        </Typography>
      </Box>
      <StatGrid tickerInfo={otherTickerData} />
      <LineChart
        width={800}
        height={400}
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
    </StyledChart>
  );
};

export default TickerDataChart;
