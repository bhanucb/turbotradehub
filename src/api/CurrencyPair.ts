import * as faker from "faker";

export interface CurrencyPair {
  id: string;
  symbol: string;
  lastPrice: number;
  net: number;
  netChange: number;
}

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
    setTimeout(() => resolve(generateFakeCurrencyPairDataSet(50)), 550)
  );
}
