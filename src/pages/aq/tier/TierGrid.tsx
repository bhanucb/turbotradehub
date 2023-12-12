import { FC, useState } from "react";
import { ColDef, FirstDataRenderedEvent } from "ag-grid-community";
import { resizeColumns } from "../../../utils/Grid";
import InRowEntryGrid from "../discount/InRowEntryGrid";

type TierGrid = {
  minDv01: number | null;
  diamond: string | null;
  platinum: string | null;
  gold: string | null;
  silver: string | null;
};

const TierGrid: FC = () => {
  const [rowData, setRowData] = useState<Array<TierGrid>>([
    {
      minDv01: 0,
      diamond: "Aggressive",
      platinum: "Aggressive",
      gold: "Mid",
      silver: "Screws",
    },
    {
      minDv01: 1250,
      diamond: "Aggressive",
      platinum: "Mid",
      gold: "Inside",
      silver: "Screws",
    },
    {
      minDv01: 2500,
      diamond: "Mid",
      platinum: "Mid",
      gold: "Inside",
      silver: "Screws",
    },
    {
      minDv01: 3500,
      diamond: "Mid",
      platinum: "Inside",
      gold: "Screws",
      silver: "Screws",
    },
    {
      minDv01: 5000,
      diamond: "Manual",
      platinum: "Manual",
      gold: "Manual",
      silver: "Manual",
    },
  ]);

  const [colDefs] = useState<Array<ColDef>>([
    { field: "minDv01", headerName: "Min DV01", minWidth: 100, editable: true },
    { field: "diamond", headerName: "Diamond", editable: true },
    { field: "platinum", headerName: "Platinum", editable: true },
    { field: "gold", headerName: "Gold", editable: true },
    { field: "silver", headerName: "Silver", editable: true },
    {
      field: "",
      headerName: "+",
      suppressMenu: true,
    },
  ]);

  function handleFirstDataRendered(e: FirstDataRenderedEvent) {
    resizeColumns(e.columnApi);
  }

  function handleDeleteRow(row: TierGrid) {
    setRowData((prevState) =>
      prevState.filter(
        (r) =>
          row.minDv01 !== r.minDv01 &&
          row.diamond !== r.diamond &&
          row.platinum !== r.platinum &&
          row.gold !== r.gold &&
          row.silver !== r.silver
      )
    );
  }

  return (
    <InRowEntryGrid<TierGrid>
      rowData={rowData}
      columnDefs={colDefs}
      setRowData={setRowData}
      initialInputRow={{
        minDv01: null,
        diamond: null,
        platinum: null,
        gold: null,
        silver: null,
      }}
      deleteRow={handleDeleteRow}
      onFirstDataRendered={handleFirstDataRendered}
    />
  );
};

export default TierGrid;
