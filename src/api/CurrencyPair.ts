import * as faker from "faker";

export interface CurrencyPair {
  id: string;
  symbol: string;
  lastPrice: number;
  net: number;
  netChange: number;
}

export type DynamicCurrencyPair = CurrencyPair | { [key in string]: number };

const PAIR_COUNT = 100;

function generateFakeCurrencyPairData(): CurrencyPair {
  const id = faker.datatype.uuid();
  const symbol = faker.finance.currencyCode() + faker.finance.currencyCode();
  const lastPrice = parseFloat(faker.finance.amount(1, 2, 4));
  const net = parseFloat(faker.finance.amount(-0.5, 0.5, 4));
  const netChange = lastPrice + net;

  return {
    id,
    symbol,
    lastPrice,
    net,
    netChange,
  };
}

function generateFakeCurrencyPairDataSet(count: number): CurrencyPair[] {
  const dataSet: CurrencyPair[] = [];
  for (let i = 0; i < count; i++) {
    dataSet.push(generateFakeCurrencyPairData());
  }
  return dataSet;
}

export function getCurrencyPairs(): Promise<Array<CurrencyPair>> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(generateFakeCurrencyPairDataSet(PAIR_COUNT)), 550)
  );
}

export function getFxQuotes(): Promise<Array<DynamicCurrencyPair>> {
  const currencyPairs = generateFakeCurrencyPairDataSet(PAIR_COUNT);
  const symbols = currencyPairs
    .map((c) => c.symbol)
    .sort((a, b) => a.localeCompare(b));

  const getPairs = () =>
    symbols.reduce((prev, cur) => {
      const symbol = cur.toLowerCase();
      const next = { [symbol]: parseFloat(faker.finance.amount(1, 2, 4)) };
      return { ...prev, ...next };
    }, {} as { [key in string]: number });

  const newData = currencyPairs.reduce((prev, cur) => {
    const pairs = getPairs();
    const curAs = cur;
    const newPair = { ...curAs, ...pairs };
    return [...prev, newPair];
  }, [] as Array<DynamicCurrencyPair>);

  return new Promise((resolve) => setTimeout(() => resolve(newData), 555));
}
