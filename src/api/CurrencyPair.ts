import * as faker from "faker";
import { interval, map, Observable } from "rxjs";

export interface CurrencyPair {
  id: string;
  symbol: string;
  lastPrice: number;
  net: number;
  netChange: number;
}

const PAIR_COUNT = 10;

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

export const currencyPairs = generateFakeCurrencyPairDataSet(PAIR_COUNT);

export const updateCurrencyPair = (pair: CurrencyPair): CurrencyPair => {
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
};

export function getCurrencyPairs(): Promise<Array<CurrencyPair>> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(currencyPairs), 550)
  );
}

export function getCurrencyPairLive(): Observable<Array<CurrencyPair>> {
  return interval(2000).pipe(
    map(() => {
      return currencyPairs.map((pair) => {
        return updateCurrencyPair(pair);
      });
    })
  );
}
