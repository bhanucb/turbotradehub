import { FC } from "react";
import { RightDrawerItem } from "./RightDrawerItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import { useAppDispatch, useAppSelector } from "../../state/Store";
import { switchMode } from "../../state/SandboxSlice";

type SandboxModeItemProps = {
  toggleDrawer: () => void;
};

const SandboxModeSection: FC<SandboxModeItemProps> = ({ toggleDrawer }) => {
  const { isSandboxModeOn } = useAppSelector((state) => state.sandbox);
  const dispatch = useAppDispatch();

  function handleModeChange() {
    dispatch(switchMode());
    toggleDrawer();
  }

  return (
    <RightDrawerItem title={"Sandbox Mode"}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid sx={{ flex: 1 }}>
          <Typography variant="caption">Live Prices: </Typography>
        </Grid>
        <Grid sx={{ flex: 1 }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="button">Off</Typography>
            <Switch
              inputProps={{ "aria-label": "Sandbox Mode" }}
              onChange={handleModeChange}
              checked={!isSandboxModeOn}
            />
            <Typography variant="button">On</Typography>
          </Stack>
        </Grid>
      </Grid>
    </RightDrawerItem>
  );
};

export default SandboxModeSection;
