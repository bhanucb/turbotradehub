import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ThemeSection } from "./ThemeSection";

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: space-between;

  .title {
    margin-left: 8px;
  }
`;

export interface RightDrawerApi {
  toggleDrawer: () => void;
}

export interface RightDrawerProps {
  onReady?: (props: { api: RightDrawerApi }) => void;
}

const RightDrawer: FC<RightDrawerProps> = (props) => {
  const [open, setOpen] = useState(false);
  const { onReady } = props;

  useEffect(() => {
    onReady?.({ api: { toggleDrawer: toggleDrawer } });
  }, []);

  function toggleDrawer() {
    setOpen((prev) => !prev);
  }

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
      </Box>
    </Drawer>
  );
};

export default RightDrawer;
