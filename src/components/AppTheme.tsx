import { FC, PropsWithChildren, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../state/Store";
import { switchTheme } from "../state/ThemeSlice";

const AppTheme: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { currentTheme, themeButtonState } = useAppSelector(
    (state) => state.theme
  );
  const darkTheme = createTheme({
    palette: {
      mode: currentTheme === "dark" ? "dark" : "light",
    },
  });

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    prefersDark.onchange = () => {
      if (themeButtonState !== "auto") return;

      dispatch(
        switchTheme({
          mode: prefersDark.matches ? "dark" : "light",
          buttonState: "auto",
        })
      );
    };

    return () => {
      prefersDark.onchange = null;
    };
  }, [themeButtonState]);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles
        styles={{
          ":root": {
            colorScheme: currentTheme === "dark" ? "dark" : "initial",
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
