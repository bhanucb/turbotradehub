import { FC, PropsWithChildren, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")`
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: flex-end;
`;

export type LeftDrawerApi = {
  toggleDrawer: () => void;
};

export type LeftDrawerProps = {
  onReady?: (props: { api: LeftDrawerApi }) => void;
};

const LeftDrawer: FC<PropsWithChildren<LeftDrawerProps>> = (props) => {
  const [open, setOpen] = useState(false);
  const { children } = props;

  useEffect(() => {
    const { onReady } = props;
    onReady?.({ api: { toggleDrawer: toggleDrawer } });
  }, []);

  function toggleDrawer() {
    setOpen((prev) => !prev);
  }

  return (
    <Drawer anchor={"left"} open={open} onClose={toggleDrawer}>
      <DrawerHeader>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ width: 450 }} role="presentation">
        {children}
      </Box>
    </Drawer>
  );
};

export default LeftDrawer;
