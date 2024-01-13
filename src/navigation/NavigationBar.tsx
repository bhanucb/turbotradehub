import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeSection } from "./ThemeSection";

function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Turbo Trade Hub
        </Typography>

        <ThemeSection />
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
