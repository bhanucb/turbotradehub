import * as faker from "faker";
import { interval, map } from "rxjs";

const ROW_COUNT = 10;

export interface StockData {
  id: string;
  symbol: string;
  price: number;
  bid: number;
  ask: number;
  net: number;
  netChange: number;
  netChangePercentage: number;
}

const generateFakeStockDataPoints = () => {
  const price = parseFloat(faker.finance.amount(50, 3000, 2));
  const bid = parseFloat(faker.finance.amount(50, price, 2));
  const ask = parseFloat(faker.finance.amount(price, 3000, 2));

  const net = price - bid;
  const netChange = ask - bid;
  const netChangePercentage = netChange / 100;

  return { price, bid, ask, net, netChange, netChangePercentage };
};

function generateFakeStockData(): StockData {
  const { price, bid, ask, net, netChange, netChangePercentage } =
    generateFakeStockDataPoints();

  return {
    id: faker.datatype.uuid(),
    symbol: faker.random.word().toUpperCase(),
    price,
    bid,
    ask,
    net,
    netChange,
    netChangePercentage,
  };
}

function generateFakeStockDataSet(): StockData[] {
  const dataSet: StockData[] = [];
  for (let i = 0; i < ROW_COUNT; i++) {
    dataSet.push(generateFakeStockData());
  }
  return dataSet;
}

const dataset = generateFakeStockDataSet();

export function getStockDataLive() {
  return interval(1000).pipe(
    map(() =>
      dataset.map((stockData) => {
        const { price, bid, ask, net, netChange, netChangePercentage } =
          generateFakeStockDataPoints();

        return {
          ...stockData,
          price,
          bid,
          ask,
          net,
          netChange,
          netChangePercentage,
        };
      })
    )
  );
}
