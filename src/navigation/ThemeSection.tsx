import { FC } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import { useAppDispatch, useAppSelector } from "../state/Store";
import { switchTheme } from "../state/ThemeSlice";

export const ThemeSection: FC = () => {
  const { themeButtonState } = useAppSelector((state) => state.theme);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const dispatch = useAppDispatch();

  const handleModeSelection = () => {
    switch (themeButtonState) {
      case "light":
        dispatch(switchTheme({ mode: "dark", buttonState: "dark" }));
        break;
      case "dark":
        dispatch(
          switchTheme({
            mode: prefersDark.matches ? "dark" : "light",
            buttonState: "auto",
          })
        );
        break;
      case "auto":
        dispatch(switchTheme({ mode: "light", buttonState: "light" }));
        break;
      default:
        break;
    }
  };

  if (themeButtonState === "dark") {
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="dark-mode"
        onClick={handleModeSelection}
      >
        <LightModeIcon />
      </IconButton>
    );
  } else if (themeButtonState === "light") {
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="dark-mode"
        onClick={handleModeSelection}
      >
        <DarkModeIcon />
      </IconButton>
    );
  } else {
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="dark-mode"
        onClick={handleModeSelection}
      >
        <BrightnessAutoIcon />
      </IconButton>
    );
  }
};
