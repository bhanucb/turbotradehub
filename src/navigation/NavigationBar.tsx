import * as React from "react";
import { FC, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RightDrawer, { RightDrawerApi } from "./rightDrawer/RightDrawer";
import { Button, Menu, MenuItem, SxProps, Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASENAME } from "../App";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { NAVBAR_LINKS } from "./NavigationRoutes";
import AppLogo from "../components/AppLogo";

function NavigationBar() {
  const [rightDrawerApi, setRightDrawerApi] = useState<RightDrawerApi>();
  const navigate = useNavigate();

  function handleRightDrawerReady({ api }: { api: RightDrawerApi }) {
    setRightDrawerApi(api);
  }

  function handleToggleDrawer() {
    rightDrawerApi?.toggleDrawer();
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const NavLinks: FC = () => {
    function handleClickBtn(path: string) {
      handleCloseNavMenu();
      navigate(path);
    }

    return (
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {NAVBAR_LINKS.map((route) => (
          <Button
            key={route.name}
            onClick={() => handleClickBtn(route.path)}
            sx={{ color: "white", display: "block" }}
          >
            {route.name}
          </Button>
        ))}
      </Box>
    );
  };

  const NavTitle: FC<{ responsive?: true }> = ({ responsive }) => {
    let sx: SxProps<Theme> = {
      mr: 2,
      display: { xs: "none", md: "flex" },
      letterSpacing: ".1rem",
      color: "inherit",
      textDecoration: "none",
    };
    if (responsive) {
      sx = {
        ...sx,
        flexGrow: 1,
        display: { xs: "flex", md: "none" },
      };
    }

    return (
      <>
        <Box
          sx={
            responsive
              ? { display: { xs: "flex", md: "none" }, mr: 1 }
              : { display: { xs: "none", md: "flex" }, mr: 1 }
          }
        >
          <AppLogo />
        </Box>
        <Typography noWrap component="a" href={BASENAME} sx={sx}>
          Turbo Trade Hub
        </Typography>
      </>
    );
  };

  const ResponsiveMenu: FC = () => {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          style={{ paddingLeft: 0 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {NAVBAR_LINKS.map(({ name }) => (
            <MenuItem key={name} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <NavTitle />
        <ResponsiveMenu />
        <NavTitle responsive />
        <NavLinks />
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="settings"
          sx={{ ml: 2 }}
          onClick={handleToggleDrawer}
        >
          <SettingsIcon />
        </IconButton>
        <RightDrawer onReady={handleRightDrawerReady} />
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
