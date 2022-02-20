import {
  Divider,
  Drawer,
  List,
  ListItemAvatar,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import ServiceItem from "../ServiceItem";

export interface SidebarProps {}
export default function Sidebar(props: SidebarProps) {
  const drawerWidth = 300;
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItemAvatar></ListItemAvatar>
        <ListSubheader sx={{ fontSize: "1.5rem" }}>Services</ListSubheader>
        <ListSubheader>Connected</ListSubheader>
        <ServiceItem
          name="Youtube"
          active
          user={{ name: "Timo", email: "timoopeters@gmail.com" }}
          login={() => console.log("yt login")}
        />
        <Divider />
        <ListSubheader>Available</ListSubheader>
        <ServiceItem name="Spotify" login={() => console.log("spt login")} />
        <Divider />
      </List>
    </Drawer>
  );
}
