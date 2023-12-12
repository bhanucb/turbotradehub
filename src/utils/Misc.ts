export const sleep = (milliseconds: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function removeSlashes(value: string) {
  return value.replace(/^\/|\/$/g, "");
}

export function hasPageReloaded() {
  const performanceNavigationTiming = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  return performanceNavigationTiming.type === "reload";
}
