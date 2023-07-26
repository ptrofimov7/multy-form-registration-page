import React from "react";
import { ReactElement, useMemo } from "react";

import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";

import { palette, breakpoints, typography, overrides } from "./theme/index";

type Args = {
  children: ReactElement;
};

const ThemeProvider = (args: Args) => {
  const { children } = args;

  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      breakpoints,
    }),
    []
  );

  const theme = createTheme(themeOptions as any);
  theme.components = overrides as any;

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
