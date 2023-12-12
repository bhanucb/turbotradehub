import { ComponentProps, Dispatch, SetStateAction, useState } from "react";
import AppGrid from "../../../components/AppGrid";
import {
  CellEditingStoppedEvent,
  ColDef,
  GetContextMenuItemsParams,
  MenuItemDef,
  ValueFormatterParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { renderMenuIcon } from "../../../utils/Grid";
import DeleteIcon from "@mui/icons-material/Delete";

type InRowEntryGrid<T> = ComponentProps<typeof AgGridReact> & {
  setRowData: Dispatch<SetStateAction<Array<T>>>;
  deleteRow: (row: T) => void;
  initialInputRow: T;
};
const InRowEntryGrid = function <T extends {}>(props: InRowEntryGrid<T>) {
  const { rowData, columnDefs, setRowData, deleteRow, initialInputRow } = props;
  const [inputRow, setInputRow] = useState<T>({ ...initialInputRow });

  function setTopRowPlaceholder(params: ValueFormatterParams) {
    const { colDef, value, node } = params;
    if (node?.rowPinned === "bottom" && (value === "" || value === null))
      return `${colDef.headerName}...`;

    const parentFormatter = props.defaultColDef?.valueFormatter;
    if (parentFormatter !== undefined) return parentFormatter;

    return value;
  }

  const defaultColDef: ColDef = {
    ...props.defaultColDef,
    valueFormatter: setTopRowPlaceholder,
  };

  function isPinnedRowDataCompleted(params: CellEditingStoppedEvent) {
    const { rowPinned } = params;
    if (rowPinned !== "bottom") return;
    return (columnDefs as Array<ColDef>)?.every(
      (def) => !!inputRow[def.field as keyof T]
    );
  }

  function handleCellEditingStopped(params: CellEditingStoppedEvent) {
    if (isPinnedRowDataCompleted(params)) {
      setRowData((prevState) => [...prevState, inputRow]);
      setInputRow(initialInputRow);
    }
    props.onCellEditingStopped?.(params);
  }

  function getContextMenuItems(
    params: GetContextMenuItemsParams
  ): Array<string | MenuItemDef> {
    return [
      {
        name: "Delete",
        icon: renderMenuIcon(DeleteIcon),
        action: () => {
          const { node } = params;
          if (node?.data === undefined) return;
          deleteRow(node.data);
        },
      },
      "copy",
      "copyWithHeaders",
      "separator",
      "export",
    ];
  }

  return (
    <AppGrid
      {...props}
      defaultColDef={defaultColDef}
      rowData={rowData}
      columnDefs={columnDefs}
      getRowStyle={(params) =>
        params.node.isRowPinned()
          ? { fontWeight: "bold", fontStyle: "italic", color: "lightgray" }
          : props.getRowStyle?.(params)
      }
      singleClickEdit={true}
      pinnedBottomRowData={[inputRow]}
      onCellEditingStopped={handleCellEditingStopped}
      getContextMenuItems={getContextMenuItems}
    />
  );
};

export default InRowEntryGrid;
