import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
import { useAppSelector } from "../state/Store";

LicenseManager.setLicenseKey(
  "CompanyName=Softchoice LP (Toronto)_on_behalf_of_CIBC,LicensedApplication=Interactive Pricing Alpha,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=3,LicensedProductionInstancesCount=0,AssetReference=AG-033005,SupportServicesEnd=19_September_2023_[v2]_MTY5NTA3ODAwMDAwMA==b32bf02d93d87b4469acc80a376bb57a"
);

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

export default AppGrid;
