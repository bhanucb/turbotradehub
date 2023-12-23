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

const PAIR_COUNT = 1;

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

export function getCurrencyPairLive(): Observable<Array<CurrencyPair>> {
  return interval(1000).pipe(
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

const getPairs = (symbols: Array<string>) =>
  symbols.reduce((prev, cur) => {
    const symbol = cur.toLowerCase();
    const value = parseFloat(faker.finance.amount(1, 2, 4));
    const next = { [symbol]: value };
    return { ...prev, ...next };
  }, {} as { [key in string]: number });

function generateDynamicPairs(
  currencyPairs: Array<CurrencyPair>
): Array<DynamicCurrencyPair> {
  const symbols = currencyPairs
    .map((c) => c.symbol)
    .sort((a, b) => a.localeCompare(b));

  return currencyPairs.reduce((prev, cur) => {
    const pairs = getPairs(symbols);
    const newPair = { ...cur, ...pairs };
    return [...prev, newPair];
  }, [] as Array<DynamicCurrencyPair>);
}

export function getFxQuotes(): Promise<Array<DynamicCurrencyPair>> {
  const newData = generateDynamicPairs(dataSet);
  return new Promise((resolve) => setTimeout(() => resolve(newData), 555));
}

export function getFxQuotesLive() {
  return getCurrencyPairLive().pipe(
    map((pairs) => {
      return generateDynamicPairs(pairs);
    })
  );
}
