import * as faker from "faker";
import { interval, map, Observable } from "rxjs";

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

const dataSet = generateFakeCurrencyPairDataSet(PAIR_COUNT);

export function getCurrencyPairs(): Promise<Array<CurrencyPair>> {
  return new Promise((resolve) => setTimeout(() => resolve(dataSet), 550));
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
    const newPair = { ...cur, ...pairs };
    return [...prev, newPair];
  }, [] as Array<DynamicCurrencyPair>);

  return new Promise((resolve) => setTimeout(() => resolve(newData), 555));
}

export function getCurrencyPairLive(): Observable<Array<CurrencyPair>> {
  return interval(5000).pipe(
    map(() => {
      return dataSet.map((pair) => {
        let lastPrice = pair.lastPrice;
        let net = pair.net;

        if (Math.random() < 0.1) {
          lastPrice = parseFloat(faker.finance.amount(1, 2, 4));
        } else if (Math.random() < 0.2) {
          net = parseFloat(faker.finance.amount(-0.5, 0.5, 4));
        }
        const netChange = lastPrice + net;

        return {
          ...pair,
          lastPrice,
          net,
          netChange,
        };
      });
    })
  );
}
