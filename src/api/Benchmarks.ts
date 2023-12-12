import { mockBenchmarks } from "../mocks/Benchmarks";
import { sleep } from "../utils/Misc";

export async function searchBenchmarks(query: string): Promise<string[]> {
  //replicating real http delayed responce
  await sleep(500);
  return Promise.resolve(
    mockBenchmarks.filter((item) => item.toLocaleLowerCase().includes(query))
  );
}
