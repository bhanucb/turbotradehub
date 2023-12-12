import { ValueFormatterParams } from "ag-grid-community";

export const numberFormatter = (props: ValueFormatterParams) => {
  let value = props.value;
  if (value === undefined || value === null) return value;

  switch (typeof props.value) {
    case "number":
      break;
    case "string":
      value = Number(props.value);
      break;
    case "object":
      const { value: insideValue } = props.value;
      if (insideValue === undefined || insideValue === null) {
        return props.value;
      }
      value = Number(props.value);
      break;
  }

  try {
    return value.toFixed(3)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } catch (e) {
    return value;
  }
};
