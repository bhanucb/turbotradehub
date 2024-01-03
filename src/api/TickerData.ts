import * as faker from "faker";

const NUMBER_OF_DAYS_IN_HISTORY = 30;

export interface TickerInfo {
  symbol: string;
  name: string;
  sector: string;
  bid: number;
  ask: number;
  open: number;
  lastPrice: number;
  change: number;
  changePercent: number;
  previousClose: number;
  daysRange: string;
  week52Range: string;
  avgVolume: number;
  netAssets: number;
  nav: number;
  peRatio: number;
  yield: number;
  ytdDailyTotalReturn: number;
  beta: number;
  expenseRatio: number;
  inceptionDate: string;
  history: Array<TickerHistoryData>;
}

export interface TickerHistoryData {
  date: string;
  lastPrice: number;
  volume: number;
}

function generateFakeTickerInfo(
  symbol: string,
  history: Array<TickerHistoryData>
): TickerInfo {
  return {
    symbol,
    name: faker.company.companyName(),
    sector: faker.company.bsNoun(),
    bid: parseFloat(faker.finance.amount(100, 200, 2)),
    ask: parseFloat(faker.finance.amount(200, 300, 2)),
    open: parseFloat(faker.finance.amount(150, 250, 2)),
    lastPrice: parseFloat(faker.finance.amount(150, 250, 2)),
    change: parseFloat(faker.finance.amount(-10, 10, 2)),
    changePercent: parseFloat(faker.finance.amount(-1, 1, 2)),
    previousClose: parseFloat(faker.finance.amount(120, 180, 2)),
    daysRange: `${faker.finance.amount(140, 160, 2)} - ${faker.finance.amount(
      170,
      190,
      2
    )}`,
    week52Range: `${faker.finance.amount(100, 120, 2)} - ${faker.finance.amount(
      220,
      240,
      2
    )}`,
    avgVolume: faker.datatype.number({ min: 100000, max: 500000 }),
    netAssets: parseFloat(faker.finance.amount(1000000, 5000000, 2)),
    nav: parseFloat(faker.finance.amount(100, 200, 2)),
    peRatio: parseFloat(faker.finance.amount(10, 20, 2)),
    yield: parseFloat(faker.finance.amount(1, 2, 2)),
    ytdDailyTotalReturn: parseFloat(faker.finance.amount(0.5, 1.5, 2)),
    beta: parseFloat(faker.finance.amount(0.8, 1.2, 2)),
    expenseRatio: parseFloat(faker.finance.amount(0.1, 0.5, 2)),
    inceptionDate: faker.date.past().toISOString().split("T")[0], // Format date as YYYY-MM-DD
    history,
  };
}

function generateFakeTickerHistoryData(date: string): TickerHistoryData {
  const lastPrice = parseFloat(faker.finance.amount(50, 300, 2));
  const volume = faker.datatype.number({ min: 100000, max: 1000000 });

  return {
    date,
    lastPrice,
    volume,
  };
}

function generateFakeTickerHistoryDataSet(symbol: string): TickerInfo {
  const currentDate = new Date();
  const dataSet: TickerHistoryData[] = [];
  for (let i = NUMBER_OF_DAYS_IN_HISTORY; i >= 1; i--) {
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - i);
    const date = pastDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    dataSet.push(generateFakeTickerHistoryData(date));
  }

  return generateFakeTickerInfo(symbol, dataSet);
}

export function getTickerData(ticker: string): Promise<TickerInfo> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(generateFakeTickerHistoryDataSet(ticker));
    }, 666)
  );
}
