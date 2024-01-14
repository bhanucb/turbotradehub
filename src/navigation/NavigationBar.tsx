import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeSection } from "./ThemeSection";
import {useTheme} from "@mui/material";

function NavigationBar() {
  const {palette: {mode}} = useTheme();
  return (
    <AppBar position="static" sx={{bgcolor: mode === "light" ? "#283593" : "primary"}}>
      <Toolbar>
        <Typography variant="h6" flexGrow={1}>
          Turbo Trade Hub
        </Typography>

        <ThemeSection />
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
