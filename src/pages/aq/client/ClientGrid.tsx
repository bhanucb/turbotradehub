import { FC, useState } from "react";
import { ColDef, FirstDataRenderedEvent } from "ag-grid-community";
import AppGrid from "../../../components/AppGrid";
import { resizeColumns } from "../../../utils/Grid";
import initialData from "./clientData.json";

type ClientGrid = {
  type: string;
  counterparty: string;
  tier: string;
};

const ClientGrid: FC = () => {
  const [rowData] = useState<Array<ClientGrid>>(initialData);

  const [colDefs] = useState<Array<ColDef>>([
    { field: "type", headerName: "Type" },
    {
      field: "counterparty",
      headerName: "Normalized Counterparty Name",
    },
    {
      field: "tier",
      headerName: "Tier",
    },
  ]);

  function handleFirstDataRendered(e: FirstDataRenderedEvent) {
    resizeColumns(e.columnApi);
  }

  return (
    <AppGrid
      columnHoverHighlight={true}
      rowData={rowData}
      columnDefs={colDefs}
      singleClickEdit={true}
      onFirstDataRendered={handleFirstDataRendered}
    />
  );
};

export default ClientGrid;
