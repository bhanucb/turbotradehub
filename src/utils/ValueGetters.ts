import { ValueGetterParams } from "ag-grid-community";

export const rowIndexValueGetter = (params: ValueGetterParams) => {
  return params.node ? params.node.rowIndex : null;
};
