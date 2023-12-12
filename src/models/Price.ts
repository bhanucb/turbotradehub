import { RawMessage } from "./RawMessage";

export type Price = Pick<
  RawMessage,
  | "cusip"
  | "isin"
  | "bbgId59"
  | "maturity"
  | "traderName"
  | "bidSpreadToBenchmark"
  | "cibcOfficialBidPrice"
  | "cibcOfficialAskPrice"
  | "cibcOfficialBidYield"
  | "benchmarkSecurity"
>;
