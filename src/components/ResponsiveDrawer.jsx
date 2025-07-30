"use client";
import * as React from "react";
import PropTypes, { func } from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleButton from "@mui/material/ToggleButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Dashboard,
  NightlightRound,
  PostAdd,
  Sunny,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window, children, setTheme, themes } = props; 
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [active, setActive] = React.useState(null);
  const [selected, setSelected] = React.useState(true);
  const [chooseDash,setChooseDash] = React.useState("bg-gray-300")
  const router = useRouter();

  function handelTheme() {
    setSelected((prevSelected) => !prevSelected);
    selected ? setTheme(()=> themes.darkTheme)  : setTheme(()=> themes.lightTheme)
    selected ? setChooseDash(()=> "bg-black" ) : setChooseDash(()=>"bg-gray-300")
  }

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  function handleDrawer(txt) {
    if (txt.includes("dashboard")) {
      router.push("/");
      setActive(txt);
    } else if (txt.includes("posts")) {
      setActive(txt);
      router.push("/posts");
    }
  }

  const drawer = (
    <div>
      <Toolbar />

      <List>
        {["Dashboard", "Posts"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            className={text.toLowerCase().includes(active) ? chooseDash : ""}
          >
            <ListItemButton onClick={() => handleDrawer(text.toLowerCase())}>
              <ListItemIcon>
                {index % 2 === 0 ? <Dashboard /> : <PostAdd />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            onClick={() => handelTheme()}
          >
            {selected ? (
               <NightlightRound className=" text-gray-400" />
            ) : (
              <Sunny className="text-white" />
             
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
