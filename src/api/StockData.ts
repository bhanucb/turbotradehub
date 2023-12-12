import * as faker from "faker";

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

function generateFakeStockData(): StockData {
  const id = faker.datatype.uuid();
  const price = parseFloat(faker.finance.amount(50, 3000, 2));
  const bid = parseFloat(faker.finance.amount(50, price, 2));
  const ask = parseFloat(faker.finance.amount(price, 3000, 2));

  const net = price - bid;
  const netChange = ask - bid;
  const netChangePercentage = netChange / 100;

  return {
    id,
    symbol: faker.random.word().toUpperCase(),
    price,
    bid,
    ask,
    net,
    netChange,
    netChangePercentage,
  };
}

function generateFakeStockDataSet(count: number): StockData[] {
  const dataSet: StockData[] = [];
  for (let i = 0; i < count; i++) {
    dataSet.push(generateFakeStockData());
  }
  return dataSet;
}

export function getStockData(): Promise<Array<StockData>> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(generateFakeStockDataSet(10)), 550)
  );
}
