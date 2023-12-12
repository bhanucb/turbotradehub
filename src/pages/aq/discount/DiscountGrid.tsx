import { FC, useState } from "react";
import {
  ColDef,
  INumberCellEditorParams,
  ValueFormatterParams,
} from "ag-grid-community";
import InRowEntryGrid from "./InRowEntryGrid";

export type DiscountRow = {
  strategy: string | null;
  bosDiscount: number | null;
};

const DiscountGrid: FC = () => {
  const [rowData, setRowData] = useState<Array<DiscountRow>>([
    { strategy: "Aggressive", bosDiscount: 75 },
    { strategy: "Mid", bosDiscount: 50 },
    { strategy: "Inside", bosDiscount: 25 },
    { strategy: "Screws", bosDiscount: 0 },
  ]);
  const [colDefs] = useState<Array<ColDef>>([
    { field: "strategy", headerName: "Strategy", editable: true },
    {
      field: "bosDiscount",
      headerName: "BOS Discount",
      editable: true,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        precision: 0,
      } as INumberCellEditorParams,
      valueFormatter: (params) => {
        const { data, node } = params;
        if (node?.isRowPinned()) return setTopRowPlaceholder(params);
        return data.bosDiscount === undefined || data.bosDiscount === null
          ? ""
          : `${data.bosDiscount} %`;
      },
      valueParser: (params) => {
        const { oldValue, newValue } = params;
        return Number(newValue) < 0 || Number(newValue) > 100
          ? oldValue
          : newValue;
      },
    },
  ]);

  function setTopRowPlaceholder(params: ValueFormatterParams) {
    const { colDef, value, node } = params;
    if (node?.rowPinned === "bottom" && (value === "" || value === null))
      return `${colDef.headerName}...`;
    return value;
  }

  function handleDeleteRow(row: DiscountRow) {
    setRowData((prevState) =>
      prevState.filter(
        (r) => row.strategy !== r.strategy && row.bosDiscount !== r.bosDiscount
      )
    );
  }

  return (
    <InRowEntryGrid<DiscountRow>
      rowData={rowData}
      columnDefs={colDefs}
      setRowData={setRowData}
      deleteRow={handleDeleteRow}
      initialInputRow={{ strategy: null, bosDiscount: null }}
    />
  );
};

export default DiscountGrid;
