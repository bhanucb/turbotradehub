import { FC } from "react";
import { RightDrawerItem } from "./RightDrawerItem";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import Typography from "@mui/material/Typography";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import { switchTheme, ThemeButtonState } from "../../state/ThemeSlice";

export const ThemeSection: FC = () => {
  const { themeButtonState } = useAppSelector((state) => state.theme);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const dispatch = useAppDispatch();

  const handleModeSelection = (mode: ThemeButtonState) => () => {
    switch (mode) {
      case "light":
        dispatch(switchTheme({ mode: "light", buttonState: "light" }));
        break;
      case "dark":
        dispatch(switchTheme({ mode: "dark", buttonState: "dark" }));
        break;
      case "auto":
        dispatch(
          switchTheme({
            mode: prefersDark.matches ? "dark" : "light",
            buttonState: "auto",
          })
        );
        break;
      default:
        break;
    }
  };

  return (
    <RightDrawerItem title={"Mode"}>
      <ToggleButtonGroup
        value={themeButtonState}
        exclusive
        aria-label="text alignment"
        sx={{ width: "100%" }}
      >
        <ToggleButton
          value="light"
          aria-label="light theme"
          sx={{ flex: 1 }}
          onClick={handleModeSelection("light")}
        >
          <LightModeIcon fontSize="small" />
          <Typography variant="button" ml={1}>
            Light
          </Typography>
        </ToggleButton>
        <ToggleButton
          value="dark"
          aria-label="dark theme"
          sx={{ flex: 1 }}
          onClick={handleModeSelection("dark")}
        >
          <DarkModeIcon fontSize="small" />
          <Typography variant="button" ml={1}>
            Dark
          </Typography>
        </ToggleButton>
        <ToggleButton
          value="auto"
          aria-label="system theme"
          sx={{ flex: 1 }}
          onClick={handleModeSelection("auto")}
        >
          <Brightness4Icon fontSize="small" />
          <Typography variant="button" ml={1}>
            Auto
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </RightDrawerItem>
  );
};
