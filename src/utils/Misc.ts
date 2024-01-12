export function camelCaseToTitleCase(str: string) {
  if (str === null || str === undefined) return str;
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}
