import { interval, map, Observable } from "rxjs";
import {
  CurrencyPair,
  currencyPairs,
  updateCurrencyPair,
} from "./CurrencyPair";
import faker from "faker";

export type DynamicCurrencyPair = CurrencyPair | { [key in string]: number };

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
  const newData = generateDynamicPairs(currencyPairs);
  return new Promise((resolve) => setTimeout(() => resolve(newData), 555));
}

function createDynamicPair(pair: CurrencyPair): DynamicCurrencyPair {
  const symbols = currencyPairs
    .map((c) => c.symbol)
    .sort((a, b) => a.localeCompare(b));

  const pairs = symbols.reduce((prev, cur) => {
    const symbol = cur.toLowerCase();
    const value = parseFloat(faker.finance.amount(1, 2, 4));
    const next = { [symbol]: value };
    return { ...prev, ...next };
  }, {} as { [key in string]: number });

  return {
    ...pair,
    ...pairs,
  };
}

const dataSet: Array<DynamicCurrencyPair> = currencyPairs.map((pair) =>
  createDynamicPair(pair)
);

export function getFxQuotesLive(): Observable<Array<DynamicCurrencyPair>> {
  return interval(1000).pipe(
    map(() => {
      return dataSet.map((dynamicPair) => {
        const updatedCurrencyPair: DynamicCurrencyPair = updateCurrencyPair(
          dynamicPair as CurrencyPair
        );

        const { id, symbol, net, netChange, lastPrice, ...pairs } =
          updatedCurrencyPair;

        const symbolKeys = Object.keys(pairs);
        const newPairs = symbolKeys.reduce((prev, symbol) => {
          const rand = Math.random();
          const value =
            rand < 0.8
              ? (pairs as { [key in string]: number })[symbol]
              : parseFloat(faker.finance.amount(1, 2, 4));
          const next = { [symbol]: value };
          return { ...prev, ...next };
        }, {} as { [key in string]: number });

        return {
          id,
          symbol,
          net,
          netChange,
          lastPrice,
          ...newPairs,
        };
      });
    })
  );
}
