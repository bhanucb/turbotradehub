import { Column, ColumnApi, IDateFilterParams } from "ag-grid-community";
import { SvgIconComponent } from "@mui/icons-material";
import ReactDOMServer from "react-dom/server";
import dayjs from "dayjs";

export function resizeColumns(columnApi: ColumnApi) {
  if (columnApi === undefined) return;

  const skipHeader = true;
  const allColumnIds: string[] = [];
  columnApi.getAllGridColumns().forEach((column: Column) => {
    allColumnIds.push(column.getId());
  });
  setTimeout(() => {
    columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, 100);
}

export function renderMenuIcon(Icon: SvgIconComponent): string {
  return ReactDOMServer.renderToStaticMarkup(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon style={{ fontSize: "16px" }} />
    </div>
  );
}

export const filterDateParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    const dateInFilter = dayjs(filterLocalDateAtMidnight);
    const dateInCell = dayjs(cellValue, "YYYY-MM-DD");

    if (cellValue === null) return -1;

    if (dateInFilter.isSame(dateInCell, "second")) {
      return 0;
    }

    if (dateInCell.isBefore(dateInFilter, "day")) return -1;
    if (dateInCell.isAfter(dateInFilter, "day")) return 1;
    return 0;
  },
};
