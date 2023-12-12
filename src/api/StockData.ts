import * as faker from "faker";

export interface StockData {
  id: string;
  symbol: string;
  price: number;
  bid: number;
  ask: number;
}

function generateFakeStockData(): StockData {
  return {
    id: faker.datatype.uuid(),
    symbol: faker.random.word().toUpperCase(),
    price: parseFloat(faker.finance.amount(50, 3000, 2)),
    bid: parseFloat(faker.finance.amount(50, 3000, 2)),
    ask: parseFloat(faker.finance.amount(50, 3000, 2)),
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
