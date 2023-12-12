import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { GetRowIdParams } from "ag-grid-community";
import AppGrid from "../../../components/AppGrid";

export type TreeViewPath = {
  id: number | string;
  path: Array<string>;
};

const defaultColDef = {
  flex: 1,
  filter: true,
  sortable: true,
  resizable: true,
};

const autoGroupColumnDef = {
  headerName: "Files",
  minWidth: 330,
  cellRendererParams: {
    checkbox: true,
    suppressCount: true,
  },
};

const getDataPath = (data: any) => {
  return data.path;
};

const getRowId = (params: GetRowIdParams) => {
  return params.data.id;
};

export type TreeViewProps = ComponentProps<typeof AgGridReact>;

const TreeView = forwardRef(
  (props: TreeViewProps, gridRef: ForwardedRef<AgGridReact>) => {
    return (
      <AppGrid
        ref={gridRef}
        columnDefs={[]}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        treeData={true}
        animateRows={true}
        groupDefaultExpanded={-1}
        getDataPath={getDataPath}
        getRowId={getRowId}
        headerHeight={0}
        {...props}
      />
    );
  }
);

export default TreeView;
