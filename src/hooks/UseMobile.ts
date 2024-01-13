import { useMediaQuery, useTheme } from "@mui/material";

function useMobile() {
  const theme = useTheme();

  const result = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("lg"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.down("xl"));

  if (isMobile) {
    result.isMobile = true;
  } else if (isTablet) {
    result.isTablet = true;
  } else if (isDesktop) {
    result.isDesktop = true;
  } else if (isLargeDesktop) {
    result.isLargeDesktop = true;
  }

  return result;
}

export default useMobile;
