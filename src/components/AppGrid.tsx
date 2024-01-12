import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS
import { useAppSelector } from "../state/Store";

const GridContainer = styled(Box)`
  height: 100%;
  width: 100%;
`;

type AppGridProps = ComponentProps<typeof AgGridReact>;

const AppGrid = forwardRef(
  (props: AppGridProps, gridRef: ForwardedRef<AgGridReact>) => {
    const { currentTheme } = useAppSelector((state) => state.theme);

    return (
      <GridContainer
        className={
          currentTheme === "light" ? "ag-theme-balham" : "ag-theme-balham-dark"
        }
      >
        <AgGridReact ref={gridRef} {...props} />
      </GridContainer>
    );
  }
);
AppGrid.displayName = "AppGrid";

export default AppGrid;
