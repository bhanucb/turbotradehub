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

const calculateNetChange = (price: number, bid: number, ask: number) => {
  const net = price - bid;
  const netChange = ask - bid;
  const netChangePercentage = netChange / 100;

  return { net, netChange, netChangePercentage };
};

const generateFakeStockDataPoints = () => {
  const price = parseFloat(faker.finance.amount(50, 3000, 2));
  const bid = parseFloat(faker.finance.amount(50, price, 2));
  const ask = parseFloat(faker.finance.amount(price, 3000, 2));

  const { net, netChange, netChangePercentage } = calculateNetChange(
    price,
    bid,
    ask
  );

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
    map(() => {
      return dataset.map((stockData) => {
        let price = stockData.price;
        let bid = stockData.bid;
        let ask = stockData.ask;

        if (Math.random() < 0.1) {
          price = parseFloat(faker.finance.amount(50, 3000, 2));
        } else if (Math.random() < 0.2) {
          bid = parseFloat(faker.finance.amount(50, price, 2));
        } else if (Math.random() < 0.3) {
          ask = parseFloat(faker.finance.amount(price, 3000, 2));
        }

        const { net, netChange, netChangePercentage } = calculateNetChange(
          price,
          bid,
          ask
        );

        return {
          ...stockData,
          price,
          bid,
          ask,
          net,
          netChange,
          netChangePercentage,
        };
      });
    })
  );
}
