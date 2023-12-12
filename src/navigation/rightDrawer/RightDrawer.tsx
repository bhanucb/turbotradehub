import { FC, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ThemeSection } from "./ThemeSection";
import LayoutSection from "./LayoutSection";
import SandboxModeSection from "./SandboxModeSection";
import { BASENAME } from "../../App";
import { removeSlashes } from "../../utils/Misc";
import LogoutSection from "./LogoutSection";

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: space-between;

  .title {
    margin-left: 8px;
  }
`;

export type RightDrawerApi = {
  toggleDrawer: () => void;
};

export type RightDrawerProps = {
  onReady?: (props: { api: RightDrawerApi }) => void;
};

const RightDrawer: FC<RightDrawerProps> = (props) => {
  const [open, setOpen] = useState(false);
  const isHome =
    removeSlashes(window.location.pathname) === removeSlashes(BASENAME);

  useEffect(() => {
    const { onReady } = props;
    onReady?.({ api: { toggleDrawer: toggleDrawer } });
  }, []);

  function toggleDrawer() {
    setOpen((prev) => !prev);
  }

  const PageSpecificSections: FC = useCallback(() => {
    if (isHome) {
      return (
        <>
          <LayoutSection toggleDrawer={toggleDrawer} />
          <SandboxModeSection toggleDrawer={toggleDrawer} />
        </>
      );
    }

    return <></>;
  }, [toggleDrawer, isHome]);

  return (
    <Drawer anchor={"right"} open={open} onClose={toggleDrawer}>
      <DrawerHeader>
        <Typography variant="h6" className="title">
          Settings
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ width: { xs: 350, md: 450 } }} role="presentation">
        <ThemeSection />
        <PageSpecificSections />
      </Box>
      <LogoutSection />
    </Drawer>
  );
};

export default RightDrawer;
